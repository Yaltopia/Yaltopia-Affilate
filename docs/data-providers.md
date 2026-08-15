# Data providers

The app never imports `firebase/*` or `@supabase/*` from UI. It uses `AuthProvider` and `DataProvider` in `packages/contracts/provider.ts`.

| Env | Backend |
| --- | --- |
| `NEXT_PUBLIC_DATA_PROVIDER=firebase` | Default. Auth, Firestore, Storage. |
| `NEXT_PUBLIC_DATA_PROVIDER=supabase` | Alternate. Auth, Postgres, Storage. |

One provider live per environment. Do not dual-write.

This pass ships interfaces, Firestore rules, and SQL. Implementations (`packages/providers/firebase`, `packages/providers/supabase`) come when portals ship. The landing uses mocks that already match the contracts.

Living-spec: enum / role / Money changes update SPEC + both mappings + TypeScript in the same PR.
