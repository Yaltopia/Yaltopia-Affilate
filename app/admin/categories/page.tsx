"use client";

import { FormEvent, useState } from "react";

import { QueueTable } from "@/components/admin/queue-table";
import { CreatePanel, FieldRow } from "@/components/dashboard/create-panel";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { addCategory, useCategories } from "@/lib/category-store";
import { useSession } from "@/lib/session-store";
import { hasCapability } from "@/packages/contracts";

export default function AdminCategoriesPage() {
  const session = useSession();
  const categories = useCategories();
  const canEdit = session ? hasCapability(session, "admin.edit_settings") : false;
  const [name, setName] = useState("");
  const [nameAm, setNameAm] = useState("");
  const [error, setError] = useState("");

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canEdit || !session) return;
    try {
      addCategory({ name, nameAm }, session.profileId);
      setName("");
      setNameAm("");
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add category.");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Categories"
        support="These show in the public filter, creator profiles, and advertiser posts. Creators pick from this list."
      />

      <form onSubmit={handleAdd} className="max-w-3xl">
        <CreatePanel
          kicker="Catalog"
          title="Add a category"
          support="English name plus Amharic. Slug is generated."
          footer={
            <>
              {error ? <p className="text-sm text-destructive">{error}</p> : <span />}
              <Button type="submit" disabled={!canEdit}>
                Add category
              </Button>
            </>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FieldRow label="Name (English)" htmlFor="cat-name">
              <Input
                id="cat-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Travel"
                disabled={!canEdit}
              />
            </FieldRow>
            <FieldRow label="Name (Amharic)" htmlFor="cat-name-am">
              <Input
                id="cat-name-am"
                value={nameAm}
                onChange={(event) => setNameAm(event.target.value)}
                placeholder="ጉዞ"
                disabled={!canEdit}
              />
            </FieldRow>
          </div>
        </CreatePanel>
      </form>

      <QueueTable
        columns={["Category", "Amharic", "Slug"]}
        rows={categories.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>{row.nameAm}</TableCell>
            <TableCell className="font-mono text-xs">{row.slug}</TableCell>
          </TableRow>
        ))}
      />
    </div>
  );
}
