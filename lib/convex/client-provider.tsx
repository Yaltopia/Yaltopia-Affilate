"use client";

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

import { authClient } from "@/lib/convex/auth-client";
import { ConvexSessionSync } from "@/lib/convex/session-sync";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken?: string | null;
}) {
  if (!convex) return children;
  return (
    <ConvexBetterAuthProvider
      client={convex}
      authClient={authClient as never}
      initialToken={initialToken}
    >
      <ConvexSessionSync />
      {children}
    </ConvexBetterAuthProvider>
  );
}
