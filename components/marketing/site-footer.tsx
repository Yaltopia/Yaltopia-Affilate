"use client";

import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { GITHUB_ISSUES_URL, GITHUB_URL, YALTOPIA_TECH_URL } from "@/lib/site";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const [poweredBefore, poweredAfter] = t(locale, "poweredBy", { org: "__ORG__" }).split("__ORG__");

  return (
    <footer
      className={
        compact
          ? "mt-auto flex flex-col gap-4 px-3 py-6 md:px-4"
          : "mt-auto flex flex-col gap-6 px-4 py-10 md:px-10"
      }
    >
      <Separator />
      <Reveal from="fade" className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <BrandLockup size="sm" />
          <p>{t(locale, "footerCredit")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground">
              {t(locale, "termsOfService")}
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              {t(locale, "privacyPolicy")}
            </Link>
            <Link href="/orders" className="hover:text-foreground">
              {t(locale, "orders")}
            </Link>
            <Link href="/join/advertiser" className="hover:text-foreground">
              {t(locale, "advertisers")}
            </Link>
            <Link href="/join/creator" className="hover:text-foreground">
              {t(locale, "creators")}
            </Link>
            <Link href="/login" className="hover:text-foreground">
              {t(locale, "logIn")}
            </Link>
            <a href={GITHUB_URL} className="hover:text-foreground" rel="noreferrer">
              {t(locale, "sourceCode")}
            </a>
            <a href={GITHUB_ISSUES_URL} className="hover:text-foreground" rel="noreferrer">
              {t(locale, "issueTracker")}
            </a>
          </nav>
          <Button size="sm" render={<Link href="/join/advertiser" />}>
            {t(locale, "joinAdvertiser")}
          </Button>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {poweredBefore}
        <a href={YALTOPIA_TECH_URL} className="underline underline-offset-4 hover:text-foreground">
          Yaltopia Tech
        </a>
        {poweredAfter}
      </p>
      </Reveal>
    </footer>
  );
}
