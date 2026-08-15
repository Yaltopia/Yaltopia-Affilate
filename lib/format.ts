import type { Money } from "@/packages/contracts";

export function formatEtb(money: Money): string {
  const n = Number(money.amount);
  const formatted = Number.isFinite(n)
    ? n.toLocaleString("en-ET", { maximumFractionDigits: 0 })
    : money.amount;
  return `${money.currency} ${formatted}`;
}

export function formatFollowers(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(count);
}
