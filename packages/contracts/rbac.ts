import type { Role } from "./affiliate";
import type { Session } from "./provider";

export type Portal = "advertiser" | "creator" | "admin";

export type Capability =
  | "portal.advertiser"
  | "portal.creator"
  | "portal.admin"
  | "admin.approve_creators"
  | "admin.activate_advertisers"
  | "admin.review_kyc"
  | "admin.edit_settings"
  | "admin.assign_roles"
  | "admin.manage_pages"
  | "admin.view_audit"
  | "payout.view_balances"
  | "payout.request_payment"
  | "payout.release_funds";

export type NavItem = {
  id: string;
  href: string;
  label: string;
  portal: Portal;
  anyOf: Role[];
};

const ADMIN_ONLY: Role[] = ["admin"];
const OPS: Role[] = ["admin", "payout_agent"];

/** One registry. UI filters by session roles. */
export const NAV_REGISTRY: readonly NavItem[] = [
  { id: "adv.overview", href: "/app", label: "Overview", portal: "advertiser", anyOf: ["advertiser"] },
  { id: "adv.profile", href: "/app/profile", label: "Profile", portal: "advertiser", anyOf: ["advertiser"] },
  { id: "adv.kyc", href: "/app/kyc", label: "KYC", portal: "advertiser", anyOf: ["advertiser"] },
  { id: "adv.posts", href: "/app/posts", label: "Posts", portal: "advertiser", anyOf: ["advertiser"] },
  { id: "adv.creators", href: "/app/creators", label: "Creators", portal: "advertiser", anyOf: ["advertiser"] },
  { id: "adv.briefs", href: "/app/briefs", label: "Briefs", portal: "advertiser", anyOf: ["advertiser"] },
  { id: "adv.wallet", href: "/app/wallet", label: "Wallet", portal: "advertiser", anyOf: ["advertiser"] },
  { id: "adv.inbox", href: "/app/inbox", label: "Inbox", portal: "advertiser", anyOf: ["advertiser"] },
  { id: "adv.analytics", href: "/app/analytics", label: "Analytics", portal: "advertiser", anyOf: ["advertiser"] },

  { id: "cre.briefs", href: "/studio", label: "Briefs", portal: "creator", anyOf: ["creator"] },
  { id: "cre.profile", href: "/studio/profile", label: "Profile", portal: "creator", anyOf: ["creator"] },
  { id: "cre.kyc", href: "/studio/kyc", label: "KYC", portal: "creator", anyOf: ["creator"] },
  { id: "cre.codes", href: "/studio/codes", label: "Codes & links", portal: "creator", anyOf: ["creator"] },
  { id: "cre.earnings", href: "/studio/earnings", label: "Earnings", portal: "creator", anyOf: ["creator"] },
  { id: "cre.claim", href: "/studio/claim", label: "Claim page", portal: "creator", anyOf: ["creator"] },

  { id: "adm.overview", href: "/admin", label: "Overview", portal: "admin", anyOf: OPS },
  { id: "adm.pages", href: "/admin/pages", label: "Pages & people", portal: "admin", anyOf: ADMIN_ONLY },
  { id: "adm.creators", href: "/admin/creators", label: "Creator queue", portal: "admin", anyOf: ADMIN_ONLY },
  { id: "adm.advertisers", href: "/admin/advertisers", label: "Advertisers", portal: "admin", anyOf: ADMIN_ONLY },
  { id: "adm.kyc", href: "/admin/kyc", label: "KYC review", portal: "admin", anyOf: ADMIN_ONLY },
  { id: "adm.settings", href: "/admin/settings", label: "Signup criteria", portal: "admin", anyOf: ADMIN_ONLY },
  { id: "adm.users", href: "/admin/users", label: "Users", portal: "admin", anyOf: ADMIN_ONLY },
  { id: "adm.balances", href: "/admin/balances", label: "Balances", portal: "admin", anyOf: OPS },
  { id: "adm.payments", href: "/admin/payments", label: "Payment requests", portal: "admin", anyOf: OPS },
  { id: "adm.audit", href: "/admin/audit", label: "Audit", portal: "admin", anyOf: ADMIN_ONLY },
];

export const PORTAL_HOME: Record<Portal, string> = {
  advertiser: "/app",
  creator: "/studio",
  admin: "/admin",
};

export const ROLE_CAPABILITIES: Record<Role, readonly Capability[]> = {
  creator: ["portal.creator"],
  advertiser: ["portal.advertiser"],
  admin: [
    "portal.admin",
    "admin.approve_creators",
    "admin.activate_advertisers",
    "admin.review_kyc",
    "admin.edit_settings",
    "admin.assign_roles",
    "admin.manage_pages",
    "admin.view_audit",
    "payout.view_balances",
    "payout.request_payment",
    "payout.release_funds",
  ],
  payout_agent: ["portal.admin", "payout.view_balances", "payout.request_payment"],
};

export function hasRole(session: Session, role: Role): boolean {
  return session.roles.includes(role);
}

export function capabilitiesFor(session: Session): Capability[] {
  const set = new Set<Capability>();
  for (const role of session.roles) {
    for (const capability of ROLE_CAPABILITIES[role]) {
      set.add(capability);
    }
  }
  return [...set];
}

export function hasCapability(session: Session, capability: Capability): boolean {
  return capabilitiesFor(session).includes(capability);
}

export function portalForPath(path: string): Portal | null {
  if (path === "/app" || path.startsWith("/app/")) return "advertiser";
  if (path === "/studio" || path.startsWith("/studio/")) return "creator";
  if (path === "/admin" || path.startsWith("/admin/")) return "admin";
  return null;
}

export function canAccessPortal(session: Session, portal: Portal): boolean {
  if (portal === "advertiser") return hasRole(session, "advertiser");
  if (portal === "creator") return hasRole(session, "creator");
  return hasRole(session, "admin") || hasRole(session, "payout_agent");
}

export function canAccessPath(session: Session, path: string): boolean {
  const portal = portalForPath(path);
  if (!portal) return true;
  if (!canAccessPortal(session, portal)) return false;
  const listed = NAV_REGISTRY.find((item) => item.href === path);
  if (listed) {
    return listed.anyOf.some((role) => session.roles.includes(role));
  }
  return path === PORTAL_HOME[portal] || path.startsWith(`${PORTAL_HOME[portal]}/`);
}

export function homePath(session: Session): string {
  if (hasRole(session, "admin") || hasRole(session, "payout_agent")) return PORTAL_HOME.admin;
  if (hasRole(session, "advertiser")) return PORTAL_HOME.advertiser;
  if (hasRole(session, "creator")) return PORTAL_HOME.creator;
  return "/";
}

export function navForSession(session: Session, portal?: Portal): NavItem[] {
  return NAV_REGISTRY.filter((item) => {
    if (portal && item.portal !== portal) return false;
    return item.anyOf.some((role) => session.roles.includes(role));
  });
}

export function roleLabel(role: Role): string {
  if (role === "payout_agent") return "Payout agent";
  if (role === "advertiser") return "Advertiser";
  if (role === "creator") return "Creator";
  return "Admin";
}

export function primaryRole(session: Session): Role {
  if (hasRole(session, "admin")) return "admin";
  if (hasRole(session, "payout_agent")) return "payout_agent";
  if (hasRole(session, "advertiser")) return "advertiser";
  return "creator";
}
