export type Money = {
  amount: string;
  currency: "ETB";
};

export type Locale = "en" | "am";

export type Role = "creator" | "advertiser" | "admin" | "payout_agent";

export type CreatorStatus =
  | "pending_review"
  | "approved"
  | "rejected"
  | "suspended";

export type AdvertiserStatus = "pending_activation" | "active" | "suspended";

export type KycStatus = "incomplete" | "submitted" | "approved" | "rejected";

export type KycDocumentKind =
  | "tin_certificate"
  | "national_id"
  | "business_license"
  | "liveness_photo"
  | "page_analytics"
  | "admin_view";

export const ADVERTISER_KYC_DOCS: KycDocumentKind[] = [
  "tin_certificate",
  "national_id",
  "business_license",
];

export const CREATOR_KYC_DOCS: KycDocumentKind[] = [
  "national_id",
  "liveness_photo",
  "page_analytics",
  "admin_view",
];

export const KYC_LABELS: Record<KycDocumentKind, string> = {
  tin_certificate: "TIN certificate",
  national_id: "National ID",
  business_license: "Business license",
  liveness_photo: "Live photo",
  page_analytics: "Page analytics screenshot",
  admin_view: "Admin view screenshot",
};

export type KycDocument = {
  kind: KycDocumentKind;
  fileName: string;
};

export type KycSubmission = {
  id: string;
  role: "advertiser" | "creator";
  status: KycStatus;
  documents: KycDocument[];
};

export type SocialPlatform =
  | "tiktok"
  | "instagram"
  | "youtube"
  | "telegram"
  | "facebook"
  | "other";

export const REQUIRED_SOCIAL_PLATFORMS: SocialPlatform[] = [
  "tiktok",
  "instagram",
  "youtube",
  "telegram",
  "facebook",
];

export type SocialAccount = {
  platform: SocialPlatform;
  handle: string;
  url: string;
  followerCount: number;
  proofUrl?: string;
};

/** @deprecated use SocialAccount */
export type CreatorSocial = SocialAccount;

export type CreatorPackage = {
  id: string;
  title: string;
  platform: SocialPlatform;
  deliverable: string;
  price: Money;
};

/** Public past work. Charge is Money. Engagement is views / likes / comments. */
export type CreatorCampaign = {
  id: string;
  brand: string;
  title: string;
  platform: SocialPlatform;
  charged: Money;
  views: number;
  likes: number;
  comments: number;
  videoUrl: string;
  postedOn: string;
};

export type PageClaimStatus = "unclaimed" | "claim_pending" | "claimed";

export const FAVIKON_ET_TIKTOK_2026 = {
  source: "favikon_et_tiktok_2026",
  sourceUrl: "https://www.favikon.com/blog/top-tiktokers-ethiopia",
  sourceLabel: "Favikon Top 20 TikTokers in Ethiopia, May 2026",
} as const;

/** Admin-owned marketplace category. `name` is stored on `Creator.niche`. */
export type MarketplaceCategory = {
  id: string;
  slug: string;
  name: string;
  nameAm: string;
  active: boolean;
};

export const DEFAULT_CATEGORIES: MarketplaceCategory[] = [
  { id: "cat-motivation", slug: "motivation", name: "Motivation", nameAm: "ተነሳሽነት", active: true },
  { id: "cat-lifestyle", slug: "lifestyle", name: "Lifestyle", nameAm: "የኑሮ ዘይቤ", active: true },
  { id: "cat-comedy", slug: "comedy", name: "Comedy", nameAm: "ኮሜዲ", active: true },
  { id: "cat-music", slug: "music", name: "Music", nameAm: "ሙዚቃ", active: true },
  { id: "cat-film", slug: "film", name: "Film", nameAm: "ፊልም", active: true },
  { id: "cat-wildlife", slug: "wildlife", name: "Wildlife", nameAm: "የዱር እንስሳት", active: true },
  { id: "cat-food", slug: "food", name: "Food", nameAm: "ምግብ", active: true },
  { id: "cat-faith", slug: "faith", name: "Faith", nameAm: "እምነት", active: true },
  { id: "cat-fitness", slug: "fitness", name: "Fitness", nameAm: "የአካል ብቃት", active: true },
  { id: "cat-culture", slug: "culture", name: "Culture", nameAm: "ባህል", active: true },
  { id: "cat-sports", slug: "sports", name: "Sports", nameAm: "ስፖርት", active: true },
  { id: "cat-fashion", slug: "fashion", name: "Fashion", nameAm: "ፋሽን", active: true },
  { id: "cat-beauty", slug: "beauty", name: "Beauty", nameAm: "ውበት", active: true },
  { id: "cat-tech", slug: "tech", name: "Tech", nameAm: "ቴክኖሎጂ", active: true },
  { id: "cat-tv", slug: "tv", name: "TV", nameAm: "ቴሌቪዥን", active: true },
];

export function categorySlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findCategory(
  categories: MarketplaceCategory[],
  name: string,
): MarketplaceCategory | undefined {
  const slug = categorySlug(name);
  return categories.find((category) => category.slug === slug || category.name === name);
}

export function activeCategoryNames(categories: MarketplaceCategory[]): string[] {
  return categories.filter((category) => category.active).map((category) => category.name);
}

export type Creator = {
  id: string;
  displayName: string;
  bio: string;
  city: string;
  country: "ET";
  niche: string;
  status: CreatorStatus;
  photoUrl: string;
  socials: SocialAccount[];
  packages: CreatorPackage[];
  campaigns: CreatorCampaign[];
  briefFee: Money;
  maxFollowersDeclared: number;
  minFollowersRequired: number;
  claimStatus: PageClaimStatus;
  source?: string;
  sourceUrl?: string;
  rank?: number;
  tiktokScore?: number;
  claimedByProfileId?: string;
  claimedByName?: string;
};

export type AdvertiserProfile = {
  id: string;
  name: string;
  bio: string;
  city: string;
  website: string;
  socials: SocialAccount[];
};

/** Advertiser marketplace post. Stored as `campaign_criteria`. */
export type AdvertiserPost = {
  id: string;
  advertiserId: string;
  advertiserName: string;
  title: string;
  description: string;
  platforms: SocialPlatform[];
  niches: string[];
  minFollowers: number;
  minViews: number;
  minLikes: number;
  minComments: number;
  budget: Money;
  status: "draft" | "live" | "closed";
};

/** @deprecated use AdvertiserPost */
export type CampaignCriteria = AdvertiserPost;

export type PlatformSettingMinFollowers = {
  amount: number;
  operator: "gte" | "gt";
};

export const DEFAULT_MIN_FOLLOWERS: PlatformSettingMinFollowers = {
  amount: 1000,
  operator: "gte",
};

export type CollaborationStatus =
  | "requested"
  | "countered"
  | "accepted"
  | "rejected"
  | "expired"
  | "funded"
  | "sample_review"
  | "posted"
  | "release_requested"
  | "in_progress"
  | "submitted"
  | "completed"
  | "disputed";

export type EscrowStatus = "none" | "secured" | "released" | "refunded";

export type SampleRound = {
  id: string;
  orderId: string;
  authorRole: "creator" | "advertiser";
  kind: "sample" | "feedback";
  note: string;
  videoUrl?: string;
  createdAt: string;
};

export type AdvertiserWallet = {
  id: string;
  advertiserId: string;
  available: Money;
  reserved: Money;
};

export type WalletLedgerEntry = {
  id: string;
  walletId: string;
  type: "deposit" | "reserve" | "release" | "refund";
  amount: Money;
  orderId?: string;
  createdAt: string;
};

export type CollaborationBrief = {
  id: string;
  creatorId: string;
  advertiserId: string;
  offerTitle: string;
  note: string;
  status: CollaborationStatus;
  briefFee: Money;
  dueOn: string;
  promoCode?: string;
  platform: SocialPlatform;
  minViews: number;
  minLikes: number;
  minComments: number;
  escrowStatus: EscrowStatus;
  postedUrl?: string;
  actualViews?: number;
  actualLikes?: number;
  actualComments?: number;
};

export type EarningType = "cpc" | "cpa" | "brief_fee";

export type EarningStatus = "pending" | "approved" | "rejected" | "reversed";

export type AttributedVia = "link" | "promo_code" | "both_code_wins";

export type DomainEvent = {
  id: string;
  type: string;
  occurred_at: string;
  org_id?: string;
  actor_id?: string;
  payload: Record<string, unknown>;
  schema_version: number;
};

export function maxFollowers(creator: Creator): number {
  return Math.max(0, ...creator.socials.map((s) => s.followerCount));
}

export function primarySocial(creator: Creator): SocialAccount | undefined {
  return creator.socials
    .filter((social) => social.handle.trim())
    .reduce<SocialAccount | undefined>((best, social) => {
      if (!best || social.followerCount > best.followerCount) return social;
      return best;
    }, undefined);
}

export function isPlaceholderPage(creator: Creator): boolean {
  return creator.claimStatus === "unclaimed" || creator.claimStatus === "claim_pending";
}

export function isPageClaimable(creator: Creator): boolean {
  return creator.claimStatus === "unclaimed";
}

export function claimPath(creator: Creator): string {
  return `/join/creator?claim=${encodeURIComponent(creator.id)}`;
}

export function meetsFollowerGate(
  creator: Creator,
  gate: PlatformSettingMinFollowers = DEFAULT_MIN_FOLLOWERS,
): boolean {
  const best = maxFollowers(creator);
  return gate.operator === "gt" ? best > gate.amount : best >= gate.amount;
}

export function normalizeHandle(query: string): string {
  return query.trim().replace(/^@+/, "").toLowerCase();
}

export function matchesHandle(creator: Creator, query: string): boolean {
  const q = normalizeHandle(query);
  if (!q) return true;
  return creator.socials.some((s) => s.handle.toLowerCase().includes(q));
}

export function isPricedMoney(money: Money): boolean {
  const amount = Number(money.amount);
  return Number.isFinite(amount) && amount > 0;
}

export function socialFilled(social: SocialAccount): boolean {
  return Boolean(social.handle.trim() && social.url.trim());
}

export function hasAllSocialLinks(socials: SocialAccount[]): boolean {
  return REQUIRED_SOCIAL_PLATFORMS.every((platform) =>
    socials.some((social) => social.platform === platform && socialFilled(social)),
  );
}

export function isCreatorProfileComplete(creator: Pick<Creator, "displayName" | "bio" | "city" | "niche" | "socials" | "packages">): boolean {
  return (
    Boolean(creator.displayName.trim() && creator.bio.trim() && creator.city.trim() && creator.niche.trim()) &&
    hasAllSocialLinks(creator.socials) &&
    creator.packages.length > 0 &&
    creator.packages.every((pkg) =>
      Boolean(pkg.title.trim() && pkg.deliverable.trim() && isPricedMoney(pkg.price)),
    )
  );
}

export function isAdvertiserProfileComplete(
  profile: Pick<AdvertiserProfile, "name" | "bio" | "city" | "website" | "socials">,
): boolean {
  return (
    Boolean(profile.name.trim() && profile.bio.trim() && profile.city.trim() && profile.website.trim()) &&
    hasAllSocialLinks(profile.socials)
  );
}

export function moneyUnits(money: Money): bigint {
  const cleaned = money.amount.trim();
  const negative = cleaned.startsWith("-");
  const raw = negative ? cleaned.slice(1) : cleaned;
  const [whole = "0", frac = ""] = raw.split(".");
  const hundred = BigInt(100);
  const units = BigInt(whole || "0") * hundred + BigInt((frac + "00").slice(0, 2));
  return negative ? -units : units;
}

export function moneyFromUnits(units: bigint, currency: Money["currency"] = "ETB"): Money {
  const hundred = BigInt(100);
  const zero = BigInt(0);
  const sign = units < zero ? "-" : "";
  const abs = units < zero ? -units : units;
  const whole = abs / hundred;
  const frac = (abs % hundred).toString().padStart(2, "0");
  return { amount: `${sign}${whole.toString()}.${frac}`, currency };
}

export function moneyGte(left: Money, right: Money): boolean {
  return moneyUnits(left) >= moneyUnits(right);
}

export function addMoney(left: Money, right: Money): Money {
  return moneyFromUnits(moneyUnits(left) + moneyUnits(right), left.currency);
}

export function subtractMoney(left: Money, right: Money): Money {
  return moneyFromUnits(moneyUnits(left) - moneyUnits(right), left.currency);
}

export function canCoverOrder(available: Money, order: Money): boolean {
  return moneyGte(available, order);
}

export function criteriaMet(
  actual: { views: number; likes: number; comments: number },
  required: Pick<CollaborationBrief, "minViews" | "minLikes" | "minComments">,
): boolean {
  return (
    actual.views >= required.minViews &&
    actual.likes >= required.minLikes &&
    actual.comments >= required.minComments
  );
}

export function canStartSample(brief: CollaborationBrief): boolean {
  return brief.escrowStatus === "secured" && (brief.status === "funded" || brief.status === "sample_review");
}

export function canRequestRelease(brief: CollaborationBrief): boolean {
  return brief.status === "posted" && brief.escrowStatus === "secured" && Boolean(brief.postedUrl);
}

export function canSendFunds(brief: CollaborationBrief): boolean {
  if (brief.status !== "release_requested" || brief.escrowStatus !== "secured") return false;
  if (brief.actualViews == null || brief.actualLikes == null || brief.actualComments == null) {
    return false;
  }
  return criteriaMet(
    { views: brief.actualViews, likes: brief.actualLikes, comments: brief.actualComments },
    brief,
  );
}

export function startingPackagePrice(creator: Creator): Money {
  if (creator.packages.length === 0) return creator.briefFee;
  return creator.packages.reduce((lowest, pkg) =>
    Number(pkg.price.amount) < Number(lowest.amount) ? pkg.price : lowest,
  creator.packages[0].price);
}
