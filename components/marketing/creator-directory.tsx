"use client";

import { Search } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { CreatorGridSkeleton } from "@/components/brand/page-loader";
import { Reveal } from "@/components/motion/reveal";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { FAVIKON_ET_TIKTOK_2026, type Creator } from "@/packages/contracts";

import { CreatorCard } from "./creator-card";

type CreatorDirectoryProps = {
  creators: Creator[];
  query: string;
  loading?: boolean;
};

export function CreatorDirectory({ creators, query, loading = false }: CreatorDirectoryProps) {
  const locale = useLocale();
  const source = (
    <a
      href={FAVIKON_ET_TIKTOK_2026.sourceUrl}
      className="underline underline-offset-4"
      target="_blank"
      rel="noreferrer"
    >
      {FAVIKON_ET_TIKTOK_2026.sourceLabel}
    </a>
  );
  const [sourceBefore, sourceAfter] = t(locale, "directorySource", { source: "__SOURCE__" }).split("__SOURCE__");

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <Reveal className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">
          {t(locale, "directoryKicker", { count: creators.length })}
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          {t(locale, "directoryTitle")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {sourceBefore}
          {source}
          {sourceAfter}
        </p>
      </Reveal>
      {loading ? (
        <CreatorGridSkeleton />
      ) : creators.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <Search className="size-6 text-muted-foreground" aria-hidden />
            <EmptyTitle>{t(locale, "emptyTitle")}</EmptyTitle>
            <EmptyDescription>
              {query
                ? t(locale, "emptyQuery", { query: query.replace(/^@+/, "") })
                : t(locale, "emptyFilters")}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {creators.map((creator, index) => (
            <li key={creator.id}>
              <Reveal delay={Math.min(index, 8) * 55} className="h-full">
                <CreatorCard creator={creator} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
