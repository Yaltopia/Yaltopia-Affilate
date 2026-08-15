"use client";

import Link from "next/link";

import { ClaimPageButton } from "@/components/marketplace/claim-page-button";
import { Badge } from "@/components/ui/badge";
import { useCreators } from "@/lib/claim-store";
import { useSession } from "@/lib/session-store";
import { primarySocial } from "@/packages/contracts";

export default function StudioClaimPage() {
  const session = useSession();
  const pages = useCreators();
  const mine = pages.filter((page) => page.claimedByProfileId === session?.profileId);
  const open = pages.filter((page) => page.claimStatus === "unclaimed");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Claim a page</h1>
        <p className="text-sm text-muted-foreground">
          Listed handles are placeholders. Claim yours. Admin can also assign a page to you.
        </p>
      </div>

      {mine.length > 0 ? (
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-semibold">Your pages</h2>
          <ul className="flex flex-col gap-2">
            {mine.map((page) => (
              <li
                key={page.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-card px-3 py-2.5 ring-1 ring-foreground/8"
              >
                <div>
                  <p className="font-medium">{page.displayName}</p>
                  <p className="text-xs text-muted-foreground">
                    @{primarySocial(page)?.handle} · {page.claimStatus.replaceAll("_", " ")}
                  </p>
                </div>
                <Badge variant="secondary">{page.claimStatus.replaceAll("_", " ")}</Badge>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">Unclaimed pages</h2>
        <ul className="flex flex-col gap-2">
          {open.map((page) => (
            <li
              key={page.id}
              className="flex flex-col gap-2 rounded-xl bg-card px-3 py-2.5 ring-1 ring-foreground/8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <Link href={`/c/${page.id}`} className="font-medium underline-offset-4 hover:underline">
                  {page.displayName}
                </Link>
                <p className="text-xs text-muted-foreground">
                  @{primarySocial(page)?.handle} · {page.niche}
                  {page.rank ? ` · #${page.rank}` : ""}
                </p>
              </div>
              <ClaimPageButton creatorId={page.id} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
