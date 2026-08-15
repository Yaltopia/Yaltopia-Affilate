"use client";

import { QueueTable } from "@/components/admin/queue-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatEtb } from "@/lib/format";
import { requestPayment, useAdminState } from "@/lib/admin-store";
import { useSession } from "@/lib/session-store";
import { hasCapability } from "@/packages/contracts";

export default function AdminPaymentsPage() {
  const session = useSession();
  const { payments } = useAdminState();
  const canRequest = session ? hasCapability(session, "payout.request_payment") : false;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Payment requests</h1>
        <p className="text-sm text-muted-foreground">
          Ask the advertiser to pay. This is not a creator payout release.
        </p>
      </div>
      <QueueTable
        columns={["Advertiser", "Amount", "Status", "Actions"]}
        rows={payments.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.advertiserName}</TableCell>
            <TableCell className="font-mono">{formatEtb(row.amount)}</TableCell>
            <TableCell>
              <Badge variant="secondary">{row.status}</Badge>
            </TableCell>
            <TableCell>
              {canRequest && row.status === "draft" ? (
                <Button
                  size="sm"
                  onClick={() => requestPayment(row.id, session?.profileId ?? "")}
                >
                  Request payment
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">No action</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      />
    </div>
  );
}
