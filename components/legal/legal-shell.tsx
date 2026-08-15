import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { LEGAL_UPDATED } from "@/lib/site";

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader tone="light" compact />
      <main className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Yaltopia Affiliate</p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {LEGAL_UPDATED}</p>
        <article className="legal-prose mt-8 flex flex-col gap-8 text-sm leading-relaxed">
          {children}
        </article>
        <p className="mt-10 text-xs text-muted-foreground">
          Also see{" "}
          <Link href="/terms">Terms of Service</Link>
          {" · "}
          <Link href="/privacy">Privacy Policy</Link>
          .
        </p>
      </main>
      <SiteFooter compact />
    </div>
  );
}
