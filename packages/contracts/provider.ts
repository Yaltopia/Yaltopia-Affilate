import type {
  AdvertiserPost,
  AdvertiserProfile,
  AdvertiserWallet,
  CollaborationBrief,
  Creator,
  Locale,
  Role,
  SampleRound,
  WalletLedgerEntry,
} from "./affiliate";

export const DATA_PROVIDER_IDS = ["firebase", "supabase", "convex"] as const;

export type DataProviderId = (typeof DATA_PROVIDER_IDS)[number];

export type Session = {
  profileId: string;
  displayName: string;
  locale: Locale;
  roles: Role[];
};

/** Mock and live social sign-in. Email/password is demo-picker only. */
export type SocialAuthKind =
  | "google"
  | "tiktok"
  | "instagram"
  | "youtube"
  | "telegram"
  | "facebook";

export interface AuthProvider {
  getSession(): Promise<Session | null>;
  signIn(email: string, password: string): Promise<Session>;
  signInWithSocial(provider: SocialAuthKind): Promise<Session>;
  signOut(): Promise<void>;
  register(input: {
    email: string;
    password: string;
    displayName: string;
    roles: Role[];
  }): Promise<Session>;
  registerWithSocial(input: {
    provider: SocialAuthKind;
    displayName: string;
    roles: Role[];
  }): Promise<Session>;
}

export interface DataProvider {
  listApprovedCreators(): Promise<Creator[]>;
  getPlatformMinFollowers(): Promise<{ amount: number; operator: "gte" | "gt" }>;
  listLivePosts(): Promise<AdvertiserPost[]>;
  getAdvertiserProfile(id: string): Promise<AdvertiserProfile | null>;
  getAdvertiserWallet(advertiserId: string): Promise<AdvertiserWallet | null>;
  listWalletLedger(walletId: string): Promise<WalletLedgerEntry[]>;
  getBrief(id: string): Promise<CollaborationBrief | null>;
  listSampleRounds(orderId: string): Promise<SampleRound[]>;
}
