# Supabase (alternate)

Same domain as Firebase. Postgres tables + RLS match the authorization matrix.

Money: `*_amount numeric(18,2)` + `*_currency text`. The adapter maps to `{ amount, currency }`.

Apply `0001` through `0008_categories.sql` on a fresh project. Set `NEXT_PUBLIC_DATA_PROVIDER=supabase` and the public/anon + server service-role env vars.

`profile_roles` is the RBAC source. `has_role(role)` / `is_admin()` / `is_payout_agent()` gate RLS. Same login; Admin assigns `admin` and `payout_agent`.

Profile tables: `advertiser_socials`, `creator_packages`, `creator_campaigns`, `campaign_criteria`, `categories`. Advertisers also store `bio` and `city`. `creator_campaigns` is public-read (brand, charged Money, views/likes/comments, video). `categories` is public-read; Admin writes.

KYC tables: `kyc_submissions`, `kyc_documents`. Storage paths only — never public URLs.
