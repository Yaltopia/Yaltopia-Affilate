"use client";

import { useSyncExternalStore } from "react";

import { audit } from "@/lib/log";
import { mockCreators } from "@/lib/mocks/creators";
import {
  DEFAULT_MIN_FOLLOWERS,
  REQUIRED_SOCIAL_PLATFORMS,
  type Creator,
  type PageClaimStatus,
  type SocialPlatform,
} from "@/packages/contracts";

type ClaimRecord = {
  claimStatus: PageClaimStatus;
  claimedByProfileId?: string;
  claimedByName?: string;
};

type PersistShape = {
  claims: Record<string, ClaimRecord>;
  extras: Creator[];
};

const KEY = "ya.page-claims";
const listeners = new Set<() => void>();

let claims: Record<string, ClaimRecord> = {
  "c-yuti": {
    claimStatus: "claim_pending",
    claimedByProfileId: "u-creator",
    claimedByName: "Yuti Nass",
  },
};
let extras: Creator[] = [];
let snapshot: Creator[] = mockCreators;
let hydrated = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function socialUrl(platform: SocialPlatform, handle: string): string {
  if (platform === "tiktok") return `https://www.tiktok.com/@${handle}`;
  if (platform === "instagram") return `https://www.instagram.com/${handle}`;
  if (platform === "youtube") return `https://www.youtube.com/@${handle}`;
  if (platform === "telegram") return `https://t.me/${handle}`;
  if (platform === "facebook") return `https://www.facebook.com/${handle}`;
  return `https://www.tiktok.com/@${handle}`;
}

function rebuild() {
  snapshot = [...mockCreators, ...extras].map((creator) => {
    const row = claims[creator.id];
    const next = row ? { ...creator, ...row } : creator;
    return { ...next, campaigns: next.campaigns ?? [], packages: next.packages ?? [] };
  });
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistShape;
      claims = parsed.claims ?? claims;
      extras = parsed.extras ?? [];
    }
  } catch {
    extras = [];
  }
  rebuild();
}

function persist() {
  localStorage.setItem(KEY, JSON.stringify({ claims, extras } satisfies PersistShape));
  rebuild();
  emit();
}

export function subscribeClaims(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCreatorsSnapshot(): Creator[] {
  hydrate();
  return snapshot;
}

export function useCreators(): Creator[] {
  return useSyncExternalStore(subscribeClaims, getCreatorsSnapshot, () => mockCreators);
}

export function useCreator(id: string): Creator | undefined {
  return useCreators().find((creator) => creator.id === id);
}

export function claimPage(creatorId: string, profileId: string, displayName?: string) {
  hydrate();
  const page = snapshot.find((creator) => creator.id === creatorId);
  if (!page || page.claimStatus !== "unclaimed") return;
  claims = {
    ...claims,
    [creatorId]: {
      claimStatus: "claim_pending",
      claimedByProfileId: profileId,
      claimedByName: displayName,
    },
  };
  persist();
  audit({ action: "creator.claim_page", actor_id: profileId, target: creatorId });
}

export function confirmClaim(creatorId: string, actorId: string) {
  hydrate();
  const current = claims[creatorId];
  if (!current || current.claimStatus !== "claim_pending") return;
  claims = { ...claims, [creatorId]: { ...current, claimStatus: "claimed" } };
  persist();
  audit({ action: "admin.confirm_claim", actor_id: actorId, target: creatorId });
}

export function rejectClaim(creatorId: string, actorId: string) {
  hydrate();
  const next = { ...claims };
  delete next[creatorId];
  claims = next;
  persist();
  audit({ action: "admin.reject_claim", actor_id: actorId, target: creatorId });
}

export function assignPage(
  creatorId: string,
  input: { profileId: string; displayName: string },
  actorId: string,
) {
  hydrate();
  claims = {
    ...claims,
    [creatorId]: {
      claimStatus: "claimed",
      claimedByProfileId: input.profileId,
      claimedByName: input.displayName,
    },
  };
  persist();
  audit({ action: "admin.assign_page", actor_id: actorId, target: creatorId });
}

export function addCreatorPage(
  input: {
    displayName: string;
    handle: string;
    niche: string;
    city: string;
    bio: string;
    assignTo?: { profileId: string; displayName: string };
  },
  actorId: string,
): Creator {
  hydrate();
  const handle = input.handle.trim().replace(/^@+/, "").toLowerCase();
  const id = `c-${handle || crypto.randomUUID().slice(0, 8)}`;
  const page: Creator = {
    id,
    displayName: input.displayName.trim(),
    bio: input.bio.trim() || `${input.displayName.trim()} — added by Admin.`,
    city: input.city.trim() || "Ethiopia",
    country: "ET",
    niche: input.niche.trim() || "Lifestyle",
    status: input.assignTo ? "approved" : "pending_review",
    photoUrl: "",
    socials: REQUIRED_SOCIAL_PLATFORMS.map((platform) =>
      platform === "tiktok"
        ? {
            platform,
            handle,
            url: socialUrl(platform, handle),
            followerCount: 0,
          }
        : { platform, handle: "", url: "", followerCount: 0 },
    ),
    packages: [],
    campaigns: [],
    briefFee: { amount: "0.00", currency: "ETB" },
    maxFollowersDeclared: 0,
    minFollowersRequired: DEFAULT_MIN_FOLLOWERS.amount,
    claimStatus: input.assignTo ? "claimed" : "unclaimed",
    source: "admin",
    claimedByProfileId: input.assignTo?.profileId,
  };
  extras = [...extras, page];
  if (input.assignTo) {
    claims = {
      ...claims,
      [id]: {
        claimStatus: "claimed",
        claimedByProfileId: input.assignTo.profileId,
        claimedByName: input.assignTo.displayName,
      },
    };
  }
  persist();
  audit({ action: "admin.add_person", actor_id: actorId, target: id });
  return page;
}
