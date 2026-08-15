"use client";

import { useState } from "react";

import { CreatePanel } from "@/components/dashboard/create-panel";
import { PageHeader } from "@/components/dashboard/page-header";
import { PackageFields } from "@/components/profile/package-fields";
import { Button } from "@/components/ui/button";
import { emptyCreator, getCreator } from "@/lib/mocks/creators";
import { isPricedMoney, type CreatorPackage } from "@/packages/contracts";

export default function StudioPackagesPage() {
  const creator = getCreator("c-yuti") ?? emptyCreator();
  const [packages, setPackages] = useState<CreatorPackage[]>(creator.packages);
  const [saved, setSaved] = useState(false);
  const ok =
    packages.length > 0 &&
    packages.every((pkg) => Boolean(pkg.title.trim() && pkg.deliverable.trim() && isPricedMoney(pkg.price)));

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6">
      <PageHeader
        title="Packages"
        support="Sellable deliverables advertisers brief against. Profile stays on its own page."
      />
      <CreatePanel
        kicker="Studio"
        title="List what you sell"
        support="Title, platform, deliverable, and a priced Money amount in ETB."
        footer={
          <>
            <p className="text-xs text-muted-foreground">
              {saved
                ? "Saved on this demo profile."
                : ok
                  ? "At least one complete package."
                  : "Add a title, deliverable, and price on every package."}
            </p>
            <Button type="button" disabled={!ok} onClick={() => setSaved(true)}>
              Save packages
            </Button>
          </>
        }
      >
        <PackageFields packages={packages} onChange={setPackages} />
      </CreatePanel>
    </div>
  );
}
