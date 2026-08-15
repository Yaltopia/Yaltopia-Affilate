import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBriefs } from "@/lib/mocks/briefs";

export function AnalyticsAside() {
  const done = mockBriefs.filter((brief) => brief.status === "completed").length;
  const active = mockBriefs.filter((brief) =>
    ["accepted", "funded", "sample_review", "posted", "release_requested", "in_progress", "submitted"].includes(
      brief.status,
    ),
  ).length;
  const rate = Math.round((done / mockBriefs.length) * 100);

  return (
    <aside className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardDescription>Open briefs</CardDescription>
          <CardTitle className="font-heading text-3xl">{active}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {mockBriefs.slice(0, 8).map((brief) => (
              <span
                key={brief.id}
                className="h-8 w-4 rounded-full bg-primary/80 first:bg-primary last:bg-secondary"
                aria-hidden
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Requested, in progress, and on review.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Completion</CardDescription>
          <CardTitle className="font-heading text-3xl">{rate}%</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {mockBriefs.map((brief) => (
              <span
                key={brief.id}
                className={
                  brief.status === "completed"
                    ? "size-2.5 rounded-full bg-primary"
                    : "size-2.5 rounded-full bg-secondary"
                }
                aria-hidden
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {done} of {mockBriefs.length} briefs marked done.
          </p>
        </CardContent>
      </Card>
    </aside>
  );
}
