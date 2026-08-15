"use client";

import Link from "next/link";

import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";

export function LegalAgree() {
  const locale = useLocale();
  return (
    <p className="text-center text-xs text-muted-foreground">
      {t(locale, "legalAgreeBefore")}{" "}
      <Link href="/terms" className="font-medium text-foreground underline-offset-4 hover:underline">
        {t(locale, "termsOfService")}
      </Link>
      {" "}
      {t(locale, "legalAgreeAnd")}{" "}
      <Link href="/privacy" className="font-medium text-foreground underline-offset-4 hover:underline">
        {t(locale, "privacyPolicy")}
      </Link>
      .
    </p>
  );
}
