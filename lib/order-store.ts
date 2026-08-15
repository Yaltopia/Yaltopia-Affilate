"use client";

import { useSyncExternalStore } from "react";

import { mockBriefs, mockLedger, mockSamples, mockWallet } from "@/lib/mocks/briefs";
import {
  addMoney,
  canCoverOrder,
  canSendFunds,
  criteriaMet,
  isPricedMoney,
  subtractMoney,
  type AdvertiserWallet,
  type CollaborationBrief,
  type SampleRound,
  type WalletLedgerEntry,
} from "@/packages/contracts";

export type OrderState = {
  wallet: AdvertiserWallet;
  ledger: WalletLedgerEntry[];
  briefs: CollaborationBrief[];
  samples: SampleRound[];
  creatorPaid: Record<string, string>;
};

const listeners = new Set<() => void>();

let state: OrderState = {
  wallet: mockWallet,
  ledger: mockLedger,
  briefs: mockBriefs,
  samples: mockSamples,
  creatorPaid: { "b-4": "9800.00" },
};

function emit() {
  listeners.forEach((listener) => listener());
}

function now() {
  return new Date().toISOString();
}

export function getOrderState(): OrderState {
  return state;
}

export function subscribeOrderState(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useOrderState(): OrderState {
  return useSyncExternalStore(subscribeOrderState, getOrderState, getOrderState);
}

export function depositToWallet(amount: string) {
  const money = { amount, currency: "ETB" as const };
  if (!isPricedMoney(money)) return;
  state = {
    ...state,
    wallet: {
      ...state.wallet,
      available: addMoney(state.wallet.available, money),
    },
    ledger: [
      {
        id: `led-${Date.now()}`,
        walletId: state.wallet.id,
        type: "deposit",
        amount: money,
        createdAt: now(),
      },
      ...state.ledger,
    ],
  };
  emit();
}

export function secureOrder(orderId: string) {
  const brief = state.briefs.find((item) => item.id === orderId);
  if (!brief || brief.status !== "accepted" || brief.escrowStatus !== "none") return;
  if (!canCoverOrder(state.wallet.available, brief.briefFee)) return;
  state = {
    ...state,
    wallet: {
      ...state.wallet,
      available: subtractMoney(state.wallet.available, brief.briefFee),
      reserved: addMoney(state.wallet.reserved, brief.briefFee),
    },
    briefs: state.briefs.map((item) =>
      item.id === orderId ? { ...item, status: "funded", escrowStatus: "secured" } : item,
    ),
    ledger: [
      {
        id: `led-${Date.now()}`,
        walletId: state.wallet.id,
        type: "reserve",
        amount: brief.briefFee,
        orderId,
        createdAt: now(),
      },
      ...state.ledger,
    ],
  };
  emit();
}

export function addSampleRound(orderId: string, note: string, videoUrl: string) {
  const brief = state.briefs.find((item) => item.id === orderId);
  if (!brief || (brief.status !== "funded" && brief.status !== "sample_review")) return;
  if (brief.escrowStatus !== "secured") return;
  state = {
    ...state,
    briefs: state.briefs.map((item) =>
      item.id === orderId ? { ...item, status: "sample_review" } : item,
    ),
    samples: [
      {
        id: `s-${Date.now()}`,
        orderId,
        authorRole: "creator",
        kind: "sample",
        note: note.trim(),
        videoUrl: videoUrl.trim(),
        createdAt: now(),
      },
      ...state.samples,
    ],
  };
  emit();
}

export function addSampleFeedback(orderId: string, note: string) {
  const brief = state.briefs.find((item) => item.id === orderId);
  if (!brief || brief.status !== "sample_review") return;
  state = {
    ...state,
    samples: [
      {
        id: `s-${Date.now()}`,
        orderId,
        authorRole: "advertiser",
        kind: "feedback",
        note: note.trim(),
        createdAt: now(),
      },
      ...state.samples,
    ],
  };
  emit();
}

export function markVideoPosted(orderId: string, postedUrl: string) {
  const brief = state.briefs.find((item) => item.id === orderId);
  if (!brief || brief.status !== "sample_review" || !postedUrl.trim()) return;
  state = {
    ...state,
    briefs: state.briefs.map((item) =>
      item.id === orderId ? { ...item, status: "posted", postedUrl: postedUrl.trim() } : item,
    ),
  };
  emit();
}

export function requestRelease(
  orderId: string,
  actual: { views: number; likes: number; comments: number },
) {
  const brief = state.briefs.find((item) => item.id === orderId);
  if (!brief || brief.status !== "posted" || brief.escrowStatus !== "secured") return;
  const next: CollaborationBrief = {
    ...brief,
    status: "release_requested",
    actualViews: actual.views,
    actualLikes: actual.likes,
    actualComments: actual.comments,
  };
  state = {
    ...state,
    briefs: state.briefs.map((item) => (item.id === orderId ? next : item)),
  };
  emit();
  if (canSendFunds(next)) {
    sendFunds(orderId);
  }
}

export function sendFunds(orderId: string) {
  const brief = state.briefs.find((item) => item.id === orderId);
  if (!brief || !canSendFunds(brief)) return;
  state = {
    ...state,
    wallet: {
      ...state.wallet,
      reserved: subtractMoney(state.wallet.reserved, brief.briefFee),
    },
    briefs: state.briefs.map((item) =>
      item.id === orderId ? { ...item, status: "completed", escrowStatus: "released" } : item,
    ),
    ledger: [
      {
        id: `led-${Date.now()}`,
        walletId: state.wallet.id,
        type: "release",
        amount: brief.briefFee,
        orderId,
        createdAt: now(),
      },
      ...state.ledger,
    ],
    creatorPaid: { ...state.creatorPaid, [orderId]: brief.briefFee.amount },
  };
  emit();
}

export function releaseBlockedReason(brief: CollaborationBrief): string | null {
  if (brief.status !== "release_requested") return null;
  if (brief.actualViews == null || brief.actualLikes == null || brief.actualComments == null) {
    return "Creator must submit posted views, likes, and comments.";
  }
  if (
    criteriaMet(
      { views: brief.actualViews, likes: brief.actualLikes, comments: brief.actualComments },
      brief,
    )
  ) {
    return null;
  }
  return "Criteria not met yet. Funds stay reserved.";
}
