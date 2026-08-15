"use client";

import Link from "next/link";

import { SocialGlyph } from "@/components/marketing/social-icons";
import { Button } from "@/components/ui/button";
import { formatEtb, formatFollowers } from "@/lib/format";
import { nicheLabel, t } from "@/lib/i18n";
import { useCategories } from "@/lib/category-store";
import { useLocale } from "@/lib/locale-store";
import type { AdvertiserPost } from "@/packages/contracts";

export function AdvertiserPostCard({ post }: { post: AdvertiserPost }) {
  const locale = useLocale();
  const categories = useCategories();

  return (
    <article className="ya-hover-lift group flex h-full flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 hover:ring-foreground/20">
      <div className="relative flex min-h-44 flex-col justify-end bg-foreground p-3 text-background">
        <p className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium text-foreground">
          {t(locale, "lookingToSponsor")}
        </p>
        <p className="absolute top-3 right-3 font-mono text-sm font-semibold text-primary">
          {formatEtb(post.budget)}
        </p>
        <p className="text-xs text-background/70">{post.advertiserName}</p>
        <h3 className="font-heading text-xl font-semibold tracking-tight">{post.title}</h3>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <p className="text-sm text-muted-foreground">{post.description}</p>
        <ul className="flex flex-wrap items-center gap-1">
          {post.platforms.map((platform) => (
            <li
              key={platform}
              className="flex size-7 items-center justify-center rounded-full bg-secondary"
              title={platform}
            >
              <SocialGlyph platform={platform} />
            </li>
          ))}
          {post.niches.map((niche) => (
            <li key={niche} className="rounded-full bg-secondary px-2 py-0.5 text-[11px]">
              {nicheLabel(locale, niche, categories)}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-1.5">
          <Stat label={t(locale, "followers")} value={`${formatFollowers(post.minFollowers)}+`} />
          <Stat label={t(locale, "views")} value={formatFollowers(post.minViews)} />
          <Stat label={t(locale, "likes")} value={formatFollowers(post.minLikes)} />
          <Stat label={t(locale, "comments")} value={formatFollowers(post.minComments)} />
        </div>
        <Button className="mt-auto w-full" render={<Link href="/join/creator" />}>
          {t(locale, "applyAsCreator")}
        </Button>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/70 px-2.5 py-1.5">
      <p className="text-[10px] tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="font-mono text-sm font-semibold">{value}</p>
    </div>
  );
}
