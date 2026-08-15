"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { useSession } from "@/lib/session-store";
import { homePath } from "@/packages/contracts";

export function AuthCta({
  tone = "light",
}: {
  tone?: "dark" | "light";
}) {
  const session = useSession();
  const locale = useLocale();

  if (session) {
    return (
      <Button size="sm" render={<Link href={homePath(session)} />}>
        {t(locale, "workspace")}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        className={tone === "dark" ? "border-background/30 bg-background text-foreground" : undefined}
        render={<Link href="/login" />}
      >
        {t(locale, "logIn")}
      </Button>
      <Button size="sm" render={<Link href="/join/advertiser" />}>
        {t(locale, "joinAdvertiser")}
      </Button>
    </div>
  );
}
