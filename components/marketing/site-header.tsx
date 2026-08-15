"use client";

import Link from "next/link";

import { AuthCta } from "@/components/auth/auth-cta";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { cn } from "@/lib/utils";

import { LocaleToggle } from "./locale-toggle";

export function SiteHeader({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const locale = useLocale();
  const muted = tone === "dark" ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground";

  return (
    <header
      className={cn(
        "ya-enter flex items-center justify-between gap-4 py-4",
        compact ? "px-3 md:px-4" : "px-4 md:px-10",
      )}
    >
      <BrandLockup tone={tone} />
      <nav className={`hidden items-center gap-6 text-sm lg:flex ${muted}`}>
        <Link href="/#creators" className={tone === "dark" ? "text-background underline decoration-primary decoration-2 underline-offset-8" : undefined}>
          {t(locale, "creators")}
        </Link>
        <Link href="/#orders">{t(locale, "orders")}</Link>
        <Link href="/join/creator">{t(locale, "creatorsJoin")}</Link>
        <Link href="/login">{t(locale, "logIn")}</Link>
      </nav>
      <div className="flex items-center gap-2">
        <LocaleToggle tone={tone} />
        <AuthCta tone={tone} />
      </div>
    </header>
  );
}
