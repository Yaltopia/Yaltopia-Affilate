-- Complete profiles: socials for advertisers, creator packages, advertiser campaign criteria.

create table public.advertiser_socials (
  id uuid primary key default gen_random_uuid(),
  advertiser_id uuid not null references public.advertisers (id) on delete cascade,
  platform social_platform not null,
  handle text not null,
  url text not null,
  follower_count integer not null default 0,
  unique (advertiser_id, platform)
);

create table public.creator_packages (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators (id) on delete cascade,
  title text not null,
  platform social_platform not null,
  deliverable text not null,
  price_amount numeric(18, 2) not null,
  price_currency text not null default 'ETB'
);

create table public.campaign_criteria (
  id uuid primary key default gen_random_uuid(),
  advertiser_id uuid not null references public.advertisers (id) on delete cascade,
  advertiser_name text not null,
  title text not null,
  description text not null,
  platforms social_platform[] not null default '{}',
  niches text[] not null default '{}',
  min_followers integer not null default 1000,
  min_views integer not null default 0,
  min_likes integer not null default 0,
  min_comments integer not null default 0,
  budget_amount numeric(18, 2) not null,
  budget_currency text not null default 'ETB',
  status text not null default 'draft' check (status in ('draft', 'live', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.advertisers add column if not exists bio text;
alter table public.advertisers add column if not exists city text;
alter table public.creators add column if not exists city text;

alter table public.advertiser_socials enable row level security;
alter table public.creator_packages enable row level security;
alter table public.campaign_criteria enable row level security;

create policy "adv_socials_read" on public.advertiser_socials for select using (true);
create policy "adv_socials_own" on public.advertiser_socials for all to authenticated
  using (exists (select 1 from public.advertisers a where a.id = advertiser_id and (a.owner_profile_id = auth.uid() or public.is_admin())))
  with check (exists (select 1 from public.advertisers a where a.id = advertiser_id and (a.owner_profile_id = auth.uid() or public.is_admin())));

create policy "packages_read" on public.creator_packages for select using (true);
create policy "packages_own" on public.creator_packages for all to authenticated
  using (exists (select 1 from public.creators c where c.id = creator_id and (c.profile_id = auth.uid() or public.is_admin())))
  with check (exists (select 1 from public.creators c where c.id = creator_id and (c.profile_id = auth.uid() or public.is_admin())));

create policy "criteria_read_live" on public.campaign_criteria for select using (status = 'live' or public.is_admin());
create policy "criteria_own_write" on public.campaign_criteria for all to authenticated
  using (exists (select 1 from public.advertisers a where a.id = advertiser_id and (a.owner_profile_id = auth.uid() or public.is_admin())))
  with check (exists (select 1 from public.advertisers a where a.id = advertiser_id and (a.owner_profile_id = auth.uid() or public.is_admin())));
