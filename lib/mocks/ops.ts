import type {
  AdvertiserStatus,
  CreatorStatus,
  KycStatus,
  Money,
  Role,
} from "@/packages/contracts";

export type QueueCreator = {
  id: string;
  displayName: string;
  city: string;
  niche: string;
  followers: number;
  status: CreatorStatus;
};

export type QueueAdvertiser = {
  id: string;
  name: string;
  city: string;
  website: string;
  status: AdvertiserStatus;
};

export type QueueKyc = {
  id: string;
  profileId: string;
  name: string;
  role: "creator" | "advertiser";
  status: KycStatus;
};

export type QueueUser = {
  profileId: string;
  email: string;
  displayName: string;
  roles: Role[];
};

export type AdvertiserBalance = {
  id: string;
  name: string;
  available: Money;
  reserved: Money;
};

export type PaymentRequestRow = {
  id: string;
  advertiserName: string;
  amount: Money;
  status: "draft" | "requested" | "paid";
};

export const seedQueueCreators: QueueCreator[] = [
  {
    id: "c-pending-1",
    displayName: "Liya Tesfaye",
    city: "Addis Ababa",
    niche: "Lifestyle",
    followers: 2400,
    status: "pending_review",
  },
  {
    id: "c-pending-2",
    displayName: "Samuel Girma",
    city: "Jimma",
    niche: "Tech",
    followers: 1800,
    status: "pending_review",
  },
  {
    id: "c-yuti",
    displayName: "Yuti Nass",
    city: "Woliso",
    niche: "Comedy",
    followers: 1_200_000,
    status: "approved",
  },
];

export const seedQueueAdvertisers: QueueAdvertiser[] = [
  {
    id: "adv-pending-1",
    name: "Blue Nile Coffee",
    city: "Addis Ababa",
    website: "https://example.com/bluenile",
    status: "pending_activation",
  },
  {
    id: "adv-primestore",
    name: "Prime Store",
    city: "Addis Ababa",
    website: "https://yaltopiatech.com/",
    status: "active",
  },
];

export const seedQueueKyc: QueueKyc[] = [
  {
    id: "kyc-1",
    profileId: "u-pending-1",
    name: "Liya Tesfaye",
    role: "creator",
    status: "submitted",
  },
  {
    id: "kyc-2",
    profileId: "u-pending-adv",
    name: "Blue Nile Coffee",
    role: "advertiser",
    status: "submitted",
  },
  {
    id: "kyc-3",
    profileId: "u-advertiser",
    name: "Prime Store",
    role: "advertiser",
    status: "approved",
  },
];

export const seedQueueUsers: QueueUser[] = [
  {
    profileId: "u-admin",
    email: "admin@yaltopia.local",
    displayName: "Yaltopia Admin",
    roles: ["admin"],
  },
  {
    profileId: "u-payout",
    email: "payout@yaltopia.local",
    displayName: "Payout Desk",
    roles: ["payout_agent"],
  },
  {
    profileId: "u-advertiser",
    email: "advertiser@yaltopia.local",
    displayName: "Prime Store",
    roles: ["advertiser"],
  },
  {
    profileId: "u-creator",
    email: "creator@yaltopia.local",
    displayName: "Yuti Nass",
    roles: ["creator"],
  },
];

export const seedBalances: AdvertiserBalance[] = [
  {
    id: "wal-primestore",
    name: "Prime Store",
    available: { amount: "8000.00", currency: "ETB" },
    reserved: { amount: "23500.00", currency: "ETB" },
  },
  {
    id: "wal-bluenile",
    name: "Blue Nile Coffee",
    available: { amount: "0.00", currency: "ETB" },
    reserved: { amount: "0.00", currency: "ETB" },
  },
];

export const seedPayments: PaymentRequestRow[] = [
  {
    id: "pay-1",
    advertiserName: "Prime Store",
    amount: { amount: "23500.00", currency: "ETB" },
    status: "draft",
  },
];
