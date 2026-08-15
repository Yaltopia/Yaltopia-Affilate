"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_PASSWORD, accountLabel, demoAccounts, demoRoleHint } from "@/lib/mocks/accounts";
import { signIn } from "@/lib/session-store";
import { canAccessPath, homePath } from "@/packages/contracts";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function go(nextEmail: string, nextPassword: string) {
    setBusy(true);
    setError("");
    try {
      const session = await signIn(nextEmail, nextPassword);
      const next = search.get("next");
      const dest = next && canAccessPath(session, next) ? next : homePath(session);
      router.replace(dest);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
      setBusy(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void go(email, password);
  }

  return (
    <main className="ya-enter mx-auto flex min-h-full w-full max-w-lg flex-col gap-8 px-3 py-10 md:px-4">
      <BrandLockup />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Same login for every role</p>
        <h1 className="font-heading text-4xl font-bold tracking-tight">Log in to your workspace</h1>
        <p className="text-muted-foreground">
          Creators, advertisers, and Admin use this page. The account decides what you see.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl bg-card p-4 ring-1 ring-foreground/8">
        <div className="flex flex-col gap-1">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" disabled={busy || !email.trim() || password.length < 8}>
          {busy ? "Signing in…" : "Log in"}
        </Button>
      </form>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          Mock accounts (password <span className="font-mono">{DEMO_PASSWORD}</span>). Admin is assigned — not a public join.
        </p>
        <ul className="flex flex-col gap-2">
          {demoAccounts.map((account) => (
            <li key={account.email}>
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                  void go(account.email, account.password);
                }}
                className="flex w-full flex-col items-start gap-0.5 rounded-xl bg-card px-3 py-2.5 text-left ring-1 ring-foreground/8 hover:ring-foreground/20"
              >
                <span className="text-sm font-medium">
                  {accountLabel(account.session.roles)} · {account.email}
                </span>
                <span className="text-xs text-muted-foreground">{demoRoleHint[account.email]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" render={<Link href="/join/creator" />}>
          Join as creator
        </Button>
        <Button variant="outline" render={<Link href="/join/advertiser" />}>
          Join as advertiser
        </Button>
        <Button variant="ghost" render={<Link href="/" />}>
          Back to site
        </Button>
      </div>
    </main>
  );
}
