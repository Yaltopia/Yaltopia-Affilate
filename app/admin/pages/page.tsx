"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { QueueTable } from "@/components/admin/queue-table";
import { CategorySelect } from "@/components/marketplace/category-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TableCell, TableRow } from "@/components/ui/table";
import { addUser, useAdminState } from "@/lib/admin-store";
import {
  addCreatorPage,
  assignPage,
  confirmClaim,
  rejectClaim,
  useCreators,
} from "@/lib/claim-store";
import { useSession } from "@/lib/session-store";
import { hasCapability, primarySocial } from "@/packages/contracts";

export default function AdminPagesPage() {
  const session = useSession();
  const pages = useCreators();
  const { users } = useAdminState();
  const canManage = session ? hasCapability(session, "admin.manage_pages") : false;
  const actor = session?.profileId ?? "";
  const creators = users.filter((user) => user.roles.includes("creator"));

  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [niche, setNiche] = useState("");
  const [city, setCity] = useState("Addis Ababa");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [assignNow, setAssignNow] = useState(true);
  const [error, setError] = useState("");

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canManage || !session) return;
    if (!name.trim() || !handle.trim()) {
      setError("Name and TikTok handle are required.");
      return;
    }
    setError("");
    let assignTo: { profileId: string; displayName: string } | undefined;
    if (email.trim()) {
      const existing = users.find((user) => user.email === email.trim().toLowerCase());
      const person =
        existing ??
        addUser(
          { email: email.trim(), displayName: name.trim(), roles: ["creator"] },
          actor,
        );
      if (assignNow) {
        assignTo = { profileId: person.profileId, displayName: person.displayName };
      }
    }
    addCreatorPage(
      {
        displayName: name.trim(),
        handle,
        niche,
        city,
        bio,
        assignTo,
      },
      actor,
    );
    setName("");
    setHandle("");
    setNiche("");
    setBio("");
    setEmail("");
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Pages & people</h1>
        <p className="text-sm text-muted-foreground">
          Confirm creator claims, assign a page, or add a person from Admin.
        </p>
      </div>

      <form
        onSubmit={handleAdd}
        className="grid gap-3 rounded-2xl bg-card p-4 ring-1 ring-foreground/8 md:grid-cols-2"
      >
        <p className="font-heading text-lg font-semibold md:col-span-2">Add a person</p>
        <div className="flex flex-col gap-1">
          <Label htmlFor="add-name">Display name</Label>
          <Input id="add-name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="add-handle">TikTok handle</Label>
          <Input
            id="add-handle"
            value={handle}
            onChange={(event) => setHandle(event.target.value)}
            placeholder="without @"
          />
        </div>
        <CategorySelect
          id="add-niche"
          label="Category"
          value={niche}
          onChange={setNiche}
          required
        />
        <div className="flex flex-col gap-1">
          <Label htmlFor="add-city">City</Label>
          <Input id="add-city" value={city} onChange={(event) => setCity(event.target.value)} />
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <Label htmlFor="add-bio">Bio</Label>
          <Textarea id="add-bio" value={bio} onChange={(event) => setBio(event.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="add-email">Email (optional — creates a creator login)</Label>
          <Input
            id="add-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="creator@brand.et"
          />
        </div>
        <label className="flex items-center gap-2 self-end text-sm">
          <input
            type="checkbox"
            checked={assignNow}
            onChange={(event) => setAssignNow(event.target.checked)}
          />
          Assign the page to them now
        </label>
        {error ? <p className="text-sm text-destructive md:col-span-2">{error}</p> : null}
        <div className="md:col-span-2">
          <Button type="submit" disabled={!canManage}>
            Add person
          </Button>
        </div>
      </form>

      <QueueTable
        columns={["Page", "Handle", "Claim", "Owner", "Actions"]}
        rows={pages.map((row) => {
          const handle = primarySocial(row)?.handle ?? "—";
          return (
            <TableRow key={row.id}>
              <TableCell>
                <Link href={`/c/${row.id}`} className="font-medium underline-offset-4 hover:underline">
                  {row.displayName}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {row.rank ? `#${row.rank} · ` : ""}
                  {row.niche}
                </p>
              </TableCell>
              <TableCell className="font-mono text-xs">@{handle}</TableCell>
              <TableCell>
                <Badge variant="secondary">{row.claimStatus.replaceAll("_", " ")}</Badge>
              </TableCell>
              <TableCell className="text-xs">
                {row.claimedByName ?? row.claimedByProfileId ?? "—"}
              </TableCell>
              <TableCell>
                {canManage ? (
                  <div className="flex flex-wrap gap-2">
                    {row.claimStatus === "claim_pending" ? (
                      <>
                        <Button size="sm" onClick={() => confirmClaim(row.id, actor)}>
                          Confirm claim
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => rejectClaim(row.id, actor)}>
                          Reject
                        </Button>
                      </>
                    ) : null}
                    {row.claimStatus === "unclaimed" && creators.length > 0 ? (
                      <select
                        className="h-7 rounded-md border bg-background px-2 text-xs"
                        defaultValue=""
                        onChange={(event) => {
                          const person = creators.find((user) => user.profileId === event.target.value);
                          if (!person) return;
                          assignPage(
                            row.id,
                            { profileId: person.profileId, displayName: person.displayName },
                            actor,
                          );
                        }}
                      >
                        <option value="" disabled>
                          Assign to…
                        </option>
                        {creators.map((user) => (
                          <option key={user.profileId} value={user.profileId}>
                            {user.displayName}
                          </option>
                        ))}
                      </select>
                    ) : null}
                    {row.claimStatus === "claimed" ? (
                      <span className="text-xs text-muted-foreground">Assigned</span>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">No action</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      />
    </div>
  );
}
