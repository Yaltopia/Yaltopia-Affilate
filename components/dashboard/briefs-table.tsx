"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatEtb } from "@/lib/format";
import { mockBriefs } from "@/lib/mocks/briefs";
import { mockCreators } from "@/lib/mocks/creators";
import { matchesHandle, type CollaborationStatus } from "@/packages/contracts";

import { StatusBadge } from "./status-badge";

const filters: { id: "all" | CollaborationStatus; label: string }[] = [
  { id: "all", label: "All briefs" },
  { id: "requested", label: "Requested" },
  { id: "in_progress", label: "In progress" },
  { id: "submitted", label: "On review" },
  { id: "completed", label: "Done" },
];

function creatorById(id: string) {
  return mockCreators.find((creator) => creator.id === id);
}

export function BriefsTable() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const rows = useMemo(() => {
    return mockBriefs.filter((brief) => {
      const creator = creatorById(brief.creatorId);
      if (!creator) return false;
      if (filter !== "all" && brief.status !== filter) return false;
      if (query && !matchesHandle(creator, query) && !creator.displayName.toLowerCase().includes(query.toLowerCase().replace(/^@+/, ""))) {
        return false;
      }
      return true;
    });
  }, [filter, query]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <form
          className="flex max-w-md flex-1 items-center gap-2 rounded-full bg-card px-3 py-1.5 ring-1 ring-foreground/10"
          onSubmit={(event) => event.preventDefault()}
        >
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search @handle or creator…"
            className="h-8 border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </form>
        <Button size="sm" render={<a href="/#creators" />}>
          New brief
        </Button>
      </div>
      <ToggleGroup
        value={[filter]}
        onValueChange={(next) => {
          const value = Array.isArray(next) ? next[0] : next;
          if (typeof value === "string") setFilter(value);
        }}
        variant="outline"
        size="sm"
        className="flex flex-wrap justify-start"
      >
        {filters.map((item) => (
          <ToggleGroupItem key={item.id} value={item.id}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {rows.length === 0 ? (
        <Empty className="border bg-card">
          <EmptyHeader>
            <EmptyTitle>No briefs match</EmptyTitle>
            <EmptyDescription>
              Try another @handle or clear the status filter.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <span className="sr-only">Select</span>
                </TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Brief</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((brief) => {
                const creator = creatorById(brief.creatorId);
                if (!creator) return null;
                const handle = creator.socials[0]?.handle ?? creator.id;
                return (
                  <TableRow key={brief.id} className="hover:bg-muted/40">
                    <TableCell>
                      <Checkbox aria-label={`Select ${brief.offerTitle}`} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={creator.photoUrl} alt="" />
                          <AvatarFallback>{creator.displayName.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{creator.displayName}</p>
                          <p className="truncate text-xs text-muted-foreground">@{handle}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{brief.offerTitle}</p>
                      <p className="max-w-xs truncate text-xs text-muted-foreground">{brief.note}</p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {new Date(brief.dueOn).toLocaleDateString("en-ET", {
                        day: "numeric",
                        month: "short",
                      })}
                    </TableCell>
                    <TableCell className="font-mono font-medium">
                      {formatEtb(brief.briefFee)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={brief.status} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
