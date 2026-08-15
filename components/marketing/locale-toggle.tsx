"use client";

import { useLocale, setLocale } from "@/lib/locale-store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleToggle({
  tone = "light",
}: {
  tone?: "dark" | "light";
}) {
  const locale = useLocale();

  return (
    <div
      role="group"
      aria-label={t(locale, "language")}
      className={cn(
        "inline-flex rounded-lg p-0.5 text-xs font-medium",
        tone === "dark" ? "bg-background/10 text-background/70" : "bg-secondary text-muted-foreground",
      )}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-md px-2 py-1 transition-colors",
          locale === "en" &&
            (tone === "dark" ? "bg-background text-foreground" : "bg-background text-foreground shadow-sm"),
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("am")}
        className={cn(
          "rounded-md px-2 py-1 transition-colors",
          locale === "am" &&
            (tone === "dark" ? "bg-background text-foreground" : "bg-background text-foreground shadow-sm"),
        )}
      >
        {"\u12a0\u121b"}
      </button>
    </div>
  );
}
