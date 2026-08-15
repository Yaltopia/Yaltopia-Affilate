"use client";

import { Search } from "lucide-react";

import { AdvertiserPostCard } from "@/components/marketplace/advertiser-post-card";
import { Reveal } from "@/components/motion/reveal";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { mockPosts } from "@/lib/mocks/criteria";
import type { SocialPlatform } from "@/packages/contracts";

export function ListedOrders({
  query,
  selectedNiches,
  selectedPlatforms,
  followers,
  price,
}: {
  query: string;
  selectedNiches: string[];
  selectedPlatforms: SocialPlatform[];
  followers: [number, number];
  price: [number, number];
}) {
  const locale = useLocale();
  const q = query.trim().replace(/^@+/, "").toLowerCase();
  const orders = mockPosts.filter((post) => {
    if (post.status !== "live") return false;
    if (
      q &&
      !post.title.toLowerCase().includes(q) &&
      !post.advertiserName.toLowerCase().includes(q) &&
      !post.niches.some((niche) => niche.toLowerCase().includes(q))
    ) {
      return false;
    }
    if (selectedNiches.length > 0 && !post.niches.some((niche) => selectedNiches.includes(niche))) {
      return false;
    }
    if (selectedPlatforms.length > 0 && !post.platforms.some((platform) => selectedPlatforms.includes(platform))) {
      return false;
    }
    if (post.minFollowers < followers[0] || post.minFollowers > followers[1]) return false;
    const budget = Number(post.budget.amount);
    if (budget < price[0] || budget > price[1]) return false;
    return true;
  });

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <Reveal className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">{t(locale, "ordersKicker")}</p>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          {t(locale, "ordersTitle")}
        </h2>
        <p className="text-sm text-muted-foreground">{t(locale, "ordersSupport")}</p>
      </Reveal>
      {orders.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <Search className="size-6 text-muted-foreground" aria-hidden />
            <EmptyTitle>{t(locale, "noOrders")}</EmptyTitle>
            <EmptyDescription>
              {query ? t(locale, "emptyFilters") : t(locale, "noOrders")}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {orders.map((post, index) => (
            <li key={post.id}>
              <Reveal delay={Math.min(index, 8) * 55} className="h-full">
                <AdvertiserPostCard post={post} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
