"use client";

import { QueueTable } from "@/components/admin/queue-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatEtb } from "@/lib/format";
import { useAdminState } from "@/lib/admin-store";

export default function AdminBalancesPage() {
  const { balances } = useAdminState();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Advertiser balances</h1>
        <p className="text-sm text-muted-foreground">
          Payout Agent can view what an advertiser owes. They cannot release creator funds.
        </p>
      </div>
      <QueueTable
        columns={["Advertiser", "Available", "Reserved"]}
        rows={balances.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell className="font-mono">{formatEtb(row.available)}</TableCell>
            <TableCell className="font-mono">{formatEtb(row.reserved)}</TableCell>
          </TableRow>
        ))}
      />
    </div>
  );
}
