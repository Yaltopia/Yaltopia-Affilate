import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { DetailSkeleton } from "@/components/brand/page-loader";

export default function Loading() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader tone="light" compact />
      <DetailSkeleton />
      <SiteFooter compact />
    </div>
  );
}
