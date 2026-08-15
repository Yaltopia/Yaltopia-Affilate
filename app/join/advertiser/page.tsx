import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BOOK_A_CALL_URL } from "@/lib/site";

export default function JoinAdvertiserPage() {
  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col gap-6 px-6 py-20">
      <p className="text-sm font-medium text-muted-foreground">Advertiser</p>
      <h1 className="font-heading text-4xl font-bold tracking-tight">
        List an offer. Brief a creator.
      </h1>
      <p className="text-muted-foreground">
        Advertiser accounts, payment requests, and briefs ship in the next pass. The
        marketplace rules are already in the spec.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button render={<Link href="/app" />}>Open dashboard</Button>
        <Button variant="outline" render={<a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer" />}>
          Book a call
        </Button>
      </div>
    </main>
  );
}
