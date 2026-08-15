"use client";

import { useEffect, useSyncExternalStore } from "react";

import type { Locale } from "@/packages/contracts";

const KEY = "ya.locale";
const listeners = new Set<() => void>();

let locale: Locale = "en";
let hydrated = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const stored = localStorage.getItem(KEY);
  if (stored === "am" || stored === "en") locale = stored;
}

export function subscribeLocale(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLocaleSnapshot(): Locale {
  hydrate();
  return locale;
}

export function useLocale(): Locale {
  const value = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, (): Locale => "en");
  useEffect(() => {
    document.documentElement.lang = value;
  }, [value]);
  return value;
}

export function setLocale(next: Locale) {
  hydrate();
  locale = next;
  localStorage.setItem(KEY, next);
  document.documentElement.lang = next;
  emit();
}
