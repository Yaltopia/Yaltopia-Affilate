import { BriefsTable } from "@/components/dashboard/briefs-table";

export default function BriefsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Briefs</h1>
        <p className="text-sm text-muted-foreground">
          Accept, counter, and track video briefs. Statuses match the spec.
        </p>
      </div>
      <BriefsTable />
    </div>
  );
}
