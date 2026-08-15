# Yaltopia Affiliate

**Yaltopia Affiliate by Prime Store.** Prime Store originated this marketplace: advertisers list offers, creators promote with a tracking link and a promo code, and Admin’s Payout Agent requests payment from the advertiser.

Built and maintained by **[Yaltopia Tech](https://yaltopiatech.com/)**.

## Talk to us

Want this for your brand, or want to ship with us?

- **Website:** [yaltopiatech.com](https://yaltopiatech.com/)
- **Book a call:** [yaltopiatech.com/contact](https://yaltopiatech.com/contact)

## Status

Public landing at `/`. Workspaces open after login: advertiser `/app`, creator `/studio`, Admin `/admin`. Live Firebase / Supabase / Convex and `/r/{code}` come next.

## Who it is for

| Role | What they do |
| --- | --- |
| **Creator** | Get approved (1,000+ followers on one social, Admin-editable), accept or counter video briefs, share a promo code + link, earn CPC + CPA + brief fees. |
| **Advertiser** | List offers, request creators for video posts (views / likes / comments), pay payment requests. |
| **Admin** | Approve creators, activate advertisers, set signup criteria, assign Payout Agents. |
| **Payout Agent** | Admin staff only. Check/view what an advertiser owes and request payment. Cannot approve creators. |

## Stack

- **Host:** Vercel
- **App:** Next.js App Router, Tailwind CSS, shadcn/ui, Poppins
- **Primary data/auth:** Firebase (Auth, Firestore, Storage)
- **Alternate data/auth:** Supabase or Convex — same contracts, `NEXT_PUBLIC_DATA_PROVIDER=supabase` or `convex`

## Docs

- [Product spec](docs/SPEC.md)
- [Data providers](docs/data-providers.md)
- [Firebase](docs/firebase.md)
- [Supabase (alternate)](docs/supabase.md)
- [Convex (alternate)](docs/convex.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Changelog](CHANGELOG.md)
- [Code of conduct](CODE_OF_CONDUCT.md)
- [Support](SUPPORT.md)
- [Governance](docs/GOVERNANCE.md)

## Local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public landing. Log in at `/login`. Mock password for every demo account: `password8`.

| Email | Workspace |
| --- | --- |
| `creator@yaltopia.local` | Creator studio |
| `advertiser@yaltopia.local` | Advertiser |
| `both@yaltopia.local` | Both (switch) |
| `admin@yaltopia.local` | Admin queues |
| `payout@yaltopia.local` | Balances and payment requests only |

Mocks match `packages/contracts`.

## Contributing

This is a public MIT repo. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md) before opening a pull request.

- Bugs, features, and **spec changes** have GitHub issue templates.
- Security reports: [SECURITY.md](SECURITY.md) only.
- License of contributions: MIT, same as the project.

## License

MIT © 2026 [Yaltopia Tech](https://yaltopiatech.com/). Idea credit: Prime Store.
