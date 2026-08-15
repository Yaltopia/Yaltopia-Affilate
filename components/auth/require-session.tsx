"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { PageLoader } from "@/components/brand/page-loader";
import { clearStaleAuthCookie, useSession } from "@/lib/session-store";
import { canAccessPath, homePath, type Portal } from "@/packages/contracts";

export function RequireSession({
  portal,
  children,
}: {
  portal: Portal;
  children: React.ReactNode;
}) {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      clearStaleAuthCookie();
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!canAccessPath(session, pathname)) {
      router.replace(homePath(session));
    }
  }, [pathname, ready, router, session]);

  if (!ready || !session || !canAccessPath(session, pathname)) {
    return <PageLoader label="Opening workspace" />;
  }

  return children;
}
