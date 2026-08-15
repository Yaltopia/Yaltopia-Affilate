import { v } from "convex/values";

import { authComponent } from "./auth";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";

const DEMO_ROLES: Record<string, Array<"creator" | "advertiser" | "admin" | "payout_agent">> = {
  "creator@yaltopia.local": ["creator"],
  "advertiser@yaltopia.local": ["advertiser"],
  "both@yaltopia.local": ["creator", "advertiser"],
  "admin@yaltopia.local": ["admin"],
  "payout@yaltopia.local": ["payout_agent"],
};

type AuthUser = {
  userId?: string;
  _id?: string;
  email?: string;
  name?: string;
};

async function authUser(ctx: QueryCtx | MutationCtx) {
  return (await authComponent.getAuthUser(ctx)) as AuthUser | null;
}

async function sessionForProfile(
  ctx: QueryCtx | MutationCtx,
  profileId: Id<"profiles">,
) {
  const profile = await ctx.db.get(profileId);
  if (!profile || !("displayName" in profile) || !("locale" in profile)) return null;
  const roles = (await ctx.db
    .query("profile_roles")
    .withIndex("by_profile", (q) => q.eq("profileId", profileId))
    .collect()).map((row) => row.role);
  return {
    profileId,
    displayName: profile.displayName,
    locale: profile.locale,
    roles,
  };
}

export const me = query({
  args: {},
  handler: async (ctx) => {
    const user = await authUser(ctx);
    if (!user) return null;
    const subject = user.userId ?? user._id;
    if (!subject) return null;
    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_auth_subject", (q) => q.eq("authSubject", subject))
      .unique();
    if (!existing) return null;
    return sessionForProfile(ctx, existing._id);
  },
});

export const ensureMine = mutation({
  args: {
    roles: v.optional(
      v.array(
        v.union(
          v.literal("creator"),
          v.literal("advertiser"),
          v.literal("admin"),
          v.literal("payout_agent"),
        ),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const user = await authUser(ctx);
    if (!user) throw new Error("Not authenticated.");
    const subject = user.userId ?? user._id;
    if (!subject) throw new Error("Not authenticated.");
    const email = user.email?.toLowerCase();
    const displayName = user.name?.trim() || email || "Member";

    let profile = await ctx.db
      .query("profiles")
      .withIndex("by_auth_subject", (q) => q.eq("authSubject", subject))
      .unique();

    if (!profile) {
      const profileId = await ctx.db.insert("profiles", {
        authSubject: subject,
        displayName,
        locale: "en",
      });
      const demoRoles = email ? DEMO_ROLES[email] : undefined;
      const roles = demoRoles ?? args.roles ?? [];
      for (const role of roles) {
        await ctx.db.insert("profile_roles", { profileId, role });
      }
      await ctx.db.insert("audit_logs", {
        actorId: profileId,
        action: "auth.profile_created",
        targetType: "profile",
        targetId: profileId,
        meta: { roles, email: email ? "set" : "none" },
      });
      return sessionForProfile(ctx, profileId);
    }

    if (args.roles && args.roles.length > 0) {
      const current = await ctx.db
        .query("profile_roles")
        .withIndex("by_profile", (q) => q.eq("profileId", profile._id))
        .collect();
      if (current.length === 0) {
        for (const role of args.roles) {
          await ctx.db.insert("profile_roles", { profileId: profile._id, role });
        }
      }
    }

    return sessionForProfile(ctx, profile._id);
  },
});
