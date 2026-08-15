import type { Role, Session } from "@/packages/contracts";

export const DEMO_PASSWORD = "password8";

export type MockAccount = {
  email: string;
  password: string;
  session: Session;
};

export const demoAccounts: MockAccount[] = [
  {
    email: "creator@yaltopia.local",
    password: DEMO_PASSWORD,
    session: {
      profileId: "u-creator",
      displayName: "Yuti Nass",
      locale: "en",
      roles: ["creator"],
    },
  },
  {
    email: "advertiser@yaltopia.local",
    password: DEMO_PASSWORD,
    session: {
      profileId: "u-advertiser",
      displayName: "Prime Store",
      locale: "en",
      roles: ["advertiser"],
    },
  },
  {
    email: "both@yaltopia.local",
    password: DEMO_PASSWORD,
    session: {
      profileId: "u-both",
      displayName: "Seifu Fantahun",
      locale: "en",
      roles: ["creator", "advertiser"],
    },
  },
  {
    email: "admin@yaltopia.local",
    password: DEMO_PASSWORD,
    session: {
      profileId: "u-admin",
      displayName: "Yaltopia Admin",
      locale: "en",
      roles: ["admin"],
    },
  },
  {
    email: "payout@yaltopia.local",
    password: DEMO_PASSWORD,
    session: {
      profileId: "u-payout",
      displayName: "Payout Desk",
      locale: "en",
      roles: ["payout_agent"],
    },
  },
];

export const demoRoleHint: Record<string, string> = {
  "creator@yaltopia.local": "Creator studio — briefs, packages, codes, earnings",
  "advertiser@yaltopia.local": "Advertiser workspace — posts, briefs, wallet",
  "both@yaltopia.local": "Creator and advertiser — switch workspaces",
  "admin@yaltopia.local": "Admin — queues, KYC, criteria, users",
  "payout@yaltopia.local": "Payout agent — balances and payment requests only",
};

export function accountLabel(roles: Role[]): string {
  if (roles.includes("admin")) return "Admin";
  if (roles.includes("payout_agent")) return "Payout agent";
  if (roles.includes("creator") && roles.includes("advertiser")) return "Both";
  if (roles.includes("advertiser")) return "Advertiser";
  return "Creator";
}
