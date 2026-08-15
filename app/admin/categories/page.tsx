"use client";

import { FormEvent, useState } from "react";

import { QueueTable } from "@/components/admin/queue-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-sm text-muted-foreground">
          These show in the public filter, creator profiles, and advertiser posts. Creators pick from this list.
        </p>
      </div>

      <form
        onSubmit={handleAdd}
        className="grid gap-3 rounded-2xl bg-card p-4 ring-1 ring-foreground/8 md:grid-cols-2"
      >
        <p className="font-heading text-lg font-semibold md:col-span-2">Add a category</p>
        <div className="flex flex-col gap-1">
          <Label htmlFor="cat-name">Name (English)</Label>
          <Input
            id="cat-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Travel"
            disabled={!canEdit}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="cat-name-am">Name (Amharic)</Label>
          <Input
            id="cat-name-am"
            value={nameAm}
            onChange={(event) => setNameAm(event.target.value)}
            placeholder="ጉዞ"
            disabled={!canEdit}
          />
        </div>
        {error ? <p className="text-sm text-destructive md:col-span-2">{error}</p> : null}
        <div className="md:col-span-2">
          <Button type="submit" disabled={!canEdit}>
            Add category
          </Button>
        </div>
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
