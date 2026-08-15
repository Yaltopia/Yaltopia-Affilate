"use client";

import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { cn } from "@/lib/utils";

export type BrowseMode = "creators" | "orders";

export function BrowseModeSwitch({
  mode,
  onMode,
}: {
  mode: BrowseMode;
  onMode: (mode: BrowseMode) => void;
}) {
  const locale = useLocale();

  return (
    <div
      role="tablist"
      aria-label={t(locale, "browseMode")}
      className="inline-flex rounded-full bg-secondary p-1 ring-1 ring-foreground/8"
    >
      {(["creators", "orders"] as const).map((value) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={mode === value}
          onClick={() => onMode(value)}
          className={cn(
            "h-9 rounded-full px-4 text-sm font-medium transition-colors",
            mode === value
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {value === "creators" ? t(locale, "creators") : t(locale, "orders")}
        </button>
      ))}
    </div>
  );
}
