-- Staged, not applied. Nullable expected amount preserves in-flight durable-v1 orders.
begin;
alter table public.orders add column expected_amount_cents integer check(expected_amount_cents>=1500);
alter table public.orders add column message_word_count integer check(message_word_count>=0);
alter table public.orders add column extra_card_count integer check(extra_card_count>=0);
alter table public.orders add column showcase_consent boolean not null default false;
alter table public.orders add column showcase_consent_version text;
alter table public.orders add column showcase_consented_at timestamptz;
alter table public.orders add constraint orders_showcase_consent_record_check check(
 (not showcase_consent and showcase_consented_at is null and showcase_consent_version is null)
 or (showcase_consent and showcase_consented_at is not null and showcase_consent_version is not null)
);
commit;
