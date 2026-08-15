import { BriefsTable } from "@/components/dashboard/briefs-table";

export default function StudioBriefsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Creator studio</h1>
        <p className="text-sm text-muted-foreground">
          Your creator workspace. After funds are secured, send a sample, revise,
          post, then ask for release.
        </p>
      </div>
      <BriefsTable hrefBase="/studio/briefs" />
    </div>
  );
}
