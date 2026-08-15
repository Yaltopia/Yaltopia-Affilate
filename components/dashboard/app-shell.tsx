"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { NAV_ICONS } from "@/components/dashboard/nav-icons";
import { LocaleToggle } from "@/components/marketing/locale-toggle";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/session-store";
import { cn } from "@/lib/utils";
import {
  PORTAL_HOME,
  hasRole,
  navForSession,
  primaryRole,
  roleLabel,
  type Portal,
} from "@/packages/contracts";

function pathActive(href: string, homeHref: string, pathname: string) {
  if (href === homeHref) return pathname === homeHref;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav({
  portal,
  collapsed,
  onNavigate,
}: {
  portal: Portal;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const session = useSession();
  const homeHref = PORTAL_HOME[portal];
  const nav = session ? navForSession(session, portal) : [];

  return (
    <nav aria-label="Workspace" className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
      {nav.map((item) => {
        const active = pathActive(item.href, homeHref, pathname);
        const Icon = NAV_ICONS[item.id];
        return (
          <Link
            key={item.id}
            href={item.href}
            title={collapsed ? item.label : undefined}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/25 text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              collapsed && "justify-center px-0",
            )}
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-md",
                active ? "bg-primary/40" : "bg-muted",
              )}
            >
              {Icon ? <Icon className="size-4" aria-hidden /> : null}
            </span>
            {!collapsed ? <span className="truncate">{item.label}</span> : null}
            {active && !collapsed ? <span className="ml-auto h-5 w-1 rounded-sm bg-primary" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({
  children,
  portal,
}: {
  children: React.ReactNode;
  portal: Portal;
}) {
  const router = useRouter();
  const session = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const canSwitch = session && hasRole(session, "creator") && hasRole(session, "advertiser");

  async function handleSignOut() {
    await signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh bg-background">
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-[width,transform] duration-200 lg:static",
          collapsed ? "w-[88px]" : "w-[264px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className={cn("flex h-14 items-center border-b border-border px-3", collapsed ? "justify-center" : "gap-2")}>
          {!collapsed ? <BrandLockup size="sm" /> : <span className="font-heading text-sm font-bold">YA</span>}
          <button
            type="button"
            className="ml-auto hidden size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted lg:grid"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
          <button
            type="button"
            className="ml-auto grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        </div>
        <SidebarNav portal={portal} collapsed={collapsed} onNavigate={() => setMobileOpen(false)} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-3 md:px-5">
          <button
            type="button"
            className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-4" />
          </button>
          <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
            {session ? `${session.displayName} · ${roleLabel(primaryRole(session))}` : "Workspace"}
          </p>
          <LocaleToggle />
          {canSwitch ? (
            <Button
              size="sm"
              variant="outline"
              render={<Link href={portal === "advertiser" ? "/studio" : "/app"} />}
            >
              {portal === "advertiser" ? "Studio" : "Advertiser"}
            </Button>
          ) : null}
          <Button size="sm" variant="outline" onClick={() => void handleSignOut()}>
            Sign out
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
