"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatEtb } from "@/lib/format";
import { depositToWallet, useOrderState } from "@/lib/order-store";
import { isPricedMoney } from "@/packages/contracts";

export function WalletPanel() {
  const { wallet, ledger } = useOrderState();
  const [amount, setAmount] = useState("18000.00");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isPricedMoney({ amount, currency: "ETB" })) return;
    depositToWallet(amount);
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-card p-3 ring-1 ring-foreground/8">
          <p className="text-sm text-muted-foreground">Available</p>
          <p className="font-mono text-2xl font-semibold">{formatEtb(wallet.available)}</p>
        </div>
        <div className="rounded-2xl bg-card p-3 ring-1 ring-foreground/8">
          <p className="text-sm text-muted-foreground">Reserved on orders</p>
          <p className="font-mono text-2xl font-semibold">{formatEtb(wallet.reserved)}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-2xl bg-card p-3 ring-1 ring-foreground/8">
        <h2 className="font-heading text-xl font-semibold">Deposit</h2>
        <p className="text-sm text-muted-foreground">
          After an offer is agreed, deposit at least the order amount, then secure that order.
        </p>
        <Label htmlFor="deposit-amount">Amount (ETB)</Label>
        <Input
          id="deposit-amount"
          value={amount}
          inputMode="decimal"
          onChange={(event) => setAmount(event.target.value)}
        />
        <Button type="submit">Deposit to wallet</Button>
      </form>
      <ul className="flex flex-col gap-2">
        {ledger.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-card px-2.5 py-2 text-sm ring-1 ring-foreground/8"
          >
            <span>
              {entry.type}
              {entry.orderId ? ` · ${entry.orderId}` : ""}
            </span>
            <span className="font-mono">{formatEtb(entry.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
