"use client";

import { QueueTable } from "@/components/admin/queue-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { assignRole, useAdminState } from "@/lib/admin-store";
import { useSession } from "@/lib/session-store";
import { hasCapability, roleLabel } from "@/packages/contracts";

export default function AdminUsersPage() {
  const session = useSession();
  const { users } = useAdminState();
  const canAssign = session ? hasCapability(session, "admin.assign_roles") : false;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">
          Admin and Payout Agent are assigned here. They are not a public join path.
        </p>
      </div>
      <QueueTable
        columns={["Person", "Email", "Roles", "Actions"]}
        rows={users.map((row) => (
          <TableRow key={row.profileId}>
            <TableCell className="font-medium">{row.displayName}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {row.roles.map((role) => (
                  <Badge key={role} variant="secondary">
                    {roleLabel(role)}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {canAssign && !row.roles.includes("payout_agent") && !row.roles.includes("admin") ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => assignRole(row.profileId, "payout_agent", session?.profileId ?? "")}
                >
                  Make payout agent
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">Assigned</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      />
    </div>
  );
}
