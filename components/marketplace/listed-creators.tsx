"use client";

import { useMemo } from "react";

import { CreatorDirectory } from "@/components/marketing/creator-directory";
import { useCreators } from "@/lib/claim-store";
import { mockMinFollowers } from "@/lib/mocks/creators";
import {
  isPlaceholderPage,
  matchesHandle,
  maxFollowers,
  meetsFollowerGate,
  startingPackagePrice,
  type SocialPlatform,
} from "@/packages/contracts";

export function ListedCreators({
  query,
  selectedNiches,
  selectedPlatforms,
  followers,
  price,
  loading,
}: {
  query: string;
  selectedNiches: string[];
  selectedPlatforms: SocialPlatform[];
  followers: [number, number];
  price: [number, number];
  loading?: boolean;
}) {
  const all = useCreators();
  const creators = useMemo(() => {
    return all.filter((creator) => {
      const placeholder = isPlaceholderPage(creator);
      if (!placeholder && creator.status !== "approved") return false;
      if (!placeholder && !meetsFollowerGate(creator, mockMinFollowers)) return false;
      if (!matchesHandle(creator, query) && !creator.displayName.toLowerCase().includes(query.toLowerCase().replace(/^@+/, ""))) {
        return false;
      }
      if (selectedNiches.length > 0 && !selectedNiches.includes(creator.niche)) {
        return false;
      }
      if (
        selectedPlatforms.length > 0 &&
        !creator.socials.some(
          (social) => selectedPlatforms.includes(social.platform) && social.handle.trim(),
        )
      ) {
        return false;
      }
      if (!placeholder) {
        const count = maxFollowers(creator);
        if (count < followers[0] || count > followers[1]) return false;
        const fee = Number(startingPackagePrice(creator).amount);
        if (fee < price[0] || fee > price[1]) return false;
      }
      return true;
    });
  }, [all, followers, price, query, selectedNiches, selectedPlatforms]);

  return <CreatorDirectory creators={creators} query={query} loading={loading} />;
}
