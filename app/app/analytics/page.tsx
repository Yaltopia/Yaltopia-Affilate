import { AnalyticsAside } from "@/components/dashboard/analytics-aside";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEtb } from "@/lib/format";
import { mockBriefs } from "@/lib/mocks/briefs";

export default function AnalyticsPage() {
  const spend = mockBriefs.reduce((sum, brief) => sum + Number(brief.briefFee.amount), 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Mock ledger until Firebase is connected.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardDescription>Brief spend (all statuses)</CardDescription>
            <CardTitle className="font-heading text-3xl">
              {formatEtb({ amount: spend.toFixed(2), currency: "ETB" })}
            </CardTitle>
          </CardHeader>
        </Card>
        <AnalyticsAside />
      </div>
    </div>
  );
}
