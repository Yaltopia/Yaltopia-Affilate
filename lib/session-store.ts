"use client";

import { useSyncExternalStore } from "react";

import { audit } from "@/lib/log";
import { demoAccounts, type MockAccount } from "@/lib/mocks/accounts";
import {
  homePath,
  type AuthProvider,
  type Role,
  type Session,
} from "@/packages/contracts";

const SESSION_KEY = "ya.session";
const ACCOUNTS_KEY = "ya.accounts";
const COOKIE_SESSION = "ya_session";
const COOKIE_HOME = "ya_home";

const listeners = new Set<() => void>();

let session: Session | null = null;
let hydrated = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

function persistSession(next: Session | null) {
  session = next;
  if (next) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    writeCookie(COOKIE_SESSION, "1");
    writeCookie(COOKIE_HOME, homePath(next));
  } else {
    localStorage.removeItem(SESSION_KEY);
    clearCookie(COOKIE_SESSION);
    clearCookie(COOKIE_HOME);
  }
  emit();
}

function loadAccounts(): MockAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MockAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: MockAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function allAccounts(): MockAccount[] {
  const extra = loadAccounts();
  const extras = extra.filter(
    (account) => !demoAccounts.some((demo) => demo.email === account.email.toLowerCase()),
  );
  return [...demoAccounts, ...extras];
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      session = JSON.parse(raw) as Session;
      writeCookie(COOKIE_SESSION, "1");
      writeCookie(COOKIE_HOME, homePath(session));
    }
  } catch {
    session = null;
  }
}

export function getSessionSnapshot(): Session | null {
  hydrate();
  return session;
}

export function subscribeSession(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSession(): Session | null {
  return useSyncExternalStore(subscribeSession, getSessionSnapshot, () => null);
}

export function clearStaleAuthCookie() {
  if (typeof document === "undefined") return;
  if (getSessionSnapshot()) return;
  clearCookie(COOKIE_SESSION);
  clearCookie(COOKIE_HOME);
}

export async function signIn(email: string, password: string): Promise<Session> {
  hydrate();
  const normalized = email.trim().toLowerCase();
  const match = allAccounts().find(
    (account) => account.email.toLowerCase() === normalized && account.password === password,
  );
  if (!match) {
    audit({ action: "auth.sign_in_failed", meta: { reason: "invalid_credentials" }, level: "warn" });
    throw new Error("Email or password is wrong.");
  }
  persistSession(match.session);
  audit({
    action: "auth.sign_in",
    actor_id: match.session.profileId,
    meta: { roles: match.session.roles },
  });
  return match.session;
}

export async function registerAccount(input: {
  email: string;
  password: string;
  displayName: string;
  roles: Role[];
}): Promise<Session> {
  hydrate();
  const email = input.email.trim().toLowerCase();
  if (!email || input.password.length < 8) {
    throw new Error("Email and a password of 8 or more characters are required.");
  }
  if (allAccounts().some((account) => account.email.toLowerCase() === email)) {
    throw new Error("That email already has an account. Log in instead.");
  }
  const next: Session = {
    profileId: `u-${crypto.randomUUID()}`,
    displayName: input.displayName.trim() || email,
    locale: "en",
    roles: input.roles,
  };
  saveAccounts([...loadAccounts(), { email, password: input.password, session: next }]);
  persistSession(next);
  audit({
    action: "auth.register",
    actor_id: next.profileId,
    meta: { roles: next.roles },
  });
  return next;
}

export async function signOut(): Promise<void> {
  const actor = session?.profileId;
  persistSession(null);
  audit({ action: "auth.sign_out", actor_id: actor });
}

export const mockAuthProvider: AuthProvider = {
  getSession: async () => getSessionSnapshot(),
  signIn,
  signOut,
  register: registerAccount,
};
