import { AnalyticsAside } from "@/components/dashboard/analytics-aside";
import { BriefsTable } from "@/components/dashboard/briefs-table";

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Manage briefs</h1>
        <p className="text-sm text-muted-foreground">
          Advertiser workspace. Search a creator @handle, then brief a video.
        </p>
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
        <BriefsTable />
        <AnalyticsAside />
      </div>
    </div>
  );
}
