"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { claimPage, useCreator } from "@/lib/claim-store";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { useSession } from "@/lib/session-store";
import { claimPath, hasRole, isPageClaimable } from "@/packages/contracts";

export function ClaimPageButton({
  creatorId,
  className,
}: {
  creatorId: string;
  className?: string;
}) {
  const creator = useCreator(creatorId);
  const session = useSession();
  const locale = useLocale();
  const router = useRouter();

  if (!creator) return null;
  if (creator.claimStatus === "claimed") {
    return <p className="text-sm text-muted-foreground">{t(locale, "claimed")}</p>;
  }
  if (creator.claimStatus === "claim_pending") {
    return (
      <p className="text-sm text-muted-foreground">
        {t(locale, "claimReviewLong")}
      </p>
    );
  }
  if (!isPageClaimable(creator)) return null;

  const page = creator;
  const isCreator = session ? hasRole(session, "creator") : false;

  function handleClaim() {
    if (!session) {
      router.push(claimPath(page));
      return;
    }
    claimPage(page.id, session.profileId, session.displayName);
  }

  if (!isCreator) {
    return (
      <Button className={className} render={<Link href={claimPath(creator)} />}>
        {t(locale, "claimCta")}
      </Button>
    );
  }

  return (
    <Button className={className} onClick={handleClaim}>
      {t(locale, "claimHandle", {
        handle: creator.socials.find((social) => social.handle)?.handle ?? "this handle",
      })}
    </Button>
  );
}
