"use client";

import { FormEvent, useState } from "react";

import { CreatePanel, FieldRow } from "@/components/dashboard/create-panel";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <PageHeader
        title="Signup criteria"
        support="Changing the number does not un-approve existing creators."
      />
      <form onSubmit={handleSubmit}>
        <CreatePanel
          kicker="Gate"
          title="Minimum followers"
          support="One social must meet this floor before a creator can go live."
          footer={
            <Button type="submit" disabled={!canEdit} className="ml-auto">
              Save gate
            </Button>
          }
        >
          <FieldRow label="Minimum followers on one social" htmlFor="min-followers">
            <Input
              id="min-followers"
              type="number"
              min={0}
              value={amount}
              disabled={!canEdit}
              onChange={(event) => setAmount(event.target.value)}
            />
          </FieldRow>
        </CreatePanel>
      </form>
    </div>
  );
}
