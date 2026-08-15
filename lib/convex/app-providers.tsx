import type { ReactNode } from "react";

import { ConvexClientProvider } from "@/lib/convex/client-provider";
import { getToken } from "@/lib/convex/auth-server";
import { isConvexLive } from "@/lib/convex/env";

export async function AppProviders({ children }: { children: ReactNode }) {
  if (!isConvexLive()) return children;
  const token = await getToken();
  return <ConvexClientProvider initialToken={token}>{children}</ConvexClientProvider>;
}
