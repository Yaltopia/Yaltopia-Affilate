import type { Creator, Locale, Role } from "./affiliate";

export type Session = {
  profileId: string;
  displayName: string;
  locale: Locale;
  roles: Role[];
};

export interface AuthProvider {
  getSession(): Promise<Session | null>;
  signIn(email: string, password: string): Promise<Session>;
  signOut(): Promise<void>;
}

export interface DataProvider {
  listApprovedCreators(): Promise<Creator[]>;
  getPlatformMinFollowers(): Promise<{ amount: number; operator: "gte" | "gt" }>;
}
