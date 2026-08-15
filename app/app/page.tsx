"use client";

import { Briefcase, ListChecks, Users, Wallet } from "lucide-react";

import { BriefsTable } from "@/components/dashboard/briefs-table";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatEtb } from "@/lib/format";
import { useCreators } from "@/lib/claim-store";
import { mockWallet } from "@/lib/mocks/briefs";
import { mockPosts } from "@/lib/mocks/criteria";
import { useOrderState } from "@/lib/order-store";

export default function OverviewPage() {
  const { briefs } = useOrderState();
  const posts = mockPosts;
  const creators = useCreators();
  const livePosts = posts.filter((post) => post.status === "live").length;
  const openBriefs = briefs.filter((brief) =>
    ["accepted", "funded", "sample_review", "posted", "release_requested"].includes(brief.status),
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Advertiser workspace"
        support="Finish the seller profile, post an order, then brief a creator. Deposit after agree."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Open briefs"
          value={openBriefs}
          hint="Awaiting work or release"
          icon={Briefcase}
          tone="brand"
          href="/app/briefs"
        />
        <StatCard
          label="Live orders"
          value={livePosts}
          hint="Public board"
          icon={ListChecks}
          tone="forest"
          href="/app/posts"
        />
        <StatCard
          label="Creators listed"
          value={creators.length}
          hint="Marketplace pages"
          icon={Users}
          tone="muted"
          href="/app/creators"
        />
        <StatCard
          label="Available"
          value={formatEtb(mockWallet.available)}
          hint={`Reserved ${formatEtb(mockWallet.reserved)}`}
          icon={Wallet}
          tone="orange"
          href="/app/wallet"
        />
      </div>
      <BriefsTable />
    </div>
  );
}
