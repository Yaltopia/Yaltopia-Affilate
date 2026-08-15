import { dataProviderId } from "@/lib/data-provider";

export function isConvexLive(): boolean {
  return (
    dataProviderId() === "convex" && Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)
  );
}
