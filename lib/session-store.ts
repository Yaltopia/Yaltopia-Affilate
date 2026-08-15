"use client";

import { useSyncExternalStore } from "react";

import { audit } from "@/lib/log";
import { DEMO_PASSWORD, demoAccounts, type MockAccount } from "@/lib/mocks/accounts";
import { isConvexLive } from "@/lib/convex/env";
import {
  homePath,
  type AuthProvider,
  type Role,
  type Session,
  type SocialAuthKind,
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

export function applyRemoteSession(next: Session | null) {
  persistSession(next);
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
  if (isConvexLive()) {
    const { convexSignIn } = await import("@/lib/convex/session");
    const next = await convexSignIn(email, password);
    persistSession(next);
    audit({
      action: "auth.sign_in",
      actor_id: next.profileId,
      meta: { roles: next.roles, provider: "convex" },
    });
    return next;
  }
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

const SOCIAL_LOGIN_DEFAULT: Record<SocialAuthKind, string> = {
  google: "advertiser@yaltopia.local",
  phone: "advertiser@yaltopia.local",
  telegram: "creator@yaltopia.local",
  tiktok: "creator@yaltopia.local",
  instagram: "creator@yaltopia.local",
  youtube: "creator@yaltopia.local",
  facebook: "creator@yaltopia.local",
};

export async function signInWithSocial(provider: SocialAuthKind): Promise<Session> {
  if (isConvexLive()) {
    const { convexSignInSocial } = await import("@/lib/convex/session");
    const next = await convexSignInSocial(provider);
    persistSession(next);
    audit({
      action: "auth.sign_in_social",
      actor_id: next.profileId,
      meta: { provider, roles: next.roles, backend: "convex" },
    });
    return next;
  }
  hydrate();
  const email = SOCIAL_LOGIN_DEFAULT[provider];
  const match = allAccounts().find((account) => account.email === email);
  if (!match) {
    audit({
      action: "auth.sign_in_failed",
      meta: { reason: "social_unmapped", provider },
      level: "warn",
    });
    throw new Error("That social login is not available in this demo.");
  }
  persistSession(match.session);
  audit({
    action: "auth.sign_in_social",
    actor_id: match.session.profileId,
    meta: { provider, roles: match.session.roles },
  });
  return match.session;
}

export async function registerAccount(input: {
  email: string;
  password: string;
  displayName: string;
  roles: Role[];
}): Promise<Session> {
  if (isConvexLive()) {
    const { convexRegister } = await import("@/lib/convex/session");
    const next = await convexRegister(input);
    persistSession(next);
    audit({
      action: "auth.register",
      actor_id: next.profileId,
      meta: { roles: next.roles, provider: "convex" },
    });
    return next;
  }
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

export async function registerWithSocial(input: {
  provider: SocialAuthKind;
  displayName: string;
  roles: Role[];
}): Promise<Session> {
  const suffix = crypto.randomUUID().slice(0, 8);
  const session = await registerAccount({
    email: `${input.provider}-${suffix}@yaltopia.local`,
    password: DEMO_PASSWORD,
    displayName: input.displayName.trim() || `${input.provider} account`,
    roles: input.roles,
  });
  audit({
    action: "auth.register_social",
    actor_id: session.profileId,
    meta: { provider: input.provider, roles: session.roles },
  });
  return session;
}

export async function signOut(): Promise<void> {
  if (isConvexLive()) {
    const { convexSignOut } = await import("@/lib/convex/session");
    await convexSignOut();
  }
  const actor = session?.profileId;
  persistSession(null);
  audit({ action: "auth.sign_out", actor_id: actor });
}

export const mockAuthProvider: AuthProvider = {
  getSession: async () => getSessionSnapshot(),
  signIn,
  signInWithSocial,
  signOut,
  register: registerAccount,
  registerWithSocial,
};
