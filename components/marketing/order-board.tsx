"use client";

import Link from "next/link";

import { AdvertiserPostCard } from "@/components/marketplace/advertiser-post-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { mockPosts } from "@/lib/mocks/criteria";

export function OrderBoard() {
  const locale = useLocale();
  const live = mockPosts.filter((post) => post.status === "live");

  return (
    <div className="flex flex-col gap-5">
      <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{t(locale, "ordersKicker")}</p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            {t(locale, "ordersTitle")}
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">{t(locale, "ordersSupport")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button render={<Link href="/join/advertiser" />}>{t(locale, "postAnOrder")}</Button>
          <Button variant="outline" render={<Link href="/#creators" />}>
            {t(locale, "creators")}
          </Button>
        </div>
      </Reveal>
      {live.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t(locale, "noOrders")}</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {live.map((post, index) => (
            <li key={post.id}>
              <Reveal delay={Math.min(index, 6) * 55} className="h-full">
                <AdvertiserPostCard post={post} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
