import { homePath, type Role, type Session, type SocialAuthKind } from "@/packages/contracts";

import { authClient } from "@/lib/convex/auth-client";

async function readSession(): Promise<Session> {
  const ensure = await fetch("/api/session", { method: "POST" });
  if (!ensure.ok) {
    throw new Error("Could not create a workspace profile.");
  }
  const session = (await ensure.json()) as Session | null;
  if (!session) {
    throw new Error("Signed in, but this account has no roles yet. Join as a creator or advertiser.");
  }
  return session;
}

export async function convexSignIn(email: string, password: string): Promise<Session> {
  const result = await authClient.signIn.email({ email, password });
  if (result.error) {
    throw new Error(result.error.message || "Email or password is wrong.");
  }
  return readSession();
}

export async function convexSignInSocial(provider: SocialAuthKind): Promise<Session> {
  if (provider === "google" || provider === "facebook" || provider === "tiktok") {
    const result = await authClient.signIn.social({
      provider,
      callbackURL: "/login",
    });
    if (result.error) {
      throw new Error(result.error.message || "That social login is not configured yet.");
    }
    return readSession();
  }
  throw new Error("That sign-in is not on Convex yet. Use Gmail or TikTok, or stay on the mock provider.");
}

export async function convexRegister(input: {
  email: string;
  password: string;
  displayName: string;
  roles: Role[];
}): Promise<Session> {
  const result = await authClient.signUp.email({
    email: input.email,
    password: input.password,
    name: input.displayName,
  });
  if (result.error) {
    throw new Error(result.error.message || "Could not register.");
  }
  const ensure = await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roles: input.roles }),
  });
  if (!ensure.ok) {
    throw new Error("Could not create a workspace profile.");
  }
  return (await ensure.json()) as Session;
}

export async function convexSignOut(): Promise<void> {
  await authClient.signOut();
}

export { homePath };
