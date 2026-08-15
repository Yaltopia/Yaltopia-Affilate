"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";

import { PackageList } from "@/components/marketplace/package-list";
import { formatEtb, formatFollowers } from "@/lib/format";
import { nicheLabel, t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { ClaimPageButton } from "@/components/marketplace/claim-page-button";
import {
  isPageClaimable,
  isPlaceholderPage,
  maxFollowers,
  primarySocial,
  startingPackagePrice,
  type Creator,
} from "@/packages/contracts";

import { SocialGlyph } from "./social-icons";

export function CreatorCard({ creator }: { creator: Creator }) {
  const followers = maxFollowers(creator);
  const from = startingPackagePrice(creator);
  const page = primarySocial(creator);
  const locale = useLocale();
  const [photoReady, setPhotoReady] = useState(false);

  return (
    <article className="ya-hover-lift group flex h-full flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 hover:ring-foreground/20">
      <Link href={`/c/${creator.id}`} className="relative block overflow-hidden bg-secondary">
        {!photoReady ? (
          <div className="absolute inset-0 animate-pulse bg-secondary" aria-hidden />
        ) : null}
        <Image
          src={creator.photoUrl}
          alt=""
          width={640}
          height={800}
          onLoad={() => setPhotoReady(true)}
          className={cn(
            "aspect-4/5 w-full object-cover transition-[opacity,transform] duration-300 group-hover:scale-[1.03] motion-reduce:transform-none",
            photoReady ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
        <p className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium">
          {creator.rank ? `#${String(creator.rank).padStart(2, "0")} · ` : ""}
          {nicheLabel(locale, creator.niche)}
        </p>
        {isPlaceholderPage(creator) ? (
          <p className="absolute top-3 right-3 rounded-full bg-foreground/80 px-2.5 py-0.5 text-xs text-background">
            {creator.claimStatus === "claim_pending" ? t(locale, "claimReview") : t(locale, "unclaimed")}
          </p>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-background">
          <div className="min-w-0">
            <p className="flex items-center gap-1 font-heading text-lg font-semibold tracking-tight">
              <span className="truncate">{creator.displayName}</span>
              {creator.status === "approved" ? (
                <BadgeCheck className="size-4 shrink-0 text-primary" aria-label="Approved creator" />
              ) : null}
            </p>
            <p className="text-xs text-background/75">
              {page ? `@${page.handle}` : creator.city} · {formatFollowers(followers)}
            </p>
          </div>
          {isPlaceholderPage(creator) ? (
            <p className="shrink-0 text-right font-mono text-xs">
              {creator.tiktokScore ? `${creator.tiktokScore}` : ""}
            </p>
          ) : (
            <p className="shrink-0 text-right">
              <span className="block text-[10px] tracking-wide text-background/70 uppercase">{t(locale, "fromPrice")}</span>
              <span className="font-mono text-sm font-semibold">{formatEtb(from)}</span>
            </p>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <ul className="flex items-center gap-1">
          {creator.socials.map((social) => (
            <li key={`${social.platform}-${social.handle}`}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="flex size-7 items-center justify-center rounded-full bg-secondary text-foreground"
                title={`@${social.handle}`}
              >
                <span className="sr-only">
                  @{social.handle} on {social.platform}
                </span>
                <SocialGlyph platform={social.platform} />
              </a>
            </li>
          ))}
        </ul>
        {isPlaceholderPage(creator) ? (
          <p className="text-xs text-muted-foreground">
            {t(locale, "placeholderCard")}
          </p>
        ) : (
          <PackageList packages={creator.packages} variant="compact" />
        )}
        <div className="mt-auto flex flex-col gap-2">
          {isPageClaimable(creator) ? <ClaimPageButton creatorId={creator.id} /> : null}
          <Link
            href={`/c/${creator.id}`}
            className="inline-flex h-8 items-center justify-center rounded-lg bg-secondary text-sm font-medium transition-colors hover:bg-secondary/80"
          >
            {t(locale, "viewPage")}
          </Link>
        </div>
      </div>
    </article>
  );
}
