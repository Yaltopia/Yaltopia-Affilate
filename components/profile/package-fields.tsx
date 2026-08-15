"use client";

import { PLATFORM_LABELS, SocialGlyph } from "@/components/marketing/social-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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
    <div className="flex flex-col gap-3">
      {packages.length === 0 ? (
        <p className="rounded-md bg-secondary/50 px-4 py-8 text-center text-sm text-muted-foreground">
          No packages yet. Add one sellable deliverable advertisers can brief against.
        </p>
      ) : null}
      {packages.map((pkg, index) => (
        <div
          key={pkg.id}
          className="grid gap-3 rounded-md bg-card p-4 ring-1 ring-foreground/10 sm:grid-cols-2"
        >
          <p className="sm:col-span-2 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Package {String(index + 1).padStart(2, "0")}
          </p>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${pkg.id}-title`}>Title</Label>
            <Input
              id={`${pkg.id}-title`}
              value={pkg.title}
              placeholder="TikTok video"
              onChange={(event) => update(pkg.id, { title: event.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
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
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label>Platform</Label>
            <div className="flex flex-wrap gap-1.5">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => update(pkg.id, { platform })}
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium ring-1",
                    pkg.platform === platform
                      ? "bg-foreground text-background ring-foreground"
                      : "bg-background text-foreground ring-foreground/15",
                  )}
                >
                  <SocialGlyph platform={platform} className="size-3.5" />
                  {PLATFORM_LABELS[platform]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor={`${pkg.id}-deliverable`}>Deliverable</Label>
            <Input
              id={`${pkg.id}-deliverable`}
              value={pkg.deliverable}
              placeholder="video_post"
              onChange={(event) => update(pkg.id, { deliverable: event.target.value })}
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
    </div>
  );
}
