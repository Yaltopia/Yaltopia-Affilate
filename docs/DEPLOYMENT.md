# Deployment

## Vercel

1. Import `Yaltopia/Yaltopia-Affilate`.
2. Framework: Next.js. Root: repository root.
3. `main` → Production. Pull requests → Preview.
4. Copy names from `.env.example`. Never paste Admin / service-role keys into the README or issues.

## Firebase

Create a Firebase project. Enable Auth, Firestore, Storage. Deploy rules from `firebase/`. Put the **public** web config in Vercel. Put Admin credentials in Vercel **server** env only.

## Supabase (optional)

New project, run `supabase/migrations/0001_affiliate_core.sql`, set `NEXT_PUBLIC_DATA_PROVIDER=supabase`.

## Tracking

`/r/{code}` will run on Vercel Edge in a later pass. Keep it on the same origin as the app.
