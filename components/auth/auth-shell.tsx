"use client";

import { type ReactNode } from "react";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { LocaleToggle } from "@/components/marketing/locale-toggle";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { cn } from "@/lib/utils";

export function AuthShell({
  panel,
  align = "center",
  children,
}: {
  panel: "login" | "creator" | "advertiser";
  align?: "center" | "start";
  children: ReactNode;
}) {
  const locale = useLocale();
  const title =
    panel === "creator"
      ? t(locale, "joinCreatorTitle")
      : panel === "advertiser"
        ? t(locale, "joinAdvertiserTitle")
        : t(locale, "authPanelTitle");
  const support =
    panel === "creator"
      ? t(locale, "joinCreatorSupport")
      : panel === "advertiser"
        ? t(locale, "joinAdvertiserSupport")
        : t(locale, "authPanelSupport");

  return (
    <div className="flex min-h-dvh flex-col bg-background lg:flex-row">
      <aside className="relative isolate flex min-h-52 flex-col justify-between overflow-hidden bg-foreground p-6 text-background sm:min-h-64 lg:w-[46%] lg:min-h-dvh lg:p-10">
        <div className="ya-auth-ribbons pointer-events-none absolute inset-0" aria-hidden />
        <p className="relative text-[11px] font-medium tracking-[0.22em] text-background/70 uppercase">
          {t(locale, "authKicker")}
        </p>
        <div className="relative max-w-md pb-2">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-3 max-w-sm text-sm text-background/70">{support}</p>
        </div>
      </aside>
      <section
        className={cn(
          "flex flex-1 flex-col px-5 py-6 sm:px-10 lg:px-16 lg:py-10",
          align === "start" ? "overflow-y-auto" : "justify-center",
        )}
      >
        <div className="mb-8 flex items-center justify-between gap-3">
          <BrandLockup />
          <LocaleToggle />
        </div>
        <div className={cn("w-full", align === "center" ? "mx-auto max-w-md" : "mx-auto max-w-2xl")}>
          {children}
        </div>
      </section>
    </div>
  );
}
