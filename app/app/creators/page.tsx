import Image from "next/image";
import Link from "next/link";

import { PackageList } from "@/components/marketplace/package-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatEtb, formatFollowers } from "@/lib/format";
import { mockCreators } from "@/lib/mocks/creators";
import { maxFollowers, primarySocial, startingPackagePrice } from "@/packages/contracts";

export default function CreatorsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Creators</h1>
          <p className="text-sm text-muted-foreground">
            Favikon placeholder pages. Creators claim their own handle before you brief.
          </p>
        </div>
        <Button size="sm" render={<Link href="/#creators" />}>
          Browse public grid
        </Button>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {mockCreators.map((creator) => (
          <li
            key={creator.id}
            className="flex gap-3 overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8"
          >
            <Image
              src={creator.photoUrl}
              alt=""
              width={160}
              height={200}
              className="h-full w-24 shrink-0 object-cover sm:w-28"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-2 py-2.5 pr-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-heading font-semibold">{creator.displayName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    @{primarySocial(creator)?.handle ?? creator.id} ·{" "}
                    {formatFollowers(maxFollowers(creator))}
                  </p>
                </div>
                <Badge variant="secondary">{creator.niche}</Badge>
              </div>
              <PackageList packages={creator.packages} variant="compact" />
              {creator.campaigns[0] ? (
                <p className="text-xs text-muted-foreground">
                  {creator.campaigns[0].brand} · {formatEtb(creator.campaigns[0].charged)} ·{" "}
                  {formatFollowers(creator.campaigns[0].views)} views
                </p>
              ) : null}
              <div className="mt-auto flex items-center justify-between gap-2">
                <p className="font-mono text-xs font-medium">
                  From {formatEtb(startingPackagePrice(creator))}
                </p>
                <Button size="sm" render={<Link href={`/c/${creator.id}`} />}>
                  View page
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
