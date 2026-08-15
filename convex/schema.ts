import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const money = v.object({
  amount: v.string(),
  currency: v.literal("ETB"),
});

const role = v.union(
  v.literal("creator"),
  v.literal("advertiser"),
  v.literal("admin"),
  v.literal("payout_agent"),
);

const locale = v.union(v.literal("en"), v.literal("am"));

const socialPlatform = v.union(
  v.literal("tiktok"),
  v.literal("instagram"),
  v.literal("youtube"),
  v.literal("telegram"),
  v.literal("facebook"),
  v.literal("other"),
);

const creatorStatus = v.union(
  v.literal("pending_review"),
  v.literal("approved"),
  v.literal("rejected"),
  v.literal("suspended"),
);

const advertiserStatus = v.union(
  v.literal("pending_activation"),
  v.literal("active"),
  v.literal("suspended"),
);

const claimStatus = v.union(
  v.literal("unclaimed"),
  v.literal("claim_pending"),
  v.literal("claimed"),
);

const kycStatus = v.union(
  v.literal("incomplete"),
  v.literal("submitted"),
  v.literal("approved"),
  v.literal("rejected"),
);

const kycKind = v.union(
  v.literal("tin_certificate"),
  v.literal("national_id"),
  v.literal("business_license"),
  v.literal("liveness_photo"),
  v.literal("page_analytics"),
  v.literal("admin_view"),
);

const collaborationStatus = v.union(
  v.literal("requested"),
  v.literal("countered"),
  v.literal("accepted"),
  v.literal("rejected"),
  v.literal("expired"),
  v.literal("funded"),
  v.literal("sample_review"),
  v.literal("posted"),
  v.literal("release_requested"),
  v.literal("in_progress"),
  v.literal("submitted"),
  v.literal("completed"),
  v.literal("disputed"),
);

const escrowStatus = v.union(
  v.literal("none"),
  v.literal("secured"),
  v.literal("released"),
  v.literal("refunded"),
);

const earningStatus = v.union(
  v.literal("pending"),
  v.literal("approved"),
  v.literal("rejected"),
  v.literal("reversed"),
);

export default defineSchema({
  profiles: defineTable({
    authSubject: v.string(),
    displayName: v.string(),
    locale,
    phone: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  }).index("by_auth_subject", ["authSubject"]),

  profile_roles: defineTable({
    profileId: v.id("profiles"),
    role,
  })
    .index("by_profile", ["profileId"])
    .index("by_role", ["role"]),

  platform_settings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedBy: v.optional(v.id("profiles")),
  }).index("by_key", ["key"]),

  advertisers: defineTable({
    ownerProfileId: v.id("profiles"),
    name: v.string(),
    bio: v.optional(v.string()),
    city: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    website: v.optional(v.string()),
    billingEmail: v.optional(v.string()),
    status: advertiserStatus,
  }).index("by_owner", ["ownerProfileId"]),

  advertiser_members: defineTable({
    advertiserId: v.id("advertisers"),
    profileId: v.id("profiles"),
    memberRole: v.union(v.literal("owner"), v.literal("member")),
  })
    .index("by_advertiser", ["advertiserId"])
    .index("by_profile", ["profileId"]),

  advertiser_socials: defineTable({
    advertiserId: v.id("advertisers"),
    platform: socialPlatform,
    handle: v.string(),
    url: v.string(),
    followerCount: v.number(),
  }).index("by_advertiser", ["advertiserId"]),

  creators: defineTable({
    profileId: v.optional(v.id("profiles")),
    displayName: v.string(),
    bio: v.optional(v.string()),
    city: v.optional(v.string()),
    niche: v.string(),
    photoUrl: v.optional(v.string()),
    status: creatorStatus,
    claimStatus,
    source: v.optional(v.string()),
    sourceUrl: v.optional(v.string()),
    rank: v.optional(v.number()),
    tiktokScore: v.optional(v.number()),
    minFollowersRequired: v.optional(v.number()),
    maxFollowersDeclared: v.optional(v.number()),
    verifiedAt: v.optional(v.number()),
    reviewedBy: v.optional(v.id("profiles")),
    reviewNote: v.optional(v.string()),
  })
    .index("by_profile", ["profileId"])
    .index("by_status", ["status"])
    .index("by_claim_status", ["claimStatus"]),

  creator_socials: defineTable({
    creatorId: v.id("creators"),
    platform: socialPlatform,
    handle: v.string(),
    url: v.string(),
    followerCount: v.number(),
    proofStorageId: v.optional(v.id("_storage")),
  }).index("by_creator", ["creatorId"]),

  creator_packages: defineTable({
    creatorId: v.id("creators"),
    title: v.string(),
    platform: socialPlatform,
    deliverable: v.string(),
    price: money,
  }).index("by_creator", ["creatorId"]),

  kyc_submissions: defineTable({
    profileId: v.id("profiles"),
    role: v.union(v.literal("creator"), v.literal("advertiser")),
    status: kycStatus,
    reviewNote: v.optional(v.string()),
    reviewedBy: v.optional(v.id("profiles")),
    submittedAt: v.optional(v.number()),
  }).index("by_profile_role", ["profileId", "role"]),

  kyc_documents: defineTable({
    submissionId: v.id("kyc_submissions"),
    kind: kycKind,
    storageId: v.id("_storage"),
  }).index("by_submission", ["submissionId"]),

  campaign_criteria: defineTable({
    advertiserId: v.id("advertisers"),
    advertiserName: v.string(),
    title: v.string(),
    description: v.string(),
    platforms: v.array(socialPlatform),
    niches: v.array(v.string()),
    minFollowers: v.number(),
    minViews: v.number(),
    minLikes: v.number(),
    minComments: v.number(),
    budget: money,
    status: v.union(v.literal("draft"), v.literal("live"), v.literal("closed")),
  })
    .index("by_advertiser", ["advertiserId"])
    .index("by_status", ["status"]),

  offers: defineTable({
    advertiserId: v.id("advertisers"),
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    destinationUrl: v.string(),
    price: v.optional(money),
    commissionType: v.union(v.literal("percent"), v.literal("flat")),
    commissionValue: v.string(),
    cpc: v.optional(money),
    cookieDays: v.number(),
    status: v.union(
      v.literal("draft"),
      v.literal("pending_review"),
      v.literal("live"),
      v.literal("paused"),
      v.literal("archived"),
    ),
  }).index("by_advertiser", ["advertiserId"]),

  offer_applications: defineTable({
    offerId: v.id("offers"),
    creatorId: v.id("creators"),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    decidedBy: v.optional(v.id("profiles")),
  })
    .index("by_offer", ["offerId"])
    .index("by_creator", ["creatorId"]),

  collaboration_requests: defineTable({
    advertiserId: v.id("advertisers"),
    creatorId: v.id("creators"),
    offerId: v.optional(v.id("offers")),
    offerTitle: v.string(),
    note: v.string(),
    deliverable: v.string(),
    platforms: v.array(socialPlatform),
    minViews: v.number(),
    minLikes: v.number(),
    minComments: v.number(),
    briefFee: money,
    dueOn: v.optional(v.string()),
    status: collaborationStatus,
    escrowStatus,
    postedUrl: v.optional(v.string()),
    actualViews: v.optional(v.number()),
    actualLikes: v.optional(v.number()),
    actualComments: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
  })
    .index("by_advertiser", ["advertiserId"])
    .index("by_creator", ["creatorId"]),

  collaboration_terms: defineTable({
    requestId: v.id("collaboration_requests"),
    proposedBy: v.id("profiles"),
    briefFee: money,
    minViews: v.optional(v.number()),
    minLikes: v.optional(v.number()),
    minComments: v.optional(v.number()),
    note: v.optional(v.string()),
  }).index("by_request", ["requestId"]),

  sample_rounds: defineTable({
    orderId: v.id("collaboration_requests"),
    authorRole: v.union(v.literal("creator"), v.literal("advertiser")),
    kind: v.union(v.literal("sample"), v.literal("feedback")),
    note: v.string(),
    videoUrl: v.optional(v.string()),
  }).index("by_order", ["orderId"]),

  wallets: defineTable({
    ownerProfileId: v.id("profiles"),
    advertiserId: v.optional(v.id("advertisers")),
    available: money,
    reserved: money,
  })
    .index("by_owner", ["ownerProfileId"])
    .index("by_advertiser", ["advertiserId"]),

  wallet_ledger: defineTable({
    walletId: v.id("wallets"),
    type: v.union(
      v.literal("deposit"),
      v.literal("reserve"),
      v.literal("release"),
      v.literal("refund"),
    ),
    amount: money,
    orderId: v.optional(v.id("collaboration_requests")),
  }).index("by_wallet", ["walletId"]),

  escrow_holds: defineTable({
    orderId: v.id("collaboration_requests"),
    walletId: v.id("wallets"),
    amount: money,
    status: v.union(
      v.literal("pending"),
      v.literal("secured"),
      v.literal("released"),
      v.literal("refunded"),
    ),
  }).index("by_order", ["orderId"]),

  release_requests: defineTable({
    orderId: v.id("collaboration_requests"),
    status: v.union(v.literal("requested"), v.literal("paid"), v.literal("blocked")),
    actualViews: v.number(),
    actualLikes: v.number(),
    actualComments: v.number(),
  }).index("by_order", ["orderId"]),

  tracking_links: defineTable({
    linkCode: v.string(),
    creatorId: v.id("creators"),
    offerId: v.optional(v.id("offers")),
    collaborationId: v.optional(v.id("collaboration_requests")),
    status: v.union(v.literal("active"), v.literal("revoked")),
  }).index("by_code", ["linkCode"]),

  promo_codes: defineTable({
    code: v.string(),
    creatorId: v.id("creators"),
    offerId: v.optional(v.id("offers")),
    collaborationId: v.optional(v.id("collaboration_requests")),
    status: v.union(v.literal("active"), v.literal("revoked")),
  }).index("by_code", ["code"]),

  clicks: defineTable({
    linkId: v.id("tracking_links"),
    clickPublicId: v.string(),
    ipHash: v.optional(v.string()),
    uaHash: v.optional(v.string()),
    referrer: v.optional(v.string()),
    landingUrl: v.optional(v.string()),
    isUnique: v.boolean(),
  }).index("by_link", ["linkId"]),

  conversions: defineTable({
    linkId: v.optional(v.id("tracking_links")),
    promoCodeId: v.optional(v.id("promo_codes")),
    clickId: v.optional(v.id("clicks")),
    offerId: v.optional(v.id("offers")),
    creatorId: v.id("creators"),
    advertiserId: v.id("advertisers"),
    orderRef: v.string(),
    order: money,
    commission: money,
    attributedVia: v.union(
      v.literal("link"),
      v.literal("promo_code"),
      v.literal("both_code_wins"),
    ),
    source: v.union(v.literal("postback"), v.literal("manual"), v.literal("import")),
    status: earningStatus,
    holdUntil: v.optional(v.number()),
  })
    .index("by_advertiser_order", ["advertiserId", "orderRef"])
    .index("by_creator", ["creatorId"]),

  earnings: defineTable({
    type: v.union(v.literal("cpc"), v.literal("cpa"), v.literal("brief_fee")),
    creatorId: v.id("creators"),
    advertiserId: v.id("advertisers"),
    amount: money,
    status: earningStatus,
    sourceId: v.optional(v.string()),
  }).index("by_creator", ["creatorId"]),

  payment_requests: defineTable({
    advertiserId: v.id("advertisers"),
    amount: money,
    status: v.union(
      v.literal("draft"),
      v.literal("requested"),
      v.literal("paid"),
      v.literal("overdue"),
      v.literal("cancelled"),
    ),
    dueAt: v.optional(v.number()),
    requestedBy: v.optional(v.id("profiles")),
  }).index("by_advertiser", ["advertiserId"]),

  payment_request_items: defineTable({
    paymentRequestId: v.id("payment_requests"),
    earningId: v.id("earnings"),
  }).index("by_request", ["paymentRequestId"]),

  creator_payouts: defineTable({
    creatorId: v.id("creators"),
    amount: money,
    method: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("paid"),
      v.literal("failed"),
    ),
    paidAt: v.optional(v.number()),
    paymentRequestId: v.optional(v.id("payment_requests")),
  }).index("by_creator", ["creatorId"]),

  audit_logs: defineTable({
    actorId: v.optional(v.id("profiles")),
    action: v.string(),
    targetType: v.optional(v.string()),
    targetId: v.optional(v.string()),
    meta: v.any(),
    requestId: v.optional(v.string()),
  }).index("by_actor", ["actorId"]),

  domain_events: defineTable({
    type: v.string(),
    occurredAt: v.number(),
    orgId: v.optional(v.string()),
    actorId: v.optional(v.string()),
    payload: v.any(),
    schemaVersion: v.number(),
  }).index("by_type", ["type"]),
});
