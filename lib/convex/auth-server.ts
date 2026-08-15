import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";
const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL ?? "";

const notConfigured = async () =>
  new Response("Convex auth is not configured.", { status: 501 });

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
} = convexUrl && convexSiteUrl
  ? convexBetterAuthNextJs({
      convexUrl,
      convexSiteUrl,
    })
  : {
      handler: { GET: notConfigured, POST: notConfigured },
      preloadAuthQuery: async () => {
        throw new Error("Convex auth is not configured.");
      },
      isAuthenticated: async () => false,
      getToken: async () => null,
      fetchAuthQuery: async () => {
        throw new Error("Convex auth is not configured.");
      },
      fetchAuthMutation: async () => {
        throw new Error("Convex auth is not configured.");
      },
    };
