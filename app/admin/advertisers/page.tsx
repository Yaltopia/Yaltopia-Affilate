"use client";

import { QueueTable } from "@/components/admin/queue-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { setAdvertiserStatus, useAdminState } from "@/lib/admin-store";
import { useSession } from "@/lib/session-store";
import { hasCapability } from "@/packages/contracts";

export default function AdminAdvertisersPage() {
  const session = useSession();
  const { advertisers } = useAdminState();
  const canActivate = session ? hasCapability(session, "admin.activate_advertisers") : false;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Advertisers</h1>
        <p className="text-sm text-muted-foreground">
          Activate after KYC. Payout Agent can view balances, not this queue.
        </p>
      </div>
      <QueueTable
        columns={["Seller", "Website", "Status", "Actions"]}
        rows={advertisers.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <p className="font-medium">{row.name}</p>
              <p className="text-xs text-muted-foreground">{row.city}</p>
            </TableCell>
            <TableCell className="max-w-[16rem] truncate">{row.website}</TableCell>
            <TableCell>
              <Badge variant="secondary">{row.status.replaceAll("_", " ")}</Badge>
            </TableCell>
            <TableCell>
              {canActivate && row.status === "pending_activation" ? (
                <Button
                  size="sm"
                  onClick={() => setAdvertiserStatus(row.id, "active", session?.profileId ?? "")}
                >
                  Activate
                </Button>
              ) : canActivate && row.status === "active" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAdvertiserStatus(row.id, "suspended", session?.profileId ?? "")}
                >
                  Suspend
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
