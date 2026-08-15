"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreatorPackage, SocialPlatform } from "@/packages/contracts";

const platforms: SocialPlatform[] = [
  "tiktok",
  "instagram",
  "youtube",
  "telegram",
  "facebook",
];

type PackageFieldsProps = {
  packages: CreatorPackage[];
  onChange: (packages: CreatorPackage[]) => void;
};

export function PackageFields({ packages, onChange }: PackageFieldsProps) {
  function addPackage() {
    onChange([
      ...packages,
      {
        id: `pkg-${Date.now()}`,
        title: "",
        platform: "tiktok",
        deliverable: "video_post",
        price: { amount: "", currency: "ETB" },
      },
    ]);
  }

  function update(id: string, patch: Partial<CreatorPackage>) {
    onChange(packages.map((pkg) => (pkg.id === id ? { ...pkg, ...patch } : pkg)));
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium">Packages</legend>
      <p className="text-sm text-muted-foreground">
        Every creator lists sellable packages. Advertisers brief against these prices.
      </p>
      {packages.map((pkg, index) => (
        <div key={pkg.id} className="grid gap-2 rounded-xl bg-card p-2.5 ring-1 ring-foreground/10 sm:grid-cols-2">
          <p className="sm:col-span-2 text-sm font-medium">Package {index + 1}</p>
          <div className="flex flex-col gap-1">
            <Label htmlFor={`${pkg.id}-title`}>Title</Label>
            <Input
              id={`${pkg.id}-title`}
              value={pkg.title}
              placeholder="TikTok video"
              onChange={(event) => update(pkg.id, { title: event.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor={`${pkg.id}-platform`}>Platform</Label>
            <select
              id={`${pkg.id}-platform`}
              className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm"
              value={pkg.platform}
              onChange={(event) =>
                update(pkg.id, { platform: event.target.value as SocialPlatform })
              }
            >
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor={`${pkg.id}-deliverable`}>Deliverable</Label>
            <Input
              id={`${pkg.id}-deliverable`}
              value={pkg.deliverable}
              placeholder="video_post"
              onChange={(event) => update(pkg.id, { deliverable: event.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor={`${pkg.id}-price`}>Price (ETB)</Label>
            <Input
              id={`${pkg.id}-price`}
              inputMode="decimal"
              value={pkg.price.amount}
              placeholder="8500.00"
              onChange={(event) =>
                update(pkg.id, { price: { amount: event.target.value, currency: "ETB" } })
              }
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="sm:col-span-2 justify-start"
            onClick={() => onChange(packages.filter((item) => item.id !== pkg.id))}
          >
            Remove package
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addPackage}>
        Add package
      </Button>
    </fieldset>
  );
}
