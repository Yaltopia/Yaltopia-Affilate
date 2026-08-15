import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BOOK_A_CALL_URL, GITHUB_URL, SPEC_URL, YALTOPIA_TECH_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto flex flex-col gap-6 px-4 py-10 md:px-10">
      <Separator />
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>
            Yaltopia Affiliate by Prime Store. Built by{" "}
            <a href={YALTOPIA_TECH_URL} className="text-foreground underline underline-offset-4">
              Yaltopia Tech
            </a>
            .
          </p>
          <p>© 2026 Yaltopia Tech.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <a href={SPEC_URL} className="hover:text-foreground">
              Spec
            </a>
            <a href={GITHUB_URL} className="hover:text-foreground">
              GitHub
            </a>
            <Link href="/join/advertiser" className="hover:text-foreground">
              Advertisers
            </Link>
            <Link href="/join/creator" className="hover:text-foreground">
              Creators
            </Link>
          </nav>
          <Button size="sm" render={<a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer" />}>
            Book a call
          </Button>
        </div>
      </div>
    </footer>
  );
}
