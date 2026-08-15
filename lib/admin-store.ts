"use client";

import { useSyncExternalStore } from "react";

import { audit } from "@/lib/log";
import {
  seedBalances,
  seedPayments,
  seedQueueAdvertisers,
  seedQueueCreators,
  seedQueueKyc,
  seedQueueUsers,
  type AdvertiserBalance,
  type PaymentRequestRow,
  type QueueAdvertiser,
  type QueueCreator,
  type QueueKyc,
  type QueueUser,
} from "@/lib/mocks/ops";
import type { AdvertiserStatus, CreatorStatus, KycStatus, Role } from "@/packages/contracts";

export type AuditRow = {
  id: string;
  action: string;
  actor_id: string;
  target?: string;
  createdAt: string;
};

export type AdminState = {
  creators: QueueCreator[];
  advertisers: QueueAdvertiser[];
  kyc: QueueKyc[];
  users: QueueUser[];
  balances: AdvertiserBalance[];
  payments: PaymentRequestRow[];
  minFollowers: number;
  audit: AuditRow[];
};

const listeners = new Set<() => void>();

let state: AdminState = {
  creators: seedQueueCreators,
  advertisers: seedQueueAdvertisers,
  kyc: seedQueueKyc,
  users: seedQueueUsers,
  balances: seedBalances,
  payments: seedPayments,
  minFollowers: 1000,
  audit: [],
};

function emit() {
  listeners.forEach((listener) => listener());
}

function record(action: string, actor_id: string, target?: string) {
  const event = audit({ action, actor_id, target });
  state = {
    ...state,
    audit: [
      {
        id: event.request_id,
        action,
        actor_id,
        target,
        createdAt: new Date().toISOString(),
      },
      ...state.audit,
    ],
  };
  emit();
}

export function getAdminState(): AdminState {
  return state;
}

export function subscribeAdminState(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAdminState(): AdminState {
  return useSyncExternalStore(subscribeAdminState, getAdminState, getAdminState);
}

export function setCreatorStatus(id: string, status: CreatorStatus, actor_id: string) {
  state = {
    ...state,
    creators: state.creators.map((row) => (row.id === id ? { ...row, status } : row)),
  };
  record(status === "approved" ? "creator.approve" : "creator.reject", actor_id, id);
}

export function setAdvertiserStatus(id: string, status: AdvertiserStatus, actor_id: string) {
  state = {
    ...state,
    advertisers: state.advertisers.map((row) => (row.id === id ? { ...row, status } : row)),
  };
  record(status === "active" ? "advertiser.activate" : "advertiser.suspend", actor_id, id);
}

export function setKycStatus(id: string, status: KycStatus, actor_id: string) {
  state = {
    ...state,
    kyc: state.kyc.map((row) => (row.id === id ? { ...row, status } : row)),
  };
  record(status === "approved" ? "kyc.approve" : "kyc.reject", actor_id, id);
}

export function setMinFollowers(amount: number, actor_id: string) {
  state = { ...state, minFollowers: amount };
  record("settings.min_followers", actor_id, String(amount));
}

export function assignRole(profileId: string, role: Role, actor_id: string) {
  state = {
    ...state,
    users: state.users.map((row) =>
      row.profileId === profileId && !row.roles.includes(role)
        ? { ...row, roles: [...row.roles, role] }
        : row,
    ),
  };
  record("role.assign", actor_id, `${profileId}:${role}`);
}

export function addUser(
  input: { email: string; displayName: string; roles: Role[] },
  actor_id: string,
): QueueUser {
  const row: QueueUser = {
    profileId: `u-${crypto.randomUUID()}`,
    email: input.email.trim().toLowerCase(),
    displayName: input.displayName.trim(),
    roles: input.roles,
  };
  state = { ...state, users: [...state.users, row] };
  record("user.create", actor_id, row.profileId);
  return row;
}

export function requestPayment(id: string, actor_id: string) {
  state = {
    ...state,
    payments: state.payments.map((row) =>
      row.id === id ? { ...row, status: "requested" } : row,
    ),
  };
  record("payment_request.create", actor_id, id);
}
