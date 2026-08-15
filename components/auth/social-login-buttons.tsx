"use client";

import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";

import { SOCIAL_AUTH_LABELS, SocialGlyph } from "@/components/marketing/social-icons";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { cn } from "@/lib/utils";
import { LOGIN_MORE, LOGIN_PRIMARY, type SocialAuthKind } from "@/packages/contracts";

function LoginTile({
  provider,
  busy,
  busyProvider,
  onPick,
}: {
  provider: SocialAuthKind;
  busy: boolean;
  busyProvider: SocialAuthKind | null;
  onPick: (provider: SocialAuthKind) => void;
}) {
  const spinning = busyProvider === provider;
  return (
    <Button
      type="button"
      variant="outline"
      className="h-12 w-full flex-col gap-1.5"
      disabled={busy}
      onClick={() => onPick(provider)}
    >
      {spinning ? (
        <Loader2 className="size-4 animate-spin" aria-hidden />
      ) : (
        <SocialGlyph platform={provider} className="size-4" />
      )}
      <span className="text-xs font-medium">{SOCIAL_AUTH_LABELS[provider]}</span>
    </Button>
  );
}

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
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        {LOGIN_PRIMARY.map((provider) => (
          <LoginTile
            key={provider}
            provider={provider}
            busy={busy}
            busyProvider={busyProvider}
            onPick={onPick}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {t(locale, "moreSignIn")}
          <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
        {open ? (
          <div className="mt-2 flex flex-col gap-1.5">
            {LOGIN_MORE.map((provider) => (
              <Button
                key={provider}
                type="button"
                variant="ghost"
                className="h-10 w-full justify-start gap-3 text-muted-foreground"
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
        ) : null}
      </div>
    </div>
  );
}
