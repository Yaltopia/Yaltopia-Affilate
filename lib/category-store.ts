"use client";

import { useSyncExternalStore } from "react";

import { audit } from "@/lib/log";
import {
  DEFAULT_CATEGORIES,
  categorySlug,
  findCategory,
  type MarketplaceCategory,
} from "@/packages/contracts";

const KEY = "ya.categories";
const listeners = new Set<() => void>();

let extras: MarketplaceCategory[] = [];
let snapshot: MarketplaceCategory[] = DEFAULT_CATEGORIES;
let hydrated = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function rebuild() {
  snapshot = [...DEFAULT_CATEGORIES, ...extras];
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      extras = (JSON.parse(raw) as MarketplaceCategory[]).filter(
        (row) => row?.slug && !DEFAULT_CATEGORIES.some((seed) => seed.slug === row.slug),
      );
    }
  } catch {
    extras = [];
  }
  rebuild();
}

function persist() {
  localStorage.setItem(KEY, JSON.stringify(extras));
  rebuild();
  emit();
}

export function subscribeCategories(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCategoriesSnapshot(): MarketplaceCategory[] {
  hydrate();
  return snapshot;
}

export function useCategories(): MarketplaceCategory[] {
  return useSyncExternalStore(subscribeCategories, getCategoriesSnapshot, () => DEFAULT_CATEGORIES);
}

export function addCategory(
  input: { name: string; nameAm?: string },
  actorId: string,
): MarketplaceCategory {
  hydrate();
  const name = input.name.trim();
  const slug = categorySlug(name);
  if (!name || !slug) {
    throw new Error("Category name is required.");
  }
  if (findCategory(snapshot, name)) {
    throw new Error("That category already exists.");
  }
  const category: MarketplaceCategory = {
    id: `cat-${slug}`,
    slug,
    name,
    nameAm: input.nameAm?.trim() || name,
    active: true,
  };
  extras = [...extras, category];
  persist();
  audit({ action: "admin.add_category", actor_id: actorId, target: category.id });
  return category;
}
