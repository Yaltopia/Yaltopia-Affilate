import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatEtb, formatFollowers } from "@/lib/format";
import { maxFollowers, type Creator } from "@/packages/contracts";

import { SocialGlyph } from "./social-icons";

export function CreatorCard({ creator }: { creator: Creator }) {
  const followers = maxFollowers(creator);

  return (
    <Card className="h-full">
      <Image
        src={creator.photoUrl}
        alt=""
        width={640}
        height={520}
        className="aspect-4/3 w-full object-cover"
      />
      <CardHeader className="grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex items-center gap-1.5">
            {creator.displayName}
            {creator.status === "approved" ? (
              <BadgeCheck className="size-4 text-foreground" aria-label="Approved creator" />
            ) : null}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {creator.city}, Ethiopia
          </p>
        </div>
        <p className="font-mono text-xs font-medium">
          {formatFollowers(followers)} followers
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <ul className="flex items-center gap-1.5">
            {creator.socials.map((social) => (
              <li key={`${social.platform}-${social.handle}`}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-7 items-center justify-center rounded-full bg-secondary text-foreground"
                  title={`@${social.handle}`}
                >
                  <span className="sr-only">@{social.handle} on {social.platform}</span>
                  <SocialGlyph platform={social.platform} />
                </a>
              </li>
            ))}
          </ul>
          <Badge variant="secondary">{creator.niche}</Badge>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-muted-foreground">Brief price</p>
          <p className="font-mono text-xl font-semibold">{formatEtb(creator.briefFee)}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t-0 bg-transparent">
        <Button className="w-full" render={<Link href="/join/advertiser" />}>
          Request
        </Button>
      </CardFooter>
    </Card>
  );
}
