# Firebase (primary)

- Auth: email/password; custom claims `{ roles: string[] }` synced from `profile_roles`.
- Firestore collections match the domain names in SPEC.
- Subcollections: `creators/{id}/socials`, `collaboration_requests/{id}/terms`, `payment_requests/{id}/items`, `advertisers/{id}/members`.
- `tracking_links/{linkCode}`, `promo_codes/{CODE}` (uppercase doc id).
- Storage: `offer-images/`, `creator-proof/`.
- Admin / redirect: Firebase Admin SDK on Vercel. Never commit the service account.

See `firebase/firestore.rules`, `firebase/storage.rules`, `firebase/firestore.indexes.json`.
