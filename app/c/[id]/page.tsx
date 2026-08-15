import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { CreatorDetailView } from "@/components/marketplace/creator-detail-view";
import { mockCreators } from "@/lib/mocks/creators";

export const dynamicParams = true;

export function generateStaticParams() {
  return mockCreators.map((creator) => ({ id: creator.id }));
}

export default async function CreatorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader tone="light" compact />
      <CreatorDetailView id={id} />
      <SiteFooter compact />
    </div>
  );
}
