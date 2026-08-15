"use client";

import { useMemo, useState } from "react";

import { mockCreators, mockMinFollowers } from "@/lib/mocks/creators";
import {
  matchesHandle,
  maxFollowers,
  meetsFollowerGate,
  type SocialPlatform,
} from "@/packages/contracts";

import { CreatorDirectory } from "./creator-directory";
import {
  FilterSidebar,
  FOLLOWER_BOUNDS,
  PRICE_BOUNDS,
} from "./filter-sidebar";
import { Hero } from "./hero";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomePage() {
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [followers, setFollowers] = useState<[number, number]>([
    FOLLOWER_BOUNDS.min,
    FOLLOWER_BOUNDS.max,
  ]);
  const [price, setPrice] = useState<[number, number]>([
    PRICE_BOUNDS.min,
    PRICE_BOUNDS.max,
  ]);

  const niches = useMemo(
    () => [...new Set(mockCreators.map((creator) => creator.niche))].sort(),
    [],
  );

  const creators = useMemo(() => {
    return mockCreators.filter((creator) => {
      if (creator.status !== "approved") return false;
      if (!meetsFollowerGate(creator, mockMinFollowers)) return false;
      if (!matchesHandle(creator, appliedQuery)) return false;
      if (selectedNiches.length > 0 && !selectedNiches.includes(creator.niche)) {
        return false;
      }
      if (
        selectedPlatforms.length > 0 &&
        !creator.socials.some((social) => selectedPlatforms.includes(social.platform))
      ) {
        return false;
      }
      const count = maxFollowers(creator);
      if (count < followers[0] || count > followers[1]) return false;
      const fee = Number(creator.briefFee.amount);
      if (fee < price[0] || fee > price[1]) return false;
      return true;
    });
  }, [appliedQuery, selectedNiches, selectedPlatforms, followers, price]);

  function runSearch() {
    setAppliedQuery(query);
    document.getElementById("creators")?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleNiche(niche: string) {
    setSelectedNiches((current) =>
      current.includes(niche)
        ? current.filter((item) => item !== niche)
        : [...current, niche],
    );
  }

  function togglePlatform(platform: SocialPlatform) {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform],
    );
  }

  function resetFilters() {
    setSelectedNiches([]);
    setSelectedPlatforms([]);
    setFollowers([FOLLOWER_BOUNDS.min, FOLLOWER_BOUNDS.max]);
    setPrice([PRICE_BOUNDS.min, PRICE_BOUNDS.max]);
    setAppliedQuery("");
    setQuery("");
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="bg-foreground">
        <SiteHeader />
        <Hero query={query} onQueryChange={setQuery} onSearch={runSearch} />
      </div>
      <section
        id="creators"
        className="-mt-4 flex flex-col gap-8 rounded-t-[2.5rem] bg-background px-4 py-12 md:px-10 md:py-16"
      >
        <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <FilterSidebar
            niches={niches}
            selectedNiches={selectedNiches}
            selectedPlatforms={selectedPlatforms}
            followers={followers}
            price={price}
            onToggleNiche={toggleNiche}
            onTogglePlatform={togglePlatform}
            onFollowers={setFollowers}
            onPrice={setPrice}
            onReset={resetFilters}
          />
          <CreatorDirectory creators={creators} query={appliedQuery} />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
