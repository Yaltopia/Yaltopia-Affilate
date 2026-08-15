"use client";

import { useEffect, useMemo, useState } from "react";

import { ListedCreators } from "@/components/marketplace/listed-creators";
import { ListedOrders } from "@/components/marketplace/listed-orders";
import { Reveal } from "@/components/motion/reveal";
import { useCategories } from "@/lib/category-store";
import { type SocialPlatform } from "@/packages/contracts";

import { BrowseModeSwitch, type BrowseMode } from "./browse-mode-switch";
import {
  FilterSidebar,
  FOLLOWER_BOUNDS,
  PRICE_BOUNDS,
} from "./filter-sidebar";
import { Hero } from "./hero";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

function modeFromHash(): BrowseMode {
  if (typeof window === "undefined") return "creators";
  return window.location.hash === "#orders" ? "orders" : "creators";
}

export function HomePage() {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<BrowseMode>("creators");
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

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    function applyHash() {
      setMode(modeFromHash());
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const categories = useCategories();
  const niches = useMemo(
    () => categories.filter((category) => category.active).map((category) => category.name),
    [categories],
  );

  function setBrowseMode(next: BrowseMode) {
    setMode(next);
    window.history.replaceState(null, "", next === "orders" ? "#orders" : "#creators");
  }

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
        <span id="orders" className="sr-only">
          Orders
        </span>
        <Reveal className="flex justify-center sm:justify-start">
          <BrowseModeSwitch mode={mode} onMode={setBrowseMode} />
        </Reveal>
        <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Reveal from="left" className="overflow-visible">
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
          </Reveal>
          {mode === "orders" ? (
            <ListedOrders
              query={appliedQuery}
              selectedNiches={selectedNiches}
              selectedPlatforms={selectedPlatforms}
              followers={followers}
              price={price}
            />
          ) : (
            <ListedCreators
              query={appliedQuery}
              selectedNiches={selectedNiches}
              selectedPlatforms={selectedPlatforms}
              followers={followers}
              price={price}
              loading={!ready}
            />
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
