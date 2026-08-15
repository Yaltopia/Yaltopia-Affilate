import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatFollowers } from "@/lib/format";
import { mockCreators } from "@/lib/mocks/creators";
import { maxFollowers } from "@/packages/contracts";

export default function CreatorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Creators</h1>
          <p className="text-sm text-muted-foreground">Approved marketplace. Open a profile to brief.</p>
        </div>
        <Button size="sm" render={<Link href="/#creators" />}>
          Browse public grid
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {mockCreators.map((creator) => (
          <li
            key={creator.id}
            className="flex items-center justify-between gap-4 rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/8"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Avatar>
                <AvatarImage src={creator.photoUrl} alt="" />
                <AvatarFallback>{creator.displayName.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium">{creator.displayName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  @{creator.socials[0]?.handle} · {formatFollowers(maxFollowers(creator))}
                </p>
              </div>
            </div>
            <Badge variant="secondary">{creator.niche}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
