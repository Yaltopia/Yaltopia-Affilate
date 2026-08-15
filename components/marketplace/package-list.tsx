import Link from "next/link";

import { PLATFORM_LABELS, SocialGlyph } from "@/components/marketing/social-icons";
import { Button } from "@/components/ui/button";
import { formatEtb } from "@/lib/format";
import type { CreatorPackage } from "@/packages/contracts";

function lowestAmount(packages: CreatorPackage[]): string {
  return packages.reduce(
    (lowest, pkg) => (Number(pkg.price.amount) < Number(lowest) ? pkg.price.amount : lowest),
    packages[0].price.amount,
  );
}

export function PackageList({
  packages,
  variant = "board",
  requestHref,
}: {
  packages: CreatorPackage[];
  variant?: "compact" | "board" | "request";
  requestHref?: string;
}) {
  if (packages.length === 0) {
    return <p className="text-sm text-muted-foreground">No packages yet.</p>;
  }

  const fromAmount = lowestAmount(packages);

  if (variant === "compact") {
    return (
      <ul className="flex flex-col">
        {packages.slice(0, 3).map((pkg) => (
          <li
            key={pkg.id}
            className="flex items-baseline justify-between gap-3 border-b border-foreground/6 py-1.5 text-sm last:border-b-0"
          >
            <span className="truncate text-muted-foreground">{pkg.title}</span>
            <span className="shrink-0 font-mono text-xs font-medium">{formatEtb(pkg.price)}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {packages.map((pkg) => {
        const isFrom = pkg.price.amount === fromAmount;
        return (
          <li
            key={pkg.id}
            className="flex items-center gap-3 rounded-xl bg-background px-3 py-2.5 ring-1 ring-foreground/8"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <SocialGlyph platform={pkg.platform} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{pkg.title}</p>
              <p className="text-xs text-muted-foreground">
                {PLATFORM_LABELS[pkg.platform]} · {pkg.deliverable.replaceAll("_", " ")}
                {isFrom ? " · from" : ""}
              </p>
            </div>
            <p className="shrink-0 font-mono text-sm font-semibold">{formatEtb(pkg.price)}</p>
            {variant === "request" && requestHref ? (
              <Button size="sm" render={<Link href={requestHref} />}>
                Request
              </Button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
