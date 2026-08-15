-- Placeholder creator pages (Favikon seed). Creators claim their own handle.

alter table public.creators
  alter column profile_id drop not null;

alter table public.creators
  add column if not exists claim_status text not null default 'unclaimed'
    check (claim_status in ('unclaimed', 'claim_pending', 'claimed')),
  add column if not exists source text,
  add column if not exists source_url text,
  add column if not exists rank integer,
  add column if not exists tiktok_score numeric(5, 1);

create unique index if not exists creators_profile_id_unique
  on public.creators (profile_id)
  where profile_id is not null;

comment on column public.creators.claim_status is
  'unclaimed placeholder pages can be claimed by the creator. Admin confirms, assigns, or inserts a person.';
