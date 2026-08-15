import { NAV_REGISTRY } from "@/packages/contracts";

export const dashboardNav = NAV_REGISTRY.filter((item) => item.portal === "advertiser");
