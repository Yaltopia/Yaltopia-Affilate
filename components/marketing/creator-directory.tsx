import { Search } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Creator } from "@/packages/contracts";

import { CreatorCard } from "./creator-card";

type CreatorDirectoryProps = {
  creators: Creator[];
  query: string;
};

export function CreatorDirectory({ creators, query }: CreatorDirectoryProps) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">
          {creators.length} approved creators · 1,000+ followers
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Creators
        </h2>
      </div>
      {creators.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <Search className="size-6 text-muted-foreground" aria-hidden />
            <EmptyTitle>No creator matches</EmptyTitle>
            <EmptyDescription>
              {query
                ? `Nothing for @${query.replace(/^@+/, "")}. Try another handle, or reset filters.`
                : "No approved creators match these filters. Reset the disclosure panel."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {creators.map((creator) => (
            <li key={creator.id}>
              <CreatorCard creator={creator} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
