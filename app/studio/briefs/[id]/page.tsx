import { OrderDetail } from "@/components/order/order-detail";
import { mockBriefs } from "@/lib/mocks/briefs";

export function generateStaticParams() {
  return mockBriefs.map((brief) => ({ id: brief.id }));
}

export default async function CreatorOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetail orderId={id} role="creator" />;
}
