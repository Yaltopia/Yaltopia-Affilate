# Supabase (alternate)

Same domain as Firebase. Postgres tables + RLS match the authorization matrix.

Money: `*_amount numeric(18,2)` + `*_currency text`. The adapter maps to `{ amount, currency }`.

Apply `supabase/migrations/0001_affiliate_core.sql` on a fresh project. Set `NEXT_PUBLIC_DATA_PROVIDER=supabase` and the public/anon + server service-role env vars.
