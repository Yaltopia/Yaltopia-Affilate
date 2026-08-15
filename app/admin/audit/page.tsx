"use client";

import { QueueTable } from "@/components/admin/queue-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAdminState } from "@/lib/admin-store";

export default function AdminAuditPage() {
  const { audit } = useAdminState();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Audit</h1>
        <p className="text-sm text-muted-foreground">
          Approvals, role changes, and payment requests. No secrets or KYC file paths.
        </p>
      </div>
      <QueueTable
        columns={["When", "Action", "Actor", "Target"]}
        rows={audit.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-mono text-xs">{row.createdAt}</TableCell>
            <TableCell>{row.action}</TableCell>
            <TableCell className="font-mono text-xs">{row.actor_id}</TableCell>
            <TableCell className="font-mono text-xs">{row.target ?? "—"}</TableCell>
          </TableRow>
        ))}
      />
    </div>
  );
}
