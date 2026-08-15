"use client";

import { useEffect } from "react";

import { applyRemoteSession } from "@/lib/session-store";
import { isConvexLive } from "@/lib/convex/env";
import type { Session } from "@/packages/contracts";

export function ConvexSessionSync() {
  useEffect(() => {
    if (!isConvexLive()) return;
    void fetch("/api/session")
      .then((response) => response.json())
      .then((session: Session | null) => {
        if (session) applyRemoteSession(session);
      })
      .catch(() => undefined);
  }, []);
  return null;
}
