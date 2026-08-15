# Firebase (primary)

- Auth: social providers (TikTok, phone, Gmail, Instagram primary; YouTube, Telegram, Facebook extra) with custom claims `{ roles: string[] }` synced from `profile_roles`. Demo accounts remain email-keyed in the mock. Same login for every role. After Auth, route by claims: `admin` or `payout_agent` → `/admin`, `advertiser` → `/app`, `creator` → `/studio`. UI never imports `firebase/*`.
- Admin / Payout Agent are assigned on `profile_roles` (Admin write only). Not a public join.
- Firestore collections match the domain names in SPEC. `categories/{id}` is public-read; Admin writes new marketplace categories.
- Subcollections: `creators/{id}/socials`, `creators/{id}/packages`, `creators/{id}/campaigns`, `advertisers/{id}/socials`, `advertisers/{id}/members`, `collaboration_requests/{id}/terms`, `collaboration_requests/{id}/samples`, `payment_requests/{id}/items`. Public-read on packages and campaigns.
- Public creator placeholders (`claim_status: unclaimed`) are readable. A signed-in creator may set `claim_pending` and `profile_id` on an unclaimed page. Admin creates pages, assigns `profile_id`, and sets `claimed`.
- Wallet: `wallets/{id}`, `wallet_ledger/{id}`, `escrow_holds/{id}`, `release_requests/{id}`. Payout Agent may read wallets. Only Admin / criteria path updates release.
- `campaign_criteria/{id}` — advertiser orders (`draft` | `live` | `closed`). Live is public-read on `/` and `/orders`.
- `tracking_links/{linkCode}`, `promo_codes/{CODE}` (uppercase doc id).
- Storage: `offer-images/` (public), `creator-proof/` (social proof), `kyc/{uid}/` (PII — owner + admin only).
- Firestore: `kyc_submissions/{id}` with document kinds listed in SPEC.
- Admin / redirect: Firebase Admin SDK on Vercel. Never commit the service account.

See `firebase/firestore.rules`, `firebase/storage.rules`, `firebase/firestore.indexes.json`.
