import { QueueTable } from "@/components/admin/queue-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { mockBriefs } from "@/lib/mocks/briefs";

export default function StudioCodesPage() {
  const rows = mockBriefs.filter((brief) => brief.promoCode);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Codes & links</h1>
        <p className="text-sm text-muted-foreground">
          Minted when you accept a brief. If both exist, the promo code wins.
        </p>
      </div>
      <QueueTable
        columns={["Brief", "Promo code", "Tracking"]}
        rows={rows.map((brief) => (
          <TableRow key={brief.id}>
            <TableCell className="font-medium">{brief.offerTitle}</TableCell>
            <TableCell className="font-mono">{brief.promoCode}</TableCell>
            <TableCell className="font-mono text-xs">/r/{brief.promoCode?.toLowerCase()}</TableCell>
          </TableRow>
        ))}
      />
    </div>
  );
}
