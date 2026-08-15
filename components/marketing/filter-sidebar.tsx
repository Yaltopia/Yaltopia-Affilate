"use client";

import { SlidersHorizontal } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatEtb, formatFollowers } from "@/lib/format";
import { useCategories } from "@/lib/category-store";
import { nicheLabel, platformLabel, t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import type { SocialPlatform } from "@/packages/contracts";

import { MultiSelect } from "./multi-select";

const platforms: SocialPlatform[] = [
  "tiktok",
  "instagram",
  "youtube",
  "telegram",
  "facebook",
];

export const FOLLOWER_BOUNDS = { min: 1000, max: 5_000_000 };
export const PRICE_BOUNDS = { min: 0, max: 50000 };

type FilterSidebarProps = {
  niches: string[];
  selectedNiches: string[];
  selectedPlatforms: SocialPlatform[];
  followers: [number, number];
  price: [number, number];
  onToggleNiche: (niche: string) => void;
  onTogglePlatform: (platform: SocialPlatform) => void;
  onFollowers: (value: [number, number]) => void;
  onPrice: (value: [number, number]) => void;
  onReset: () => void;
};

export function FilterSidebar({
  niches,
  selectedNiches,
  selectedPlatforms,
  followers,
  price,
  onToggleNiche,
  onTogglePlatform,
  onFollowers,
  onPrice,
  onReset,
}: FilterSidebarProps) {
  const locale = useLocale();
  const categories = useCategories();

  return (
    <aside className="flex flex-col gap-4 overflow-visible rounded-md bg-card p-5 ring-1 ring-foreground/8">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
          <SlidersHorizontal className="size-4" aria-hidden />
          {t(locale, "filters")}
        </h2>
        <Button type="button" variant="ghost" size="sm" onClick={onReset}>
          {t(locale, "reset")}
        </Button>
      </div>
      <MultiSelect
        label={t(locale, "category")}
        placeholder={t(locale, "anyCategory")}
        selectedLabel={t(locale, "selected")}
        values={selectedNiches}
        options={niches.map((niche) => ({
          value: niche,
          label: nicheLabel(locale, niche, categories),
        }))}
        onToggle={onToggleNiche}
      />
      <MultiSelect
        label={t(locale, "platform")}
        placeholder={t(locale, "anyPlatform")}
        selectedLabel={t(locale, "selected")}
        values={selectedPlatforms}
        options={platforms.map((platform) => ({
          value: platform,
          label: platformLabel(locale, platform),
        }))}
        onToggle={onTogglePlatform}
      />
      <Accordion multiple defaultValue={["followers", "price"]}>
        <AccordionItem value="followers">
          <AccordionTrigger>{t(locale, "followers")}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 pt-2">
              <Slider
                min={FOLLOWER_BOUNDS.min}
                max={FOLLOWER_BOUNDS.max}
                step={10000}
                value={followers}
                onValueChange={(next) => {
                  if (Array.isArray(next) && next.length >= 2) {
                    onFollowers([Number(next[0]), Number(next[1])]);
                  }
                }}
              />
              <p className="font-mono text-xs text-muted-foreground">
                {formatFollowers(followers[0])} – {formatFollowers(followers[1])}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>{t(locale, "packagePrice")}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 pt-2">
              <Slider
                min={PRICE_BOUNDS.min}
                max={PRICE_BOUNDS.max}
                step={100}
                value={price}
                onValueChange={(next) => {
                  if (Array.isArray(next) && next.length >= 2) {
                    onPrice([Number(next[0]), Number(next[1])]);
                  }
                }}
              />
              <p className="font-mono text-xs text-muted-foreground">
                {formatEtb({ amount: String(price[0]), currency: "ETB" })} –{" "}
                {formatEtb({ amount: String(price[1]), currency: "ETB" })}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
