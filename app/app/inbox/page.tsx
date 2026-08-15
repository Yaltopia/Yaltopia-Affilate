import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export default function InboxPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Inbox</h1>
        <p className="text-sm text-muted-foreground">
          Counters and proof submissions will land here when auth is wired.
        </p>
      </div>
      <Empty className="border bg-card">
        <EmptyHeader>
          <EmptyTitle>No messages yet</EmptyTitle>
          <EmptyDescription>
            When a creator counters a brief, it will show in this queue.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
