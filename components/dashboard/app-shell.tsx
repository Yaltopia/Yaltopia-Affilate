"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { dashboardNav } from "@/lib/dashboard-nav";
import { BOOK_A_CALL_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="flex flex-col gap-4 px-4 py-5 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary font-heading text-sm font-bold text-primary-foreground">
              YA
            </span>
            <span className="font-heading text-base font-semibold">Yaltopia Affiliate</span>
          </Link>
          <nav className="hidden rounded-full bg-card p-1 ring-1 ring-foreground/10 md:flex">
            {dashboardNav.map((item) => {
              const active =
                item.href === "/app"
                  ? pathname === "/app"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
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
          <Button size="sm" render={<a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer" />}>
            Book a call
          </Button>
        </div>
        <nav className="flex gap-2 overflow-x-auto md:hidden">
          {dashboardNav.map((item) => {
            const active =
              item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
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
      <main className="flex-1 px-4 pb-12 md:px-8">{children}</main>
    </div>
  );
}
