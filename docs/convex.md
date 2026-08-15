# Convex (alternate)

Same domain as Firebase and Supabase. Tables in `convex/schema.ts` match the authorization matrix. Queries and mutations enforce RBAC — Convex has no RLS file.

Money: `{ amount: string, currency: "ETB" }` on the document. Never store floats.

## Auth (Better Auth)

Auth is **Better Auth** on Convex (`@convex-dev/better-auth`), not Convex Auth. Email/password is for demo accounts only. Product login is social (Google, plus Facebook/TikTok when those secrets exist). `profile_roles` is the RBAC source. Admin assigns `admin` and `payout_agent`.

UI never imports `convex/react` or `convex/server`. Isolation lives in `lib/convex/`. Pages keep using `lib/session-store.ts`.

### First deploy

1. `npx convex login` then `npx convex dev` (creates `.env.local` with `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL`). This replaces the stub files in `convex/_generated/`.
2. Set `NEXT_PUBLIC_CONVEX_SITE_URL` to the same URL with `.site` instead of `.cloud`.
3. Convex env (dashboard or CLI):

```
npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
npx convex env set SITE_URL http://localhost:3000
```

4. Optional social: `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (and Facebook/TikTok) on the Convex deployment.
5. App env: `NEXT_PUBLIC_DATA_PROVIDER=convex`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
6. Seed catalog: `npx convex run seed:marketplace`.
7. Create demo Better Auth users (`creator@` / `advertiser@` / `both@` / `admin@` / `payout@` `@yaltopia.local`, password `password8`) via sign-up once, or keep the mock provider until those users exist.

`profile_roles` maps those demo emails automatically on first `ensureMine`.

Public creator placeholders (`claimStatus: unclaimed`) are readable. A signed-in creator may set `claim_pending` and `profileId` on an unclaimed page. Admin creates pages, assigns `profileId`, and sets `claimed`. `creator_campaigns` is public-read past work. `categories` is public-read; Admin writes marketplace categories.

KYC files live in Convex file storage. Store `_storage` ids only — never public URLs. Never log those ids.

Payout Agent may read wallets. Only Admin / criteria path updates release.

Portraits stay on the Next app at `/creators/{slug}.webp`. Convex stores that path on `creators.photoUrl`.
