import { WalletPanel } from "@/components/order/wallet-panel";

export default function WalletPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Wallet</h1>
        <p className="text-sm text-muted-foreground">
          Deposit ETB to match an agreed order. Reserved funds stay until criteria are met.
        </p>
      </div>
      <WalletPanel />
    </div>
  );
}
