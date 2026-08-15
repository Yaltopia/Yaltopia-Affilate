"use client";

import { SlidersHorizontal } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatEtb, formatFollowers } from "@/lib/format";
import type { SocialPlatform } from "@/packages/contracts";

const platforms: { id: SocialPlatform; label: string }[] = [
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
  { id: "telegram", label: "Telegram" },
  { id: "facebook", label: "Facebook" },
];

export const FOLLOWER_BOUNDS = { min: 1000, max: 150000 };
export const PRICE_BOUNDS = { min: 0, max: 25000 };

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
  return (
    <aside className="flex flex-col gap-4 rounded-3xl bg-card p-5 ring-1 ring-foreground/8">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
          <SlidersHorizontal className="size-4" aria-hidden />
          Filters
        </h2>
        <Button type="button" variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      <Accordion multiple defaultValue={["niche", "followers", "price", "platform"]}>
        <AccordionItem value="niche">
          <AccordionTrigger>Niche</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2.5">
              {niches.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Checkbox
                    id={`niche-${item}`}
                    checked={selectedNiches.includes(item)}
                    onCheckedChange={() => onToggleNiche(item)}
                  />
                  <Label htmlFor={`niche-${item}`} className="font-normal">
                    {item}
                  </Label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="platform">
          <AccordionTrigger>Platform</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2.5">
              {platforms.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`platform-${item.id}`}
                    checked={selectedPlatforms.includes(item.id)}
                    onCheckedChange={() => onTogglePlatform(item.id)}
                  />
                  <Label htmlFor={`platform-${item.id}`} className="font-normal">
                    {item.label}
                  </Label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="followers">
          <AccordionTrigger>Followers</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 pt-2">
              <Slider
                min={FOLLOWER_BOUNDS.min}
                max={FOLLOWER_BOUNDS.max}
                step={500}
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
          <AccordionTrigger>Brief price</AccordionTrigger>
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
