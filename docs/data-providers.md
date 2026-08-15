# Data providers

The app never imports `firebase/*`, `@supabase/*`, or `convex/react` from UI. It uses `AuthProvider` and `DataProvider` in `packages/contracts/provider.ts`. `DataProviderId` is `firebase` | `supabase` | `convex`.

| Env | Backend |
| --- | --- |
| `NEXT_PUBLIC_DATA_PROVIDER=firebase` | Default. Auth, Firestore, Storage. |
| `NEXT_PUBLIC_DATA_PROVIDER=supabase` | Alternate. Auth, Postgres, Storage. |
| `NEXT_PUBLIC_DATA_PROVIDER=convex` | Alternate. Better Auth on Convex, tables, file storage. Isolation in `lib/convex/`. |

One provider live per environment. Do not dual-write.

This pass ships interfaces, Firestore rules, SQL, and `convex/schema.ts`. Convex queries, seed, and Better Auth live under `convex/` and `lib/convex/` so UI never imports `convex/react`. Mock `AuthProvider` in `lib/session-store.ts` still runs unless `NEXT_PUBLIC_DATA_PROVIDER=convex` and `NEXT_PUBLIC_CONVEX_URL` are set. The landing stays public; `/app`, `/studio`, and `/admin` require a session.

Living-spec: enum / role / Money changes update SPEC + all three mappings + TypeScript in the same PR.
