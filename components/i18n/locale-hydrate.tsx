"use client";

import { useLocale } from "@/lib/locale-store";

export function LocaleHydrate() {
  useLocale();
  return null;
}
