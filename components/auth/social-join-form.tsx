"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSteps } from "@/components/auth/auth-steps";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { LegalAgree } from "@/components/legal/legal-agree";
import { SOCIAL_AUTH_LABELS, SocialGlyph } from "@/components/marketing/social-icons";
import { Button } from "@/components/ui/button";
import { claimPage } from "@/lib/claim-store";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { registerWithSocial } from "@/lib/session-store";
import { cn } from "@/lib/utils";
import {
  REQUIRED_SOCIAL_PLATFORMS,
  canAccessPath,
  homePath,
  type Role,
  type SocialAuthKind,
  type SocialPlatform,
} from "@/packages/contracts";

export function SocialJoinForm({
  role,
  claimId,
  listedName,
}: {
  role: Extract<Role, "creator" | "advertiser">;
  claimId?: string;
  listedName?: string;
}) {
  const router = useRouter();
  const search = useSearchParams();
  const locale = useLocale();
  const [step, setStep] = useState(0);
  const [provider, setProvider] = useState<SocialAuthKind | null>(null);
  const [granted, setGranted] = useState<SocialPlatform[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const socialsOk = REQUIRED_SOCIAL_PLATFORMS.every((platform) => granted.includes(platform));

  function toggle(platform: SocialPlatform) {
    setGranted((prev) =>
      prev.includes(platform) ? prev.filter((item) => item !== platform) : [...prev, platform],
    );
  }

  async function finish() {
    if (!provider || !socialsOk) return;
    setBusy(true);
    setError("");
    try {
      const session = await registerWithSocial({
        provider,
        displayName: listedName || (role === "creator" ? "New creator" : "New advertiser"),
        roles: [role],
      });
      if (claimId) claimPage(claimId, session.profileId, session.displayName);
      const next = search.get("next");
      const dest = next && canAccessPath(session, next) ? next : homePath(session);
      router.replace(dest);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not register.");
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthSteps
        steps={[t(locale, "stepAccount"), t(locale, "stepSocials")]}
        current={step}
        onBack={setStep}
      />
      {step === 0 ? (
        <>
          <SocialLoginButtons
            busy={busy}
            busyProvider={null}
            onPick={(next) => {
              setProvider(next);
              setStep(1);
            }}
          />
          <LegalAgree />
          <p className="text-center text-sm text-muted-foreground">
            {t(locale, "haveAccount")}{" "}
            <Link href="/login" className="font-semibold text-foreground underline-offset-4 hover:underline">
              {t(locale, "signIn")}
            </Link>
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">{t(locale, "grantSocialHint")}</p>
          <ul className="flex flex-col gap-2">
            {REQUIRED_SOCIAL_PLATFORMS.map((platform) => {
              const on = granted.includes(platform);
              return (
                <li key={platform}>
                  <button
                    type="button"
                    onClick={() => toggle(platform)}
                    className={cn(
                      "flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm font-medium ring-1",
                      on
                        ? "bg-foreground text-background ring-foreground"
                        : "bg-card text-foreground ring-foreground/15",
                    )}
                  >
                    <SocialGlyph platform={platform} className="size-4" />
                    {on
                      ? t(locale, "socialConnected", { provider: SOCIAL_AUTH_LABELS[platform] })
                      : t(locale, "connectSocial", { provider: SOCIAL_AUTH_LABELS[platform] })}
                  </button>
                </li>
              );
            })}
          </ul>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="h-11" onClick={() => setStep(0)}>
              {t(locale, "backStep")}
            </Button>
            <Button type="button" className="h-11 flex-1" disabled={busy || !socialsOk} onClick={() => void finish()}>
              {busy ? t(locale, "signingIn") : t(locale, "enterWorkspace")}
            </Button>
          </div>
          <LegalAgree />
        </div>
      )}
      <p className="text-center">
        <Link href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
          {t(locale, "backToSite")}
        </Link>
      </p>
    </div>
  );
}
