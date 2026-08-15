# Yaltopia Affiliate — product spec

**Yaltopia Affiliate by Prime Store.** Prime Store originated the idea.

Open marketplace. Advertisers list offers and brief creators. Creators promote with a **promo code** and a **tracking link**. Admin’s **Payout Agent** checks what an advertiser owes and requests payment.

Shoppers stay anonymous.

## Surfaces

| Path | Audience | This pass |
| --- | --- | --- |
| `/` | Public | Marketing landing |
| `/c/{id}` | Public | Creator page. Favikon placeholders are unclaimed until the creator claims the handle. |
| `/posts` | Public | Live advertiser posts |
| `/login` | Public | Same email/password for every role. Account roles pick the workspace. |
| `/join/advertiser`, `/join/creator` | Public | Register + profile (creator packages). Signs in. No KYC here. Admin is not a join path. |
| `/app/…` | Advertiser after login | Overview, Profile, KYC, Posts, Creators, Briefs, Wallet, Inbox, Analytics |
| `/studio/…` | Creator after login | Briefs, Profile, KYC, Codes & links, Earnings |
| `/admin/…` | Admin / Payout Agent after login | Queues, KYC review, criteria, users, balances, payment requests, audit |
| `/r/{code}` | Shoppers | Later (Vercel Edge) |

Stack: Next.js App Router, Tailwind CSS, shadcn/ui, Vercel. Firebase primary. Supabase or Convex alternate via `NEXT_PUBLIC_DATA_PROVIDER` (`firebase` \| `supabase` \| `convex`).

## Roles

Payout Agent is an **Admin capability**, not a fourth marketplace party.

| Role | Portal | Job |
| --- | --- | --- |
| `creator` | Customer | Profile, briefs, codes, earnings |
| `advertiser` | Customer | Offers, briefs, conversions, pay requests |
| `admin` | Admin | Approvals, signup criteria, assign agents |
| `payout_agent` | Admin | View balances; create `payment_request` to an advertiser |

A profile may be creator and advertiser. Admin assigns `admin` and `payout_agent`. Those roles are **not** a public join.

**RBAC is required.** `/app`, `/studio`, and `/admin` are workspaces after login — not the public customer site. One login. `Session.roles` decides the portal:

| After login | Home | Sees |
| --- | --- | --- |
| `advertiser` | `/app` | Posts, creators, briefs, wallet |
| `creator` | `/studio` | Briefs, packages, codes, earnings |
| `creator` + `advertiser` | `/app` | Both workspaces; switch in the shell |
| `admin` | `/admin` | Queues, KYC, criteria, users, audit, balances |
| `payout_agent` | `/admin` | Balances and payment requests only |

Payout Agent **cannot** approve creators, activate advertisers, review KYC, edit offers, assign roles, or release creator payouts.

One nav registry (`NAV_REGISTRY` in `packages/contracts/rbac.ts`) filters by role. UI does not invent a second menu.

Creator: `pending_review` → `approved` \| `rejected` \| `suspended`.  
Advertiser org: `pending_activation` → `active` \| `suspended`.  
KYC: `incomplete` → `submitted` → `approved` \| `rejected`.

## KYC

Auth signup is open. **KYC happens after registration**, not on the public package / join form. Join is account + profile (and creator packages). Then `/app/kyc` or `/studio/kyc`.

**Marketplace access** (live offers, briefs, payouts) requires a complete KYC pack and Admin approval. Payout Agent cannot review KYC.

Documents live in private storage `kyc/{profile_id}/…`. Owner + Admin only. Never log file URLs, national ID numbers, or TIN values. Do not attach KYC files to GitHub issues.

### Advertiser (required)

| Kind | What |
| --- | --- |
| `tin_certificate` | TIN certificate upload |
| `national_id` | National ID upload |
| `business_license` | Business license upload |

Org stays `pending_activation` until KYC is `approved`.

### Creator (required)

| Kind | What |
| --- | --- |
| `national_id` | National ID upload |
| `liveness_photo` | Take a picture (device camera / `capture=user`) |
| `page_analytics` | Screenshot of page analytics |
| `admin_view` | Screenshot of admin view — proof they own the account |

Creator also meets `creator.min_followers` (launch 1,000+ on one social). Threshold + KYC are both required. Admin still confirms they are a real creator.

Join surfaces: `/join/advertiser`, `/join/creator` (register + profile only). KYC: `/app/kyc`, `/studio/kyc`.

## Complete profiles

KYC is not enough. Both roles must finish a **complete profile** before go-live.

### Shared — all social links

TikTok, Instagram, YouTube, Telegram, and Facebook each need a handle and profile URL. Creators also enter follower counts. This is the seller’s public social set.

### Creator

- Display name, city, niche, bio
- All five social links
- **Packages** — associated with the creator (`creators/{id}/packages`). At least one sellable package (`title`, `platform`, `deliverable`, `price` Money). Shown on cards and `/c/{id}` after the page is claimed.
- **Claim** — Listed pages start `unclaimed`. A creator claims at `/join/creator?claim={id}` or `/studio/claim` → `claim_pending`. Admin confirms (`claimed`) or rejects (back to `unclaimed`). Admin can also **add a person** and assign a page from `/admin/pages` without waiting for a public claim. Nobody else can sell that handle.

### Advertiser (seller)

- Business name, city, website, bio
- All five social links
- **Posts** — advertiser publishes a marketplace post (`AdvertiserPost` / `campaign_criteria`): title, description, platforms, niches, `min_followers`, views/likes/comments KPIs, budget Money. Compose at `/app/posts`. Public board: `/posts`.

Completeness helpers live in `packages/contracts` (`isCreatorProfileComplete`, `isAdvertiserProfileComplete`, `hasAllSocialLinks`).

## Creator signup (dynamic)

Auth signup is open. Marketplace access is gated by `platform_settings.creator.min_followers`.

Launch seed: `{ "amount": 1000, "operator": "gte" }` on **one** linked social, plus `url` and `proof_url`.

- Admin-only to change. Does not un-approve existing creators.
- Snapshot `min_followers_required` and `max_followers_declared` on submit.
- Threshold is necessary, not sufficient — Admin still confirms they are a real creator.

## Monetization

### Promo code + tracking link

On accept (catalog apply or brief), mint both. Either can attribute an order. If both exist, **promo code wins**. Advertiser can enter the code on a manual/COD conversion.

### CPC floor

Optional `cpc` Money on an offer. Unique click = same `ip_hash` + `ua_hash` + link within 24h. CPC + CPA both pay when a unique click converts.

### Video brief

Advertiser requests an approved creator: video post, platforms, `min_views` / `min_likes` / `min_comments`, `brief_fee` Money.

Creator: **accept**, **reject**, or **counter** (fee, KPIs, deadline, note). Either side may counter up to 6 rounds. On accept: mint code + link.

Statuses: `requested` → `countered` → `accepted` \| `rejected` \| `expired` → `funded` → `sample_review` → `posted` → `release_requested` → `completed` \| `disputed`.

`in_progress` and `submitted` are legacy aliases only.

### Wallet, escrow, sample, release

After the offer is **accepted**:

1. Advertiser **deposits** into their wallet (`available` Money). Deposit must be enough to **match the order** (`brief_fee`).
2. Advertiser **secures** the order: move `brief_fee` from `available` to `reserved`. Escrow `secured`. Status `funded`. Creator does not film until this happens.
3. Creator sends a **sample video**. Advertiser and creator go back and forth (`sample_review` rounds: `sample` | `feedback`). Funds stay reserved.
4. When the video is **posted** (live URL), status `posted`.
5. Creator **asks for release** with actual views / likes / comments.
6. **Funds send only when criteria are met** (`actual >= min_views / min_likes / min_comments`). Then escrow `released`, status `completed`, reserved decreases. If criteria fail, funds stay reserved.

Payout Agent can view advertiser balances. Payout Agent **cannot** release creator funds. Release is criteria-gated (system / Admin).

Wallet ledger types: `deposit` | `reserve` | `release` | `refund`. Never log raw payout numbers.

Surfaces: advertiser `/app/wallet` and `/app/briefs/{id}`; creator `/studio/briefs/{id}`.

## Money and events

API Money: `{ "amount": "1250.00", "currency": "ETB" }` — string amount, no floats.

Domain event: `{ id, type, occurred_at, org_id?, actor_id?, payload, schema_version }`.

Audit money, auth, and approval mutations. Never log secrets or raw payout numbers.

## Marketing landing (`/`)

Dark forest hero, then cream creator directory. No section in between.

1. Nav: Affiliate lockup, Creators, Posts, Creators join, Log in, **EN / አማ** locale toggle. No Dashboard. No Yaltopia Tech link — this is the customer site.
2. Hero: “Find creators to collaborate with.” Mint search pill in the headline. **@handle search** under the headline (dark field + mint button). Side card: See how it works → `#creators`.
3. Filters: **category** and **platform** are multi-select dropdowns. Follower and package-price ranges stay sliders.
4. Creators grid: photo-forward cards (name + from-price on the image), socials, package board, link to `/c/{id}`. Detail: photo + bio, sticky packages panel. Request goes to advertiser register (`/join/advertiser`), not KYC and not book-a-call.
5. Footer: Prime Store credit. A quiet **Powered by Yaltopia Tech** line sits below. Spec, GitHub, and book-a-call stay on the README.

Search strips `@`, matches `creator_socials.handle`, scrolls to `#creators`. Default list is 1,000+ followers. Empty: one sentence on the grid.

**Locale:** `en` | `am` (`Session.locale` / `packages/contracts`). Marketing copy and filter labels persist in `localStorage` (`ya.locale`). Amharic uses Noto Sans Ethiopic alongside Poppins.

**Motion:** Customer surfaces use a short rise/fade on first paint and IntersectionObserver reveals on scroll (hero stagger, filters, cards, footer). Hover lifts cards and the “See how it works” tile. No scroll hijack, marquees, or looping decoration. `prefers-reduced-motion: reduce` turns motion off.

Directory seed is the [Favikon Top 20 TikTokers in Ethiopia, May 2026](https://www.favikon.com/blog/top-tiktokers-ethiopia): rank, name, bio, TikTok score, and platforms named on that page. These are **placeholder pages**. Suggested handles are claimable by the creators (`claim_status`: `unclaimed` → `claim_pending` → `claimed`). Admin can add a person and assign a page from `/admin/pages`. Follower counts are only stored when Favikon stated them (SolozTactic 200k TikTok, Eshetu Melese 3M+ YouTube). Photos are stand-ins. Shapes match `packages/contracts`.

## Customer and Admin nav

Driven by `NAV_REGISTRY`. Filter with `navForSession`.

Advertiser (`/app`): Overview, Profile, KYC, Posts, Creators, Briefs, Wallet, Inbox, Analytics.  
Creator (`/studio`): Briefs, Profile, KYC, Codes & links, Earnings, Claim page.  
Admin (`/admin`): Overview, Pages & people, Creator queue, Advertisers, KYC review, Signup criteria, Users, Balances, Payment requests, Audit.  
Payout Agent (`/admin`): Overview, Balances, Payment requests.

## Redirect and conversion (later)

`GET /r/{code}` — insert click via active provider admin SDK, last-click cookie `cookie_days`, 302 to destination.

Postback: `{ click_id | promo_code | link_code, order_ref, order: Money }`. Promo code wins over click.
