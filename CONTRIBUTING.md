# Contributing

Thanks for helping **Yaltopia Affiliate**. This is a public MIT repository. By opening a pull request you agree that your contribution is licensed under the same [MIT License](LICENSE) as the rest of the project.

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) first. Security issues go to [SECURITY.md](SECURITY.md) — never a public issue.

## First-time setup

You need **Node.js 20+**.

```bash
git clone https://github.com/Yaltopia/Yaltopia-Affilate.git
cd Yaltopia-Affilate
cp .env.example .env.local
npm install
npm run dev
```

- Landing: [http://localhost:3000](http://localhost:3000)
- Advertiser dashboard mock: [http://localhost:3000/app](http://localhost:3000/app)

Before you push:

```bash
npm run lint
npm run build
```

## How to propose a change

1. Search existing issues. Open one if nothing matches.
2. Use the right template:
   - **Bug** — something broken
   - **Feature** — product or UI idea
   - **Spec change** — required for enums, roles, Money, RBAC, or provider mappings
3. Fork (or branch from `main` if you have write access). One concern per pull request.
4. Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `spec:`, `chore:`.
5. Fill in the pull request template. A maintainer from [Yaltopia Tech](https://yaltopiatech.com/) will review.

Good first issues: copy, empty states, accessibility, mock data that still matches `packages/contracts`.

## Living spec

If you change statuses, roles, Money, events, or authorization, update **in the same PR**:

- `docs/SPEC.md`
- Firebase rules / indexes (`firebase/`)
- Supabase SQL (`supabase/migrations/`)
- `packages/contracts/`
- `CHANGELOG.md` under Unreleased

Do not ship UI that drifts from those contracts. Dashboard mocks in `lib/mocks/` must keep the same TypeScript shapes.

## What not to commit

- `.env`, `.env.local`, Firebase service accounts, Supabase service role keys
- Real payout account numbers or customer PII
- Click-fraud recipes or payout-bypass writeups (see [SECURITY.md](SECURITY.md))

## Review

Use the PR template. Vercel Preview Deployments will comment on UI PRs once the project is connected. Spec-only PRs do not need a preview.

Questions about working with us: [book a call](https://yaltopiatech.com/contact).
