import { query } from "./_generated/server";

export const listCategories = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("categories").collect();
    return rows.filter((row) => row.active);
  },
});

export const listCreators = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("creators").collect();
    return Promise.all(
      rows.map(async (creator) => {
        const socials = await ctx.db
          .query("creator_socials")
          .withIndex("by_creator", (q) => q.eq("creatorId", creator._id))
          .collect();
        const packages = await ctx.db
          .query("creator_packages")
          .withIndex("by_creator", (q) => q.eq("creatorId", creator._id))
          .collect();
        return { ...creator, socials, packages };
      }),
    );
  },
});

export const listLivePosts = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("campaign_criteria")
      .withIndex("by_status", (q) => q.eq("status", "live"))
      .collect();
  },
});
