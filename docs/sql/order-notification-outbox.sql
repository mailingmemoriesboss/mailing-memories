-- Staged rollout SQL. Apply to isolated test database first, not production.
begin;
create table public.order_notification_outbox (
  order_id uuid primary key,
  amount_cents integer not null check (amount_cents >= 0),
  requested_ship_date date,
  queued_at timestamptz not null default now(),
  status text not null default 'queued' check (status in ('queued','sending','accepted','review')),
  attempts integer not null default 0,
  first_attempt_at timestamptz,
  next_attempt_at timestamptz not null default now(),
  lease_until timestamptz,
  lease_token uuid,
  provider_id text,
  accepted_at timestamptz,
  last_error text
);
alter table public.order_notification_outbox enable row level security;
revoke all on public.order_notification_outbox from public, anon, authenticated;
grant select, insert, update on public.order_notification_outbox to service_role;
create index order_notification_due_idx on public.order_notification_outbox (next_attempt_at)
  where status in ('queued','sending');

-- Atomic with the verified payment update. No backfill or historical emails.
create function public.queue_paid_order_notification() returns trigger
language plpgsql security invoker set search_path = ''
as $$
begin
  if old.status = 'pending_payment' and new.status = 'paid'
     and old.paid_at is null and new.paid_at is not null
     and new.stripe_checkout_session_id is not null then
    insert into public.order_notification_outbox(order_id,amount_cents,requested_ship_date)
      values(new.id,new.amount_cents,new.requested_ship_date)
      on conflict (order_id) do nothing;
  end if;
  return new;
end;
$$;
revoke execute on function public.queue_paid_order_notification() from public, anon, authenticated;
grant execute on function public.queue_paid_order_notification() to service_role;
create trigger queue_paid_order_notification
  after update of status, paid_at on public.orders for each row
  execute function public.queue_paid_order_notification();

-- Atomic claim and lease; stop ambiguous retries well before provider's 24-hour deduplication limit.
create function public.claim_order_notification(target_order uuid default null)
returns setof public.order_notification_outbox
language plpgsql security invoker set search_path = ''
as $$
begin
  update public.order_notification_outbox
     set status='review', last_error='Retry window exhausted; check provider before manual resend',
         lease_token=null, lease_until=null
   where status in ('queued','sending')
     and (lease_until is null or lease_until <= now())
     and (attempts >= 12 or first_attempt_at <= now() - interval '20 hours');
  return query
  with candidate as (
    select q.order_id from public.order_notification_outbox q
    where q.status in ('queued','sending') and q.next_attempt_at <= now()
      and (q.lease_until is null or q.lease_until <= now())
      and (target_order is null or q.order_id = target_order)
    order by q.next_attempt_at, q.order_id
    limit 1 for update skip locked
  )
  update public.order_notification_outbox q
    set status='sending', attempts=q.attempts+1, first_attempt_at=coalesce(q.first_attempt_at,now()),
        lease_until=now()+interval '2 minutes', lease_token=gen_random_uuid()
    from candidate c where q.order_id=c.order_id returning q.*;
end;
$$;
revoke execute on function public.claim_order_notification(uuid) from public, anon, authenticated;
grant execute on function public.claim_order_notification(uuid) to service_role;
commit;
