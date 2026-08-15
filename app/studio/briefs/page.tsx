import { BriefsTable } from "@/components/dashboard/briefs-table";
import { PageHeader } from "@/components/dashboard/page-header";

export default function StudioBriefsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Briefs"
        support="After funds are secured, send a sample, revise, post, then ask for release."
      />
      <BriefsTable hrefBase="/studio/briefs" />
    </div>
  );
}
