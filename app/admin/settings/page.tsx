"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setMinFollowers, useAdminState } from "@/lib/admin-store";
import { useSession } from "@/lib/session-store";
import { hasCapability } from "@/packages/contracts";

export default function AdminSettingsPage() {
  const session = useSession();
  const { minFollowers } = useAdminState();
  const [amount, setAmount] = useState(String(minFollowers));
  const canEdit = session ? hasCapability(session, "admin.edit_settings") : false;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canEdit || !session) return;
    const next = Number(amount);
    if (!Number.isFinite(next) || next < 0) return;
    setMinFollowers(next, session.profileId);
  }

  return (
    <div className="flex max-w-lg flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Signup criteria</h1>
        <p className="text-sm text-muted-foreground">
          Changing the number does not un-approve existing creators.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-2xl bg-card p-4 ring-1 ring-foreground/8">
        <div className="flex flex-col gap-1">
          <Label htmlFor="min-followers">Minimum followers on one social</Label>
          <Input
            id="min-followers"
            type="number"
            min={0}
            value={amount}
            disabled={!canEdit}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
        <Button type="submit" disabled={!canEdit}>
          Save gate
        </Button>
      </form>
    </div>
  );
}
