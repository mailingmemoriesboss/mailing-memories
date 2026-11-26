-- Staged only. No historical backfill.
begin;
create table public.fulfillment_confirmation_outbox (
 order_id uuid primary key references public.orders(id) on delete cascade,
 customer_email text not null, mailed_at timestamptz not null,
 photo_base64 text check (length(photo_base64)<=700000),
 status text not null default 'queued' check(status in ('queued','sending','accepted','review')),
 queued_at timestamptz not null default now(), first_attempt_at timestamptz,
 next_attempt_at timestamptz not null default now(), attempts integer not null default 0,
 lease_token uuid, lease_until timestamptz, provider_id text, accepted_at timestamptz, last_error text
);
alter table public.fulfillment_confirmation_outbox enable row level security;
revoke all on public.fulfillment_confirmation_outbox from public, anon, authenticated;
grant select,insert,update on public.fulfillment_confirmation_outbox to service_role;

create function public.queue_fulfillment_confirmation(target_id uuid, photo text default null)
returns text language plpgsql security invoker set search_path='' as $$
declare o public.orders%rowtype; existing text; mailed_time timestamptz;
begin
 select * into o from public.orders where id=target_id for update;
 if not found then return 'ineligible'; end if;
 select status into existing from public.fulfillment_confirmation_outbox where order_id=target_id;
 if found then return existing; end if;
 if o.paid_at is null or o.stripe_checkout_session_id is null or o.anonymized_at is not null
    or coalesce(o.privacy_hold,false) or o.status not in ('paid','queued','writing','written')
    or o.sender_email is null or o.sender_email !~ '^[^@[:space:]]+@[^@[:space:]]+[.][^@[:space:]]+$'
 then return 'ineligible'; end if;
 mailed_time=now();
 update public.orders set status='mailed',mailed_at=mailed_time where id=target_id;
 insert into public.fulfillment_confirmation_outbox(order_id,customer_email,mailed_at,photo_base64)
 values(target_id,o.sender_email,mailed_time,photo);
 return 'queued';
end; $$;
revoke execute on function public.queue_fulfillment_confirmation(uuid,text) from public,anon,authenticated;
grant execute on function public.queue_fulfillment_confirmation(uuid,text) to service_role;

create function public.claim_fulfillment_confirmation(target_id uuid default null)
returns setof public.fulfillment_confirmation_outbox language plpgsql security invoker set search_path='' as $$
begin
 update public.fulfillment_confirmation_outbox q
 set status='review',photo_base64=null,customer_email='',lease_token=null,lease_until=null,
 last_error='Retry window expired or order no longer eligible; verify with provider'
 where q.status in ('queued','sending') and (q.lease_until is null or q.lease_until<=now())
 and (q.attempts>=12 or q.queued_at<=now()-interval '20 hours'
 or not exists(select 1 from public.orders o where o.id=q.order_id and o.anonymized_at is null
 and not coalesce(o.privacy_hold,false) and o.status in ('mailed','completed') and o.sender_email=q.customer_email));
 return query with candidate as (
 select q.order_id from public.fulfillment_confirmation_outbox q join public.orders o on o.id=q.order_id
 where q.status in ('queued','sending') and q.next_attempt_at<=now()
 and (q.lease_until is null or q.lease_until<=now())
 and q.queued_at>now()-interval '20 hours' and q.attempts<12
 and o.anonymized_at is null and not coalesce(o.privacy_hold,false) and o.status in ('mailed','completed')
 and o.sender_email=q.customer_email and (target_id is null or q.order_id=target_id)
 order by q.next_attempt_at,q.order_id limit 1 for update of q skip locked
 ) update public.fulfillment_confirmation_outbox q set status='sending',attempts=q.attempts+1,
 first_attempt_at=coalesce(q.first_attempt_at,now()),lease_token=gen_random_uuid(),lease_until=now()+interval '2 minutes'
 from candidate c where q.order_id=c.order_id returning q.*;
end; $$;
revoke execute on function public.claim_fulfillment_confirmation(uuid) from public,anon,authenticated;
grant execute on function public.claim_fulfillment_confirmation(uuid) to service_role;
commit;
