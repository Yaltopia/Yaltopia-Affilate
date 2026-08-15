"use client";

import { QueueTable } from "@/components/admin/queue-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { setKycStatus, useAdminState } from "@/lib/admin-store";
import { useSession } from "@/lib/session-store";
import { hasCapability } from "@/packages/contracts";

export default function AdminKycPage() {
  const session = useSession();
  const { kyc } = useAdminState();
  const canReview = session ? hasCapability(session, "admin.review_kyc") : false;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">KYC review</h1>
        <p className="text-sm text-muted-foreground">
          Files stay in private storage. Payout Agent cannot review KYC.
        </p>
      </div>
      <QueueTable
        columns={["Name", "Role", "Status", "Actions"]}
        rows={kyc.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>
              <Badge variant="secondary">{row.status}</Badge>
            </TableCell>
            <TableCell>
              {canReview && row.status === "submitted" ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setKycStatus(row.id, "approved", session?.profileId ?? "")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setKycStatus(row.id, "rejected", session?.profileId ?? "")}
                  >
                    Reject
                  </Button>
                </div>
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
