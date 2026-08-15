import { NAV_REGISTRY } from "@/packages/contracts";

export const studioNav = NAV_REGISTRY.filter((item) => item.portal === "creator");
