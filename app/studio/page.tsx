"use client";

import { Briefcase, Package, Wallet } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatEtb } from "@/lib/format";
import { useOrderState } from "@/lib/order-store";
import { getCreator } from "@/lib/mocks/creators";

export default function StudioOverviewPage() {
  const { briefs } = useOrderState();
  const creator = getCreator("c-yuti");
  const open = briefs.filter((brief) =>
    ["accepted", "funded", "sample_review", "posted", "release_requested"].includes(brief.status),
  ).length;
  const paid = briefs.filter((brief) => brief.status === "completed");
  const earned = paid.reduce((sum, brief) => sum + Number(brief.briefFee.amount), 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Creator studio"
        support="Overview of briefs, packages, and earnings. Create packages here — not on join."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Open briefs"
          value={open}
          hint="Funded, samples, posted, or release asked"
          icon={Briefcase}
          tone="brand"
          href="/studio/briefs"
        />
        <StatCard
          label="Packages"
          value={creator?.packages.length ?? 0}
          hint="Sellable deliverables"
          icon={Package}
          tone="forest"
          href="/studio/packages"
        />
        <StatCard
          label="Paid brief fees"
          value={formatEtb({ amount: earned.toFixed(2), currency: "ETB" })}
          hint={`${paid.length} completed`}
          icon={Wallet}
          tone="orange"
          href="/studio/earnings"
        />
      </div>
    </div>
  );
}
