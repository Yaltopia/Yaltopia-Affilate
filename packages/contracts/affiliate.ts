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

export type SocialPlatform =
  | "tiktok"
  | "instagram"
  | "youtube"
  | "telegram"
  | "facebook"
  | "other";

export type CreatorSocial = {
  platform: SocialPlatform;
  handle: string;
  url: string;
  followerCount: number;
  proofUrl?: string;
};

export type Creator = {
  id: string;
  displayName: string;
  city: string;
  country: "ET";
  niche: string;
  status: CreatorStatus;
  photoUrl: string;
  socials: CreatorSocial[];
  briefFee: Money;
  maxFollowersDeclared: number;
  minFollowersRequired: number;
};

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
  | "in_progress"
  | "submitted"
  | "completed"
  | "disputed";

export type CollaborationBrief = {
  id: string;
  creatorId: string;
  offerTitle: string;
  note: string;
  status: CollaborationStatus;
  briefFee: Money;
  dueOn: string;
  promoCode?: string;
  platform: SocialPlatform;
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
