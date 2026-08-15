# Convex (alternate)

Same domain as Firebase and Supabase. Tables in `convex/schema.ts` match the authorization matrix. Queries and mutations (when wired) enforce RBAC — Convex has no RLS file.

Money: `{ amount: string, currency: "ETB" }` on the document. Never store floats.

New Convex project, push `convex/schema.ts`, set `NEXT_PUBLIC_DATA_PROVIDER=convex` plus `NEXT_PUBLIC_CONVEX_URL` and `CONVEX_DEPLOYMENT`. Auth is Convex Auth (social providers). `profile_roles` is the RBAC source. Same login; Admin assigns `admin` and `payout_agent`.

UI never imports `convex/react` or `convex/server`. It uses `AuthProvider` and `DataProvider` in `packages/contracts/provider.ts`.

Public creator placeholders (`claimStatus: unclaimed`) are readable. A signed-in creator may set `claim_pending` and `profileId` on an unclaimed page. Admin creates pages, assigns `profileId`, and sets `claimed`. `creator_campaigns` is public-read past work (charged Money, views/likes/comments, video). `categories` is public-read; Admin writes marketplace categories.

KYC files live in Convex file storage. Store `_storage` ids only — never public URLs. Never log those ids.

Payout Agent may read wallets. Only Admin / criteria path updates release.
