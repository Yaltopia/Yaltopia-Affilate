-- Public past work on creator pages. Charge is Money. Engagement is views / likes / comments.

create table public.creator_campaigns (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators (id) on delete cascade,
  brand text not null,
  title text not null,
  platform social_platform not null,
  charged_amount numeric(18, 2) not null,
  charged_currency text not null default 'ETB',
  views integer not null default 0,
  likes integer not null default 0,
  comments integer not null default 0,
  video_url text not null,
  posted_on date not null
);

alter table public.creator_campaigns enable row level security;

create policy "campaigns_read" on public.creator_campaigns for select using (true);
create policy "campaigns_own" on public.creator_campaigns for all to authenticated
  using (exists (select 1 from public.creators c where c.id = creator_id and (c.profile_id = auth.uid() or public.is_admin())))
  with check (exists (select 1 from public.creators c where c.id = creator_id and (c.profile_id = auth.uid() or public.is_admin())));
