import { mutation } from "./_generated/server";

const CATEGORIES = [
  { slug: "motivation", name: "Motivation", nameAm: "ተነሳሽነት" },
  { slug: "lifestyle", name: "Lifestyle", nameAm: "የኑሮ ዘይቤ" },
  { slug: "comedy", name: "Comedy", nameAm: "ኮሜዲ" },
  { slug: "music", name: "Music", nameAm: "ሙዚቃ" },
  { slug: "film", name: "Film", nameAm: "ፊልም" },
  { slug: "wildlife", name: "Wildlife", nameAm: "የዱር እንስሳት" },
  { slug: "food", name: "Food", nameAm: "ምግብ" },
  { slug: "faith", name: "Faith", nameAm: "እምነት" },
  { slug: "fitness", name: "Fitness", nameAm: "የአካል ብቃት" },
  { slug: "culture", name: "Culture", nameAm: "ባህል" },
  { slug: "sports", name: "Sports", nameAm: "ስፖርት" },
  { slug: "fashion", name: "Fashion", nameAm: "ፋሽን" },
  { slug: "beauty", name: "Beauty", nameAm: "ውበት" },
  { slug: "tech", name: "Tech", nameAm: "ቴክኖሎጂ" },
  { slug: "tv", name: "TV", nameAm: "ቴሌቪዥን" },
];

const CREATORS: Array<{
  slug: string;
  rank: number;
  tiktokScore: number;
  displayName: string;
  handle: string;
  niche: string;
}> = [
  { slug: "c-adonay", rank: 1, tiktokScore: 96.5, displayName: "Adonay Berhane Hailemichael", handle: "adonayberhane", niche: "Motivation" },
  { slug: "c-yuti", rank: 2, tiktokScore: 94.3, displayName: "Yuti Nass", handle: "yuti_nass", niche: "Lifestyle" },
  { slug: "c-sami", rank: 3, tiktokScore: 92, displayName: "SAMI (ፓፓ)", handle: "sami", niche: "Comedy" },
  { slug: "c-veronica", rank: 4, tiktokScore: 91.8, displayName: "Veronica Adane", handle: "veronicaadane", niche: "Music" },
  { slug: "c-henok", rank: 5, tiktokScore: 90.1, displayName: "Henok", handle: "henok", niche: "Film" },
  { slug: "c-amleset", rank: 6, tiktokScore: 89.4, displayName: "Amleset", handle: "amleset", niche: "Lifestyle" },
  { slug: "c-lijramsa", rank: 7, tiktokScore: 88.2, displayName: "Lij Ramsa", handle: "lijramsa", niche: "Comedy" },
  { slug: "c-mekdes", rank: 8, tiktokScore: 87.6, displayName: "Mekdes", handle: "mekdes", niche: "Lifestyle" },
  { slug: "c-metaferia", rank: 9, tiktokScore: 86.9, displayName: "Metaferia", handle: "metaferia", niche: "Culture" },
  { slug: "c-eshetu", rank: 10, tiktokScore: 86.1, displayName: "Eshetu", handle: "eshetu", niche: "Comedy" },
  { slug: "c-yordanos", rank: 11, tiktokScore: 85.4, displayName: "Yordanos", handle: "yordanos", niche: "Lifestyle" },
  { slug: "c-tomas", rank: 12, tiktokScore: 84.8, displayName: "Tomas", handle: "tomas", niche: "Sports" },
  { slug: "c-dallol", rank: 13, tiktokScore: 84.1, displayName: "Dallol", handle: "dallol", niche: "Wildlife" },
  { slug: "c-lual", rank: 14, tiktokScore: 83.5, displayName: "Lual", handle: "lual", niche: "Music" },
  { slug: "c-soloz", rank: 15, tiktokScore: 82.9, displayName: "Soloz", handle: "soloz", niche: "Comedy" },
  { slug: "c-alexis", rank: 16, tiktokScore: 82.2, displayName: "Alexis", handle: "alexis", niche: "Fashion" },
  { slug: "c-mahi", rank: 17, tiktokScore: 81.6, displayName: "Mahi", handle: "mahi", niche: "Beauty" },
  { slug: "c-teklu", rank: 18, tiktokScore: 80.9, displayName: "Teklu", handle: "teklu", niche: "Faith" },
  { slug: "c-dirshu", rank: 19, tiktokScore: 80.2, displayName: "Dirshu", handle: "dirshu", niche: "Culture" },
  { slug: "c-neba", rank: 20, tiktokScore: 79.6, displayName: "Neba", handle: "neba", niche: "Lifestyle" },
];

export const marketplace = mutation({
  args: {},
  handler: async (ctx) => {
    for (const category of CATEGORIES) {
      const existing = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", category.slug))
        .unique();
      if (!existing) {
        await ctx.db.insert("categories", { ...category, active: true });
      }
    }

    const min = await ctx.db
      .query("platform_settings")
      .withIndex("by_key", (q) => q.eq("key", "creator.min_followers"))
      .unique();
    if (!min) {
      await ctx.db.insert("platform_settings", {
        key: "creator.min_followers",
        value: { amount: 1000, operator: "gte" },
      });
    }

    for (const row of CREATORS) {
      const existing = await ctx.db
        .query("creators")
        .withIndex("by_slug", (q) => q.eq("slug", row.slug))
        .unique();
      if (existing) continue;
      const creatorId = await ctx.db.insert("creators", {
        displayName: row.displayName,
        bio: "",
        city: "Addis Ababa",
        niche: row.niche,
        photoUrl: `/creators/${row.slug}.webp`,
        slug: row.slug,
        status: "approved",
        claimStatus: "unclaimed",
        source: "favikon_et_tiktok_2026",
        sourceUrl: "https://www.favikon.com/blog/top-tiktokers-ethiopia",
        rank: row.rank,
        tiktokScore: row.tiktokScore,
        minFollowersRequired: 1000,
      });
      await ctx.db.insert("creator_socials", {
        creatorId,
        platform: "tiktok",
        handle: row.handle,
        url: `https://www.tiktok.com/@${row.handle}`,
        followerCount: 0,
      });
    }

    await ctx.db.insert("audit_logs", {
      action: "ops.seed_marketplace",
      targetType: "catalog",
      meta: { categories: CATEGORIES.length, creators: CREATORS.length },
    });

    return { categories: CATEGORIES.length, creators: CREATORS.length };
  },
});
