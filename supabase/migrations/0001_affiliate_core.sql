-- Yaltopia Affiliate core schema (alternate to Firebase)
-- Money: amount numeric(18,2) + currency text. Map to { amount, currency } in the adapter.

create extension if not exists "pgcrypto";

create type public.app_role as enum ('creator', 'advertiser', 'admin', 'payout_agent');
create type public.creator_status as enum ('pending_review', 'approved', 'rejected', 'suspended');
create type public.advertiser_status as enum ('pending_activation', 'active', 'suspended');
create type public.social_platform as enum ('tiktok', 'instagram', 'youtube', 'telegram', 'facebook', 'other');
create type public.offer_status as enum ('draft', 'pending_review', 'live', 'paused', 'archived');
create type public.application_status as enum ('pending', 'approved', 'rejected');
create type public.collaboration_status as enum (
  'requested', 'countered', 'accepted', 'rejected', 'expired',
  'in_progress', 'submitted', 'completed', 'disputed'
);
create type public.earning_type as enum ('cpc', 'cpa', 'brief_fee');
create type public.earning_status as enum ('pending', 'approved', 'rejected', 'reversed');
create type public.attributed_via as enum ('link', 'promo_code', 'both_code_wins');
create type public.payment_request_status as enum ('draft', 'requested', 'paid', 'overdue', 'cancelled');
create type public.creator_payout_status as enum ('pending', 'processing', 'paid', 'failed');
create type public.locale_code as enum ('en', 'am');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  locale locale_code not null default 'en',
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profile_roles (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  role app_role not null,
  primary key (profile_id, role)
);

create table public.platform_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles (id),
  updated_at timestamptz not null default now()
);

insert into public.platform_settings (key, value)
values ('creator.min_followers', '{"amount": 1000, "operator": "gte"}'::jsonb);

create table public.advertisers (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles (id),
  name text not null,
  logo_url text,
  website text,
  billing_email text,
  status advertiser_status not null default 'pending_activation',
  created_at timestamptz not null default now()
);

create table public.advertiser_members (
  advertiser_id uuid not null references public.advertisers (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  member_role text not null default 'member' check (member_role in ('owner', 'member')),
  primary key (advertiser_id, profile_id)
);

create table public.creators (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  bio text,
  niches text[] not null default '{}',
  status creator_status not null default 'pending_review',
  verified_at timestamptz,
  reviewed_by uuid references public.profiles (id),
  review_note text,
  min_followers_required integer,
  max_followers_declared integer,
  created_at timestamptz not null default now()
);

create table public.creator_socials (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators (id) on delete cascade,
  platform social_platform not null,
  handle text not null,
  url text not null,
  follower_count integer not null default 0 check (follower_count >= 0),
  proof_url text
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  advertiser_id uuid not null references public.advertisers (id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  destination_url text not null,
  price_amount numeric(18, 2),
  price_currency text not null default 'ETB',
  commission_type text not null check (commission_type in ('percent', 'flat')),
  commission_value numeric(18, 2) not null,
  cpc_amount numeric(18, 2),
  cpc_currency text not null default 'ETB',
  cookie_days integer not null default 7,
  status offer_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.offer_applications (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.offers (id) on delete cascade,
  creator_id uuid not null references public.creators (id) on delete cascade,
  status application_status not null default 'pending',
  decided_by uuid references public.profiles (id),
  unique (offer_id, creator_id)
);

create table public.collaboration_requests (
  id uuid primary key default gen_random_uuid(),
  advertiser_id uuid not null references public.advertisers (id) on delete cascade,
  creator_id uuid not null references public.creators (id) on delete cascade,
  offer_id uuid references public.offers (id),
  deliverable text not null default 'video_post',
  platforms social_platform[] not null default '{}',
  min_views integer,
  min_likes integer,
  min_comments integer,
  brief_fee_amount numeric(18, 2) not null,
  brief_fee_currency text not null default 'ETB',
  pay_on text not null default 'completed' check (pay_on in ('completed', 'accepted')),
  status collaboration_status not null default 'requested',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.collaboration_terms (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.collaboration_requests (id) on delete cascade,
  proposed_by uuid not null references public.profiles (id),
  brief_fee_amount numeric(18, 2) not null,
  brief_fee_currency text not null default 'ETB',
  min_views integer,
  min_likes integer,
  min_comments integer,
  note text,
  created_at timestamptz not null default now()
);

create table public.tracking_links (
  id uuid primary key default gen_random_uuid(),
  link_code text not null unique,
  creator_id uuid not null references public.creators (id),
  offer_id uuid references public.offers (id),
  collaboration_id uuid references public.collaboration_requests (id),
  status text not null default 'active' check (status in ('active', 'revoked'))
);

create table public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  creator_id uuid not null references public.creators (id),
  offer_id uuid references public.offers (id),
  collaboration_id uuid references public.collaboration_requests (id),
  status text not null default 'active' check (status in ('active', 'revoked'))
);

create table public.clicks (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references public.tracking_links (id),
  click_public_id uuid not null unique default gen_random_uuid(),
  occurred_at timestamptz not null default now(),
  ip_hash text,
  ua_hash text,
  referrer text,
  landing_url text,
  is_unique boolean not null default false
);

create table public.conversions (
  id uuid primary key default gen_random_uuid(),
  link_id uuid references public.tracking_links (id),
  promo_code_id uuid references public.promo_codes (id),
  click_id uuid references public.clicks (id),
  offer_id uuid references public.offers (id),
  creator_id uuid not null references public.creators (id),
  advertiser_id uuid not null references public.advertisers (id),
  order_ref text not null,
  order_amount numeric(18, 2) not null,
  order_currency text not null default 'ETB',
  commission_amount numeric(18, 2) not null,
  commission_currency text not null default 'ETB',
  attributed_via attributed_via not null,
  source text not null check (source in ('postback', 'manual', 'import')),
  status earning_status not null default 'pending',
  hold_until timestamptz,
  unique (advertiser_id, order_ref)
);

create table public.earnings (
  id uuid primary key default gen_random_uuid(),
  type earning_type not null,
  creator_id uuid not null references public.creators (id),
  advertiser_id uuid not null references public.advertisers (id),
  amount numeric(18, 2) not null,
  currency text not null default 'ETB',
  status earning_status not null default 'pending',
  source_id uuid,
  created_at timestamptz not null default now()
);

create table public.payment_requests (
  id uuid primary key default gen_random_uuid(),
  advertiser_id uuid not null references public.advertisers (id),
  amount numeric(18, 2) not null,
  currency text not null default 'ETB',
  status payment_request_status not null default 'draft',
  due_at timestamptz,
  requested_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.payment_request_items (
  payment_request_id uuid not null references public.payment_requests (id) on delete cascade,
  earning_id uuid not null references public.earnings (id),
  primary key (payment_request_id, earning_id)
);

create table public.creator_payouts (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators (id),
  amount numeric(18, 2) not null,
  currency text not null default 'ETB',
  method text,
  status creator_payout_status not null default 'pending',
  paid_at timestamptz,
  payment_request_id uuid references public.payment_requests (id)
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  target_type text,
  target_id text,
  meta jsonb not null default '{}',
  request_id text,
  created_at timestamptz not null default now()
);

create table public.domain_events (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  occurred_at timestamptz not null default now(),
  org_id uuid,
  actor_id uuid,
  payload jsonb not null default '{}',
  schema_version integer not null default 1
);

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profile_roles
    where profile_id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_payout_agent()
returns boolean
language sql
stable
as $$
  select public.is_admin() or exists (
    select 1 from public.profile_roles
    where profile_id = auth.uid() and role = 'payout_agent'
  );
$$;

alter table public.profiles enable row level security;
alter table public.profile_roles enable row level security;
alter table public.platform_settings enable row level security;
alter table public.advertisers enable row level security;
alter table public.advertiser_members enable row level security;
alter table public.creators enable row level security;
alter table public.creator_socials enable row level security;
alter table public.offers enable row level security;
alter table public.offer_applications enable row level security;
alter table public.collaboration_requests enable row level security;
alter table public.collaboration_terms enable row level security;
alter table public.tracking_links enable row level security;
alter table public.promo_codes enable row level security;
alter table public.clicks enable row level security;
alter table public.conversions enable row level security;
alter table public.earnings enable row level security;
alter table public.payment_requests enable row level security;
alter table public.payment_request_items enable row level security;
alter table public.creator_payouts enable row level security;
alter table public.audit_logs enable row level security;
alter table public.domain_events enable row level security;

create policy "settings_read_auth" on public.platform_settings for select to authenticated using (true);
create policy "settings_write_admin" on public.platform_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "profiles_read" on public.profiles for select to authenticated using (true);
create policy "profiles_own_write" on public.profiles for update to authenticated using (id = auth.uid());

create policy "roles_read" on public.profile_roles for select to authenticated using (true);
create policy "roles_admin" on public.profile_roles for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "creators_public_approved" on public.creators for select using (status = 'approved' or profile_id = auth.uid() or public.is_admin());
create policy "creators_own_insert" on public.creators for insert to authenticated with check (profile_id = auth.uid());
create policy "creators_own_update" on public.creators for update to authenticated using (profile_id = auth.uid() or public.is_admin());

create policy "socials_read" on public.creator_socials for select using (true);
create policy "socials_own" on public.creator_socials for all to authenticated using (
  exists (select 1 from public.creators c where c.id = creator_id and (c.profile_id = auth.uid() or public.is_admin()))
) with check (
  exists (select 1 from public.creators c where c.id = creator_id and (c.profile_id = auth.uid() or public.is_admin()))
);

create policy "offers_read_live" on public.offers for select using (status = 'live' or public.is_admin());
create policy "earnings_own_or_ops" on public.earnings for select to authenticated using (
  creator_id in (select id from public.creators where profile_id = auth.uid())
  or public.is_payout_agent()
);

create policy "payment_requests_ops" on public.payment_requests for all to authenticated
  using (public.is_payout_agent()) with check (public.is_payout_agent());

create policy "clicks_no_client_write" on public.clicks for select to authenticated using (public.is_admin() or public.is_payout_agent());

create policy "audit_admin" on public.audit_logs for select to authenticated using (public.is_admin());
create policy "events_admin" on public.domain_events for select to authenticated using (public.is_admin());
