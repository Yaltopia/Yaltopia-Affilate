import { QueueTable } from "@/components/admin/queue-table";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatEtb } from "@/lib/format";
import { mockBriefs } from "@/lib/mocks/briefs";

export default function StudioEarningsPage() {
  const rows = mockBriefs.filter(
    (brief) => brief.status === "completed" || brief.status === "release_requested",
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Earnings</h1>
        <p className="text-sm text-muted-foreground">
          Brief fees send only when views, likes, and comments meet the brief.
        </p>
      </div>
      <QueueTable
        columns={["Brief", "Type", "Amount", "Status"]}
        rows={rows.map((brief) => (
          <TableRow key={brief.id}>
            <TableCell className="font-medium">{brief.offerTitle}</TableCell>
            <TableCell>brief_fee</TableCell>
            <TableCell className="font-mono">{formatEtb(brief.briefFee)}</TableCell>
            <TableCell>
              <Badge variant="secondary">
                {brief.status === "completed" ? "approved" : "pending"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      />
    </div>
  );
}
