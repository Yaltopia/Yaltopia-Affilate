# Yaltopia Affiliate — product spec

**Yaltopia Affiliate by Prime Store.** Prime Store originated the idea.

Open marketplace. Advertisers list offers and brief creators. Creators promote with a **promo code** and a **tracking link**. Admin’s **Payout Agent** checks what an advertiser owes and requests payment.

Shoppers stay anonymous.

## Surfaces

| Path | Audience | This pass |
| --- | --- | --- |
| `/` | Public | Marketing landing |
| `/join/advertiser`, `/join/creator` | Public | Placeholder + book a call |
| `/app/…` | Advertiser workspace (mock) | Overview, Creators, Briefs, Inbox, Analytics |
| `/admin` | Admin, Payout Agent | Later |
| `/r/{code}` | Shoppers | Later (Vercel Edge) |

Stack: Next.js App Router, Tailwind CSS, shadcn/ui, Vercel. Firebase primary. Supabase alternate via `NEXT_PUBLIC_DATA_PROVIDER`.

## Roles

Payout Agent is an **Admin capability**, not a fourth marketplace party.

| Role | Portal | Job |
| --- | --- | --- |
| `creator` | Customer | Profile, briefs, codes, earnings |
| `advertiser` | Customer | Offers, briefs, conversions, pay requests |
| `admin` | Admin | Approvals, signup criteria, assign agents |
| `payout_agent` | Admin | View balances; create `payment_request` to an advertiser |

A profile may be creator and advertiser. Admin assigns `admin` and `payout_agent`.

Payout Agent **cannot** approve creators, activate advertisers, edit offers, or release creator payouts.

Creator: `pending_review` → `approved` \| `rejected` \| `suspended`.  
Advertiser org: `pending_activation` → `active` \| `suspended`.

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

Creator: **accept**, **reject**, or **counter** (fee, KPIs, deadline, note). Either side may counter up to 6 rounds. On accept: mint code + link. Creator submits `proof_url`. `brief_fee` pays on `completed` by default.

Statuses: `requested` → `countered` → `accepted` \| `rejected` \| `expired` → `in_progress` → `submitted` → `completed` \| `disputed`.

## Money and events

API Money: `{ "amount": "1250.00", "currency": "ETB" }` — string amount, no floats.

Domain event: `{ id, type, occurred_at, org_id?, actor_id?, payload, schema_version }`.

Audit money, auth, and approval mutations. Never log secrets or raw payout numbers.

## Marketing landing (`/`)

Dark forest hero, then cream creator directory. No section in between.

1. Nav: Yaltopia Affiliate, Creators, Join as Advertiser, Join as Creator.
2. Hero: “Find creators to collaborate with.” Mint search pill in the headline. **@handle search** under the headline (dark field + mint button). Side card: See how it works → `#creators`.
3. Creators grid: photo, name, verified, city, followers, socials + handles, niche, brief price in ETB, Request.
4. Footer: Prime Store credit.

Search strips `@`, matches `creator_socials.handle`, scrolls to `#creators`. Default list is 1,000+ followers. Empty: one sentence on the grid.

Mocks in `lib/mocks/creators.ts` match `packages/contracts`.

## Customer and Admin nav (later)

Advertiser: Home, Offers, Find creators / Briefs, Applications, Conversions, Payment requests, Team.  
Creator: Home, Profile, Marketplace, Briefs, Codes & links, Earnings, Payout account.  
Admin: Creator queue, Advertiser queue, Offers, Users & Payout Agents, Signup criteria, Audit.  
Payout Agent: Advertiser balances, Payment requests, Ledger.

## Redirect and conversion (later)

`GET /r/{code}` — insert click via active provider admin SDK, last-click cookie `cookie_days`, 302 to destination.

Postback: `{ click_id | promo_code | link_code, order_ref, order: Money }`. Promo code wins over click.
