"use client";

import { useState } from "react";

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
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <PageHeader
        title="Packages"
        support="Sellable packages advertisers brief against. Handle and profile stay on Profile."
      />
      <PackageFields packages={packages} onChange={setPackages} />
      <Button
        type="button"
        disabled={!ok}
        onClick={() => setSaved(true)}
      >
        Save packages
      </Button>
      {saved ? <p className="text-sm">Packages saved on this demo profile.</p> : null}
    </div>
  );
}
