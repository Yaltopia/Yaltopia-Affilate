# Data providers

The app never imports `firebase/*`, `@supabase/*`, or `convex/react` from UI. It uses `AuthProvider` and `DataProvider` in `packages/contracts/provider.ts`. `DataProviderId` is `firebase` | `supabase` | `convex`.

| Env | Backend |
| --- | --- |
| `NEXT_PUBLIC_DATA_PROVIDER=firebase` | Default. Auth, Firestore, Storage. |
| `NEXT_PUBLIC_DATA_PROVIDER=supabase` | Alternate. Auth, Postgres, Storage. |
| `NEXT_PUBLIC_DATA_PROVIDER=convex` | Alternate. Convex Auth, tables, file storage. |

One provider live per environment. Do not dual-write.

This pass ships interfaces, Firestore rules, SQL, and `convex/schema.ts`. Implementations (`packages/providers/firebase`, `packages/providers/supabase`, `packages/providers/convex`) come when live Auth is wired. The mock `AuthProvider` lives in `lib/session-store.ts` and matches `Session.roles`. The landing stays public; `/app`, `/studio`, and `/admin` require a session.

Living-spec: enum / role / Money changes update SPEC + all three mappings + TypeScript in the same PR.
