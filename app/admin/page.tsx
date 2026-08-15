"use client";

import { Building2, Shield, Tags, Users } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
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
      <PageHeader
        title={isAdmin ? "Admin" : "Payout desk"}
        support="Same login as the marketplace. This workspace is assigned — not a public join."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {isAdmin ? (
          <>
            <StatCard
              href="/admin/creators"
              label="Creators pending"
              value={creators.filter((row) => row.status === "pending_review").length}
              icon={Users}
              tone="brand"
            />
            <StatCard
              href="/admin/advertisers"
              label="Advertisers pending"
              value={advertisers.filter((row) => row.status === "pending_activation").length}
              icon={Building2}
              tone="forest"
            />
            <StatCard
              href="/admin/kyc"
              label="KYC submitted"
              value={kyc.filter((row) => row.status === "submitted").length}
              icon={Shield}
              tone="orange"
            />
            <StatCard href="/admin/pages" label="Page claims" value={pendingClaims} icon={Users} tone="muted" />
            <StatCard
              href="/admin/categories"
              label="Categories"
              value={categories.length}
              icon={Tags}
              tone="muted"
            />
          </>
        ) : null}
        {session && hasCapability(session, "payout.view_balances") ? (
          <StatCard
            href="/admin/balances"
            label="Reserved across wallets"
            value={formatEtb({ amount: reserved.toFixed(2), currency: "ETB" })}
            icon={Shield}
            tone="orange"
          />
        ) : null}
      </div>
    </div>
  );
}
