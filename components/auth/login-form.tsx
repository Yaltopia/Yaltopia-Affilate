"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { DemoAccountPicker } from "@/components/auth/demo-account-picker";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { LegalAgree } from "@/components/legal/legal-agree";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import type { MockAccount } from "@/lib/mocks/accounts";
import { signIn, signInWithSocial } from "@/lib/session-store";
import { canAccessPath, homePath, type SocialAuthKind } from "@/packages/contracts";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const locale = useLocale();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [demoEmail, setDemoEmail] = useState<string | null>(null);
  const [providerBusy, setProviderBusy] = useState<SocialAuthKind | null>(null);

  async function land(session: Awaited<ReturnType<typeof signIn>>) {
    const next = search.get("next");
    const dest = next && canAccessPath(session, next) ? next : homePath(session);
    router.replace(dest);
    router.refresh();
  }

  async function goDemo(account: MockAccount) {
    setBusy(true);
    setDemoEmail(account.email);
    setError("");
    try {
      const session = await signIn(account.email, account.password);
      await land(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
      setBusy(false);
      setDemoEmail(null);
    }
  }

  async function goSocial(provider: SocialAuthKind) {
    setBusy(true);
    setProviderBusy(provider);
    setError("");
    try {
      const session = await signInWithSocial(provider);
      await land(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
      setBusy(false);
      setProviderBusy(null);
    }
  }

  return (
    <AuthShell panel="login">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">{t(locale, "welcomeBack")}</h1>
          <p className="text-sm text-muted-foreground">{t(locale, "loginSupport")}</p>
        </div>
        <SocialLoginButtons busy={busy} busyProvider={providerBusy} onPick={(provider) => void goSocial(provider)} />
        <LegalAgree />
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <DemoAccountPicker busy={busy} signingEmail={demoEmail} onPick={(account) => void goDemo(account)} />
        <p className="text-center text-sm text-muted-foreground">
          {t(locale, "noAccount")}{" "}
          <Link href="/join/creator" className="font-semibold text-foreground underline-offset-4 hover:underline">
            {t(locale, "creatorsJoin")}
          </Link>
          {" · "}
          <Link href="/join/advertiser" className="font-semibold text-foreground underline-offset-4 hover:underline">
            {t(locale, "joinAdvertiser")}
          </Link>
        </p>
        <p className="text-center">
          <Link href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            {t(locale, "backToSite")}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
