"use client";

import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminState } from "@/lib/admin-store";
import { useCategories } from "@/lib/category-store";
import { useCreators } from "@/lib/claim-store";
import { useSession } from "@/lib/session-store";
import { formatEtb } from "@/lib/format";
import { hasCapability, hasRole } from "@/packages/contracts";

export default function AdminOverviewPage() {
  const session = useSession();
  const { creators, advertisers, kyc, balances } = useAdminState();
  const pages = useCreators();
  const categories = useCategories();
  const pendingClaims = pages.filter((page) => page.claimStatus === "claim_pending").length;
  const reserved = balances.reduce((sum, row) => sum + Number(row.reserved.amount), 0);
  const isAdmin = session ? hasRole(session, "admin") : false;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          {isAdmin ? "Admin" : "Payout desk"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Same login as the marketplace. This workspace is assigned — not a public join.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {isAdmin ? (
          <>
            <Stat
              href="/admin/creators"
              label="Creators pending"
              value={String(creators.filter((row) => row.status === "pending_review").length)}
            />
            <Stat
              href="/admin/advertisers"
              label="Advertisers pending"
              value={String(advertisers.filter((row) => row.status === "pending_activation").length)}
            />
            <Stat
              href="/admin/kyc"
              label="KYC submitted"
              value={String(kyc.filter((row) => row.status === "submitted").length)}
            />
            <Stat href="/admin/pages" label="Page claims" value={String(pendingClaims)} />
            <Stat href="/admin/categories" label="Categories" value={String(categories.length)} />
          </>
        ) : null}
        {session && hasCapability(session, "payout.view_balances") ? (
          <Stat
            href="/admin/balances"
            label="Reserved across wallets"
            value={formatEtb({ amount: reserved.toFixed(2), currency: "ETB" })}
          />
        ) : null}
      </div>
    </div>
  );
}

function Stat({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <Link href={href}>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardDescription>{label}</CardDescription>
          <CardTitle className="font-heading text-3xl">{value}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
