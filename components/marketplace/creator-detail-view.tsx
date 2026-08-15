"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { PLATFORM_LABELS, SocialGlyph } from "@/components/marketing/social-icons";
import { CampaignReel } from "@/components/marketplace/campaign-reel";
import { ClaimPageButton } from "@/components/marketplace/claim-page-button";
import { PackageList } from "@/components/marketplace/package-list";
import { PageLoader } from "@/components/brand/page-loader";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/category-store";
import { useCreator } from "@/lib/claim-store";
import { formatEtb, formatFollowers } from "@/lib/format";
import { nicheLabel } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { getCreator } from "@/lib/mocks/creators";
import {
  FAVIKON_ET_TIKTOK_2026,
  isPlaceholderPage,
  maxFollowers,
  primarySocial,
  startingPackagePrice,
} from "@/packages/contracts";

export function CreatorDetailView({ id }: { id: string }) {
  const locale = useLocale();
  const categories = useCategories();
  const live = useCreator(id);
  const creator = live ?? getCreator(id);

  if (!creator) {
    return <PageLoader label="Opening page" />;
  }

  const followers = maxFollowers(creator);
  const from = startingPackagePrice(creator);
  const page = primarySocial(creator);

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-3 py-5 md:px-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-start">
      <Reveal className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-2xl bg-secondary">
          {creator.photoUrl ? (
            <Image
              src={creator.photoUrl}
              alt={creator.displayName}
              width={1200}
              height={900}
              className="aspect-4/3 w-full object-cover lg:aspect-4/5"
              priority
            />
          ) : (
            <div className="flex aspect-4/3 w-full items-center justify-center font-heading text-6xl font-bold lg:aspect-4/5">
              {creator.displayName.slice(0, 1)}
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-background">
            <div>
              <p className="flex items-center gap-1.5 font-heading text-3xl font-bold tracking-tight">
                {creator.displayName}
                {creator.status === "approved" && !isPlaceholderPage(creator) ? (
                  <BadgeCheck className="size-5 text-primary" aria-label="Approved creator" />
                ) : null}
              </p>
              <p className="text-sm text-background/80">
                {page ? `@${page.handle}` : creator.city} · {creator.city} ·{" "}
                {followers > 0 ? formatFollowers(followers) : "Handle claimable"}
              </p>
            </div>
            <p className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              {creator.rank ? `#${creator.rank} · ` : ""}
              {nicheLabel(locale, creator.niche, categories)}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">{creator.bio}</p>
        {isPlaceholderPage(creator) ? (
          <p className="rounded-xl bg-card px-3 py-2 text-sm ring-1 ring-foreground/8">
            {creator.source === "admin" ? (
              "Admin added this page. The creator can claim the handle."
            ) : (
              <>
                Placeholder from{" "}
                <a
                  href={creator.sourceUrl ?? FAVIKON_ET_TIKTOK_2026.sourceUrl}
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Favikon
                </a>
                . Claim it if this is your page.
                {creator.tiktokScore ? ` TikTok score ${creator.tiktokScore}/100.` : ""}
              </>
            )}
          </p>
        ) : null}
        <ul className="grid gap-2 sm:grid-cols-2">
          {creator.socials
            .filter((social) => social.handle.trim())
            .sort((left, right) => right.followerCount - left.followerCount)
            .map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-card px-3 py-2.5 text-sm ring-1 ring-foreground/8"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <SocialGlyph platform={social.platform} />
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">
                        {PLATFORM_LABELS[social.platform]}
                      </span>
                      <span className="truncate font-medium">@{social.handle}</span>
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-xs">
                    {social.followerCount > 0 ? formatFollowers(social.followerCount) : "Claimable"}
                  </span>
                </a>
              </li>
            ))}
        </ul>
        {page ? (
          <Button variant="outline" render={<a href={page.url} target="_blank" rel="noreferrer" />}>
            Open {PLATFORM_LABELS[page.platform]} page
          </Button>
        ) : null}
        <CampaignReel campaigns={creator.campaigns} demo={isPlaceholderPage(creator)} />
      </section>
      </Reveal>

      <Reveal delay={80} className="lg:sticky lg:top-4">
      <aside className="flex flex-col gap-4 rounded-2xl bg-card p-3 ring-1 ring-foreground/8">
        {isPlaceholderPage(creator) ? (
          <>
            <div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {creator.claimStatus === "claim_pending" ? "Claim in review" : "Unclaimed page"}
              </p>
              <h2 className="font-heading text-2xl font-bold tracking-tight">Claim this handle</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Only the creator can claim @{page?.handle}. Admin can also assign the page.
              Packages stay empty until the page is claimed.
            </p>
            <ClaimPageButton creatorId={creator.id} className="w-full" />
          </>
        ) : (
          <>
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs tracking-wide text-muted-foreground uppercase">This creator</p>
                <h2 className="font-heading text-2xl font-bold tracking-tight">Packages</h2>
              </div>
              <p className="text-right">
                <span className="block text-[10px] tracking-wide text-muted-foreground uppercase">From</span>
                <span className="font-mono text-lg font-semibold">{formatEtb(from)}</span>
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Register as an advertiser to request a package. KYC is after you have an
              account — not on this page.
            </p>
            <PackageList
              packages={creator.packages}
              variant="request"
              requestHref="/join/advertiser"
            />
            <Button className="w-full" render={<Link href="/join/advertiser" />}>
              Register to request
            </Button>
          </>
        )}
        <Button variant="outline" className="w-full" render={<Link href="/#creators" />}>
          Back to creators
        </Button>
      </aside>
      </Reveal>
    </main>
  );
}
