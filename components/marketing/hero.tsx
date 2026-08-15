import { FormEvent } from "react";
import { ArrowUpRight, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockCreators } from "@/lib/mocks/creators";

type HeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
};

export function Hero({ query, onQueryChange, onSearch }: HeroProps) {
  const faces = mockCreators.slice(0, 3);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <div className="grid items-end gap-10 px-4 pb-16 pt-6 md:px-10 lg:grid-cols-[minmax(0,1.2fr)_280px] lg:pb-20">
      <div className="flex flex-col gap-8">
        <h1 className="max-w-3xl font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-background sm:text-5xl lg:text-6xl">
          Find{" "}
          <span className="inline-flex translate-y-1 items-center rounded-full border-2 border-primary px-3 py-1 text-primary">
            <Search className="size-7" aria-hidden />
            <span className="sr-only">search</span>
          </span>{" "}
          creators{" "}
          <span className="inline-flex items-center pl-1">
            {faces.map((creator, index) => (
              <Avatar
                key={creator.id}
                className="size-10 ring-2 ring-foreground"
                style={{ marginLeft: index === 0 ? 0 : -10 }}
              >
                <AvatarImage src={creator.photoUrl} alt="" />
                <AvatarFallback>{creator.displayName.slice(0, 1)}</AvatarFallback>
              </Avatar>
            ))}
          </span>{" "}
          to collaborate with
        </h1>
        <p className="max-w-xl text-base text-background/70">
          Search an @handle. Brief a video. Pay on a tracked code — not a handshake.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl items-center gap-2 rounded-2xl bg-background/10 p-1.5 ring-1 ring-background/15"
        >
          <label htmlFor="handle-search" className="sr-only">
            Search creator handles
          </label>
          <Input
            id="handle-search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search @handle on TikTok, Instagram, YouTube, Telegram…"
            className="h-12 border-0 bg-transparent text-background shadow-none placeholder:text-background/45 focus-visible:ring-0"
          />
          <Button type="submit" size="icon" className="size-12 shrink-0 rounded-xl" aria-label="Search handles">
            <Search className="size-5" />
          </Button>
        </form>
      </div>
      <a
        href="#creators"
        className="flex min-h-44 flex-col justify-between rounded-3xl bg-primary p-6 text-primary-foreground"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-foreground text-primary">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
        <span className="flex items-end justify-between gap-3">
          <span className="font-heading text-2xl font-bold leading-tight">
            See how it works
          </span>
          <ArrowUpRight className="size-8 shrink-0" aria-hidden />
        </span>
      </a>
    </div>
  );
}
