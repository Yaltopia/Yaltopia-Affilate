"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { DropSelect } from "@/components/marketing/drop-select";
import { formatEtb, formatFollowers } from "@/lib/format";
import { platformLabel, t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { cn } from "@/lib/utils";
import type { CreatorCampaign } from "@/packages/contracts";

export function CampaignReel({
  campaigns,
  demo = false,
}: {
  campaigns: CreatorCampaign[];
  demo?: boolean;
}) {
  const locale = useLocale();
  const [selectedId, setSelectedId] = useState(campaigns[0]?.id ?? "");
  const selected = campaigns.find((campaign) => campaign.id === selectedId) ?? campaigns[0];

  if (!selected) {
    return <p className="text-sm text-muted-foreground">{t(locale, "noCampaigns")}</p>;
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">{t(locale, "pastCampaigns")}</p>
          <h2 className="font-heading text-2xl font-bold tracking-tight">{selected.brand}</h2>
        </div>
        {campaigns.length > 1 ? (
          <DropSelect
            className="w-full sm:w-72"
            align="end"
            summary={selected.brand}
            triggerLabel={t(locale, "pickCampaign")}
            placeholder={false}
          >
            {(close) => (
              <ul className="flex flex-col gap-0.5">
                {campaigns.map((campaign) => {
                  const active = campaign.id === selected.id;
                  return (
                    <li key={campaign.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          setSelectedId(campaign.id);
                          close();
                        }}
                        className={cn(
                          "flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm outline-none",
                          "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent",
                          active && "bg-accent/70",
                        )}
                      >
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center">
                          {active ? <Check className="size-3.5" aria-hidden /> : null}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium">{campaign.brand}</span>
                          <span className="block text-xs text-muted-foreground">
                            {formatEtb(campaign.charged)} · {formatFollowers(campaign.views)} {t(locale, "views")}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </DropSelect>
        ) : null}
      </div>
      {demo ? <p className="text-xs text-muted-foreground">{t(locale, "demoPortfolio")}</p> : null}
      <CampaignVideo campaign={selected} />
      <CampaignStats campaign={selected} />
      <p className="text-sm text-muted-foreground">
        {selected.title} · {platformLabel(locale, selected.platform)} · {selected.postedOn}
      </p>
    </section>
  );
}

export function CampaignTeaser({
  campaigns,
  demo = false,
}: {
  campaigns: CreatorCampaign[];
  demo?: boolean;
}) {
  const locale = useLocale();
  const featured = campaigns[0];
  if (!featured) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] tracking-wide text-muted-foreground uppercase">{t(locale, "pastCampaigns")}</p>
        <p className="text-[11px] text-muted-foreground">
          {t(locale, "campaignCount", { count: campaigns.length })}
        </p>
      </div>
      {demo ? <p className="text-[11px] text-muted-foreground">{t(locale, "demoPortfolio")}</p> : null}
      <CampaignVideo campaign={featured} compact />
      <p className="text-sm font-medium">{featured.brand}</p>
      <CampaignStats campaign={featured} compact />
    </div>
  );
}

function CampaignVideo({ campaign, compact = false }: { campaign: CreatorCampaign; compact?: boolean }) {
  const locale = useLocale();
  return (
    <div className="overflow-hidden rounded-xl bg-foreground ring-1 ring-foreground/10">
      <video
        key={campaign.id}
        controls
        playsInline
        preload={compact ? "none" : "metadata"}
        className={cn("w-full bg-foreground", compact ? "aspect-video max-h-40" : "aspect-video")}
        src={campaign.videoUrl}
      >
        <a href={campaign.videoUrl}>{t(locale, "watchVideo")}</a>
      </video>
    </div>
  );
}

function CampaignStats({ campaign, compact = false }: { campaign: CreatorCampaign; compact?: boolean }) {
  const locale = useLocale();
  const items = [
    { label: t(locale, "charged"), value: formatEtb(campaign.charged) },
    { label: t(locale, "views"), value: formatFollowers(campaign.views) },
    { label: t(locale, "likes"), value: formatFollowers(campaign.likes) },
    { label: t(locale, "comments"), value: formatFollowers(campaign.comments) },
  ];

  return (
    <div className={cn("grid gap-1.5", compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4")}>
      {items.map((item) => (
        <div key={item.label} className="rounded-xl bg-card px-2.5 py-1.5 ring-1 ring-foreground/8">
          <p className="text-[10px] tracking-wide text-muted-foreground uppercase">{item.label}</p>
          <p className="font-mono text-sm font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
