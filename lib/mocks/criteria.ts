import type { AdvertiserPost } from "@/packages/contracts";

export const mockPosts: AdvertiserPost[] = [
  {
    id: "post-1",
    advertiserId: "adv-primestore",
    advertiserName: "Prime Store",
    title: "Coffee launch — 15s TikTok",
    description: "Show the bag, say the code, keep it in-frame for 3 seconds. Amharic or English.",
    platforms: ["tiktok", "instagram"],
    niches: ["Lifestyle", "Food"],
    minFollowers: 10000,
    minViews: 8000,
    minLikes: 400,
    minComments: 40,
    budget: { amount: "25000.00", currency: "ETB" },
    status: "live",
  },
  {
    id: "post-2",
    advertiserId: "adv-primestore",
    advertiserName: "Prime Store",
    title: "Fashion drop — reel + story",
    description: "Hawassa and Addis creators. Try-on, then the code on screen.",
    platforms: ["instagram"],
    niches: ["Fashion"],
    minFollowers: 20000,
    minViews: 12000,
    minLikes: 800,
    minComments: 60,
    budget: { amount: "40000.00", currency: "ETB" },
    status: "live",
  },
  {
    id: "post-3",
    advertiserId: "adv-rift",
    advertiserName: "Rift Cola",
    title: "Comedy skit — looking to sponsor",
    description: "30s TikTok. Product in the punchline. Amharic first. Code on screen at the end.",
    platforms: ["tiktok"],
    niches: ["Comedy"],
    minFollowers: 15000,
    minViews: 20000,
    minLikes: 900,
    minComments: 80,
    budget: { amount: "18000.00", currency: "ETB" },
    status: "live",
  },
];

/** @deprecated use mockPosts */
export const mockCriteria = mockPosts;
