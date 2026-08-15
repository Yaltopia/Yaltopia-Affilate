"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/session-store";
import {
  PORTAL_HOME,
  hasRole,
  navForSession,
  primaryRole,
  roleLabel,
  type Portal,
} from "@/packages/contracts";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  portal,
}: {
  children: React.ReactNode;
  portal: Portal;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const homeHref = PORTAL_HOME[portal];
  const nav = session ? navForSession(session, portal) : [];
  const canSwitch =
    session && hasRole(session, "creator") && hasRole(session, "advertiser");

  async function handleSignOut() {
    await signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="flex flex-col gap-3 px-3 py-4 md:px-4">
        <div className="flex items-center justify-between gap-4">
          <BrandLockup size="sm" />
          <nav className="hidden rounded-full bg-card p-1 ring-1 ring-foreground/10 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === homeHref
                  ? pathname === homeHref
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground",
                    active && "bg-background text-foreground ring-1 ring-foreground/10",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            {session ? (
              <p className="hidden text-xs text-muted-foreground sm:block">
                {session.displayName} · {roleLabel(primaryRole(session))}
              </p>
            ) : null}
            {canSwitch ? (
              <Button
                size="sm"
                variant="outline"
                render={<Link href={portal === "advertiser" ? "/studio" : "/app"} />}
              >
                {portal === "advertiser" ? "Creator studio" : "Advertiser"}
              </Button>
            ) : null}
            <Button size="sm" variant="outline" onClick={() => void handleSignOut()}>
              Sign out
            </Button>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto lg:hidden">
          {nav.map((item) => {
            const active =
              item.href === homeHref ? pathname === homeHref : pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-sm text-muted-foreground ring-1 ring-foreground/10",
                  active && "bg-card text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="flex-1 px-3 pb-8 md:px-4">{children}</main>
    </div>
  );
}
