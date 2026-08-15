import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BOOK_A_CALL_URL } from "@/lib/site";

export default function JoinCreatorPage() {
  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col gap-6 px-6 py-20">
      <p className="text-sm font-medium text-muted-foreground">Creator</p>
      <h1 className="font-heading text-4xl font-bold tracking-tight">
        1,000 followers on one social. Then Admin reviews.
      </h1>
      <p className="text-muted-foreground">
        Creator signup is not live yet. When it is, you will link a social, meet the
        current follower gate, and wait for Admin to confirm you are a real creator.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button render={<Link href="/" />}>Back to creators</Button>
        <Button variant="outline" render={<a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer" />}>
          Book a call
        </Button>
      </div>
    </main>
  );
}
