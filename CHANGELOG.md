# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Product spec for Creator, Advertiser, Admin, and Admin-owned Payout Agent.
- Provider contract: Firebase primary; Supabase or Convex alternate via `NEXT_PUBLIC_DATA_PROVIDER`.
- Dynamic creator signup gate (`creator.min_followers`, launch 1,000+).
- Promo code + tracking link attribution, CPC floor, video briefs with counter-offer.
- Public-repo hygiene (contributing, conduct, security, support, governance).
- Page claims: creators claim a listed handle; Admin confirms, rejects, assigns, or adds a person from `/admin/pages`.
- Yaltopia Tech site and book-a-call stay off the customer nav. The public footer has a Powered by Yaltopia Tech line only. Book-a-call stays on the README.
- RBAC: same login at `/login`. `/app`, `/studio`, and `/admin` are workspaces after sign-in, not the public site. One nav registry filtered by `Session.roles`. Admin is assigned; Payout Agent cannot approve or review KYC.
- Advertiser workspace at `/app` (briefs, posts, wallet). Creator studio at `/studio` (briefs, packages, codes, earnings). Admin console at `/admin`.
- KYC after registration at `/app/kyc` and `/studio/kyc` — not on the public package / join form or `/c/{id}`.
- Complete profiles: all five social links for both roles; creator packages; advertiser advertising-criteria posts.
- Creator packages associated on cards and `/c/{id}`. Advertisers publish posts at `/app/posts`; public order board at `/orders`. `/posts` redirects to `/orders`.
- After agree: advertiser wallet deposit matching the order, escrow, sample revisions, posted video, creator release ask; funds send only when criteria are met.
- Yaltopia Tech logo lockup with Affiliate wordmark; route and card loading states.
- Ops dashboard shell: collapsible sidebar from `NAV_REGISTRY`, KPI stat cards, role-grouped demo login picker.
- Social login only (Google + five platforms). Join grants social access; creator packages live at `/studio/packages`.
- Corners tightened (`--radius` 0.375rem). Buttons and chips use `rounded-md`, not pills.
- Customer credit is Yaltopia Tech (Prime Store line removed from the public footer).
- Landing directory switch: Creators or Orders. Advertiser request cards match the creator card layout (budget, platforms, KPIs, apply). Orders are not stacked above the creator grid.
- Admin adds marketplace categories at `/admin/categories`. The public filter, creator profile, and advertiser posts use that catalog.
- Landing filters: category and platform are multi-select dropdowns that stay open while toggling.
- Past campaigns on creator cards and `/c/{id}`: picker, video, charged Money, and views/likes/comments. Favikon placeholders use a labeled demo portfolio until the page is claimed.
- English and Amharic marketing copy with a persisted EN / አማ toggle.
- Customer-site motion: hero stagger, scroll reveals, and hover lifts. Honors reduced motion.
- Public Terms of Service (`/terms`) and Privacy Policy (`/privacy`). Social login, studio packages, KYC-after-join, wallet escrow, and RBAC are reflected. Operator is Yaltopia Tech. Placeholders remain for the Ethiopian registered address.
- Convex as a third data-provider option (`NEXT_PUBLIC_DATA_PROVIDER=convex`) with `convex/schema.ts` matching the Firebase and Supabase mappings.

## [0.1.0] - 2026-08-15

### Added

- Initial public repository: MIT license, Prime Store accreditation, living spec.
