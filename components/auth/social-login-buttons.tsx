"use client";

import { Loader2 } from "lucide-react";

import { SOCIAL_AUTH_LABELS, SocialGlyph } from "@/components/marketing/social-icons";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import type { SocialAuthKind } from "@/packages/contracts";

const LOGIN_PROVIDERS: SocialAuthKind[] = [
  "google",
  "tiktok",
  "instagram",
  "youtube",
  "telegram",
  "facebook",
];

export function SocialLoginButtons({
  busy,
  busyProvider,
  onPick,
}: {
  busy: boolean;
  busyProvider: SocialAuthKind | null;
  onPick: (provider: SocialAuthKind) => void;
}) {
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-2">
      {LOGIN_PROVIDERS.map((provider) => (
        <Button
          key={provider}
          type="button"
          variant="outline"
          className="h-11 w-full justify-start gap-3"
          disabled={busy}
          onClick={() => onPick(provider)}
        >
          {busyProvider === provider ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <SocialGlyph platform={provider} className="size-4" />
          )}
          {t(locale, "continueWith", { provider: SOCIAL_AUTH_LABELS[provider] })}
        </Button>
      ))}
    </div>
  );
}
