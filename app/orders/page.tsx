import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { OrderBoard } from "@/components/marketing/order-board";

export default function PublicOrdersPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader tone="light" compact />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-3 py-6 md:px-4">
        <OrderBoard />
      </main>
      <SiteFooter compact />
    </div>
  );
}
