import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "brand",
  href,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: "brand" | "orange" | "forest" | "muted";
  href?: string;
}) {
  const tones = {
    brand: "bg-primary/20 text-foreground",
    orange: "bg-accent/15 text-accent",
    forest: "bg-foreground/8 text-foreground",
    muted: "bg-muted text-muted-foreground",
  };
  const card = (
    <Card className={cn("h-full", href && "transition-shadow hover:shadow-sm")}>
      <CardContent className="flex items-start gap-4 p-5">
        <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-md", tones[tone])}>
          <Icon className="size-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
          <p className="mt-1 font-heading text-2xl font-bold tracking-tight">{value}</p>
          {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  );

  if (!href) return card;
  return (
    <Link href={href} className="block rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
      {card}
    </Link>
  );
}
