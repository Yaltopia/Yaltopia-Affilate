-- Admin-owned marketplace categories. Creator.niche stores category.name.

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  name_am text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.categories (slug, name, name_am) values
  ('motivation', 'Motivation', U&'\1270\1290\1233\123d\1290\1275'),
  ('lifestyle', 'Lifestyle', U&'\12e8\1291\122e \12d8\12ed\1264'),
  ('comedy', 'Comedy', U&'\12ae\121c\12f2'),
  ('music', 'Music', U&'\1219\12da\1243'),
  ('film', 'Film', U&'\134a\120d\121d'),
  ('wildlife', 'Wildlife', U&'\12e8\12f1\122d \12a5\1295\1235\1233\1275'),
  ('food', 'Food', U&'\121d\130d\1265'),
  ('faith', 'Faith', U&'\12a5\121d\1290\1275'),
  ('fitness', 'Fitness', U&'\12e8\12a0\12ab\120d \1265\1243\1275'),
  ('culture', 'Culture', U&'\1263\1205\120d'),
  ('sports', 'Sports', U&'\1235\1356\122d\1275'),
  ('fashion', 'Fashion', U&'\134b\123d\1295'),
  ('beauty', 'Beauty', U&'\12cd\1260\1275'),
  ('tech', 'Tech', U&'\1274\12ad\1296\120e\1302'),
  ('tv', 'TV', U&'\1274\120c\126a\12e5\1295');

alter table public.categories enable row level security;

create policy "categories_read" on public.categories for select using (true);
create policy "categories_write_admin" on public.categories for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());
