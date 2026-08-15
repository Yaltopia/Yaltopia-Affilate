"use client";

import { QueueTable } from "@/components/admin/queue-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { setCreatorStatus, useAdminState } from "@/lib/admin-store";
import { formatFollowers } from "@/lib/format";
import { useSession } from "@/lib/session-store";
import { hasCapability } from "@/packages/contracts";

export default function AdminCreatorsPage() {
  const session = useSession();
  const { creators } = useAdminState();
  const canApprove = session ? hasCapability(session, "admin.approve_creators") : false;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Creator queue</h1>
        <p className="text-sm text-muted-foreground">
          Approve after KYC and the follower gate. Payout Agent cannot do this.
        </p>
      </div>
      <QueueTable
        columns={["Creator", "Niche", "Followers", "Status", "Actions"]}
        rows={creators.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <p className="font-medium">{row.displayName}</p>
              <p className="text-xs text-muted-foreground">{row.city}</p>
            </TableCell>
            <TableCell>{row.niche}</TableCell>
            <TableCell className="font-mono">{formatFollowers(row.followers)}</TableCell>
            <TableCell>
              <Badge variant="secondary">{row.status.replaceAll("_", " ")}</Badge>
            </TableCell>
            <TableCell>
              {canApprove && row.status === "pending_review" ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setCreatorStatus(row.id, "approved", session?.profileId ?? "")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCreatorStatus(row.id, "rejected", session?.profileId ?? "")}
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
