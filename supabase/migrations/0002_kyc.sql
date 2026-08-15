-- KYC packs for advertisers and creators. Paths are storage keys, not public URLs.

create type public.kyc_status as enum ('incomplete', 'submitted', 'approved', 'rejected');
create type public.kyc_document_kind as enum (
  'tin_certificate',
  'national_id',
  'business_license',
  'liveness_photo',
  'page_analytics',
  'admin_view'
);

create table public.kyc_submissions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  role app_role not null check (role in ('creator', 'advertiser')),
  status kyc_status not null default 'incomplete',
  review_note text,
  reviewed_by uuid references public.profiles (id),
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  unique (profile_id, role)
);

create table public.kyc_documents (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.kyc_submissions (id) on delete cascade,
  kind kyc_document_kind not null,
  storage_path text not null,
  created_at timestamptz not null default now(),
  unique (submission_id, kind)
);

alter table public.kyc_submissions enable row level security;
alter table public.kyc_documents enable row level security;

create policy "kyc_own_or_admin" on public.kyc_submissions
  for select to authenticated
  using (profile_id = auth.uid() or public.is_admin());

create policy "kyc_own_insert" on public.kyc_submissions
  for insert to authenticated
  with check (profile_id = auth.uid());

create policy "kyc_own_update_or_admin" on public.kyc_submissions
  for update to authenticated
  using (profile_id = auth.uid() or public.is_admin());

create policy "kyc_docs_via_submission" on public.kyc_documents
  for all to authenticated
  using (
    exists (
      select 1 from public.kyc_submissions s
      where s.id = submission_id and (s.profile_id = auth.uid() or public.is_admin())
    )
  )
  with check (
    exists (
      select 1 from public.kyc_submissions s
      where s.id = submission_id and (s.profile_id = auth.uid() or public.is_admin())
    )
  );
