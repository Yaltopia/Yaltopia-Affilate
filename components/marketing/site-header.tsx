import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BOOK_A_CALL_URL, YALTOPIA_TECH_URL } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4 px-4 py-5 md:px-10">
      <Link href="/" className="flex items-center gap-2 text-background">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary font-heading text-sm font-bold text-primary-foreground">
          YA
        </span>
        <span className="font-heading text-lg font-semibold tracking-tight">
          Yaltopia Affiliate
        </span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-background/70 lg:flex">
        <a
          href="#creators"
          className="text-background underline decoration-primary decoration-2 underline-offset-8"
        >
          Creators
        </a>
        <Link href="/app" className="hover:text-background">
          Dashboard
        </Link>
        <Link href="/join/creator" className="hover:text-background">
          Creators join
        </Link>
        <a href={YALTOPIA_TECH_URL} className="hover:text-background">
          Yaltopia Tech
        </a>
      </nav>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          render={<a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer" />}
        >
          Book a call
        </Button>
      </div>
    </header>
  );
}
