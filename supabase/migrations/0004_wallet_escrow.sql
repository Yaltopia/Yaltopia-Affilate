-- Advertiser wallet, escrow, sample rounds, criteria-gated release.

alter type public.collaboration_status add value if not exists 'funded';
alter type public.collaboration_status add value if not exists 'sample_review';
alter type public.collaboration_status add value if not exists 'posted';
alter type public.collaboration_status add value if not exists 'release_requested';

alter table public.collaboration_requests
  add column if not exists escrow_status text not null default 'none'
    check (escrow_status in ('none', 'secured', 'released', 'refunded')),
  add column if not exists posted_url text,
  add column if not exists actual_views integer,
  add column if not exists actual_likes integer,
  add column if not exists actual_comments integer;

create table public.wallets (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles (id) on delete cascade,
  advertiser_id uuid references public.advertisers (id) on delete cascade,
  available_amount numeric(18, 2) not null default 0,
  available_currency text not null default 'ETB',
  reserved_amount numeric(18, 2) not null default 0,
  reserved_currency text not null default 'ETB',
  unique (advertiser_id)
);

create table public.wallet_ledger (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.wallets (id) on delete cascade,
  entry_type text not null check (entry_type in ('deposit', 'reserve', 'release', 'refund')),
  amount numeric(18, 2) not null,
  currency text not null default 'ETB',
  order_id uuid references public.collaboration_requests (id),
  created_at timestamptz not null default now()
);

create table public.escrow_holds (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.collaboration_requests (id) on delete cascade,
  wallet_id uuid not null references public.wallets (id),
  amount numeric(18, 2) not null,
  currency text not null default 'ETB',
  status text not null default 'pending' check (status in ('pending', 'secured', 'released', 'refunded')),
  created_at timestamptz not null default now()
);

create table public.sample_rounds (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.collaboration_requests (id) on delete cascade,
  author_role text not null check (author_role in ('creator', 'advertiser')),
  kind text not null check (kind in ('sample', 'feedback')),
  note text not null,
  video_url text,
  created_at timestamptz not null default now()
);

create table public.release_requests (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.collaboration_requests (id) on delete cascade,
  status text not null default 'requested' check (status in ('requested', 'paid', 'blocked')),
  actual_views integer not null,
  actual_likes integer not null,
  actual_comments integer not null,
  created_at timestamptz not null default now()
);

alter table public.wallets enable row level security;
alter table public.wallet_ledger enable row level security;
alter table public.escrow_holds enable row level security;
alter table public.sample_rounds enable row level security;
alter table public.release_requests enable row level security;

create policy "wallets_own_or_ops" on public.wallets for select to authenticated
  using (owner_profile_id = auth.uid() or public.is_admin() or public.is_payout_agent());
create policy "wallets_own_write" on public.wallets for all to authenticated
  using (owner_profile_id = auth.uid() or public.is_admin())
  with check (owner_profile_id = auth.uid() or public.is_admin());

create policy "ledger_own_or_ops" on public.wallet_ledger for select to authenticated
  using (
    exists (
      select 1 from public.wallets w
      where w.id = wallet_id and (w.owner_profile_id = auth.uid() or public.is_admin() or public.is_payout_agent())
    )
  );
create policy "ledger_own_insert" on public.wallet_ledger for insert to authenticated
  with check (
    exists (
      select 1 from public.wallets w
      where w.id = wallet_id and (w.owner_profile_id = auth.uid() or public.is_admin())
    )
  );

create policy "escrow_parties" on public.escrow_holds for select to authenticated using (true);
create policy "escrow_write_adv_admin" on public.escrow_holds for all to authenticated
  using (public.is_admin() or exists (
    select 1 from public.wallets w where w.id = wallet_id and w.owner_profile_id = auth.uid()
  ))
  with check (public.is_admin() or exists (
    select 1 from public.wallets w where w.id = wallet_id and w.owner_profile_id = auth.uid()
  ));

create policy "samples_read" on public.sample_rounds for select to authenticated using (true);
create policy "samples_write_parties" on public.sample_rounds for insert to authenticated with check (true);

create policy "release_read" on public.release_requests for select to authenticated using (true);
create policy "release_creator_insert" on public.release_requests for insert to authenticated with check (true);
-- Payout agent cannot release. Criteria / admin only.
create policy "release_admin_update" on public.release_requests for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
