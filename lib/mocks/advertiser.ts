import type { AdvertiserProfile } from "@/packages/contracts";
import { REQUIRED_SOCIAL_PLATFORMS } from "@/packages/contracts";

export function emptyAdvertiser(): AdvertiserProfile {
  return {
    id: "",
    name: "",
    bio: "",
    city: "",
    website: "",
    socials: REQUIRED_SOCIAL_PLATFORMS.map((platform) => ({
      platform,
      handle: "",
      url: "",
      followerCount: 0,
    })),
  };
}

export const mockAdvertiser: AdvertiserProfile = {
  id: "adv-primestore",
  name: "Prime Store",
  bio: "Ethiopian retail. We brief creators with a code, not a handshake.",
  city: "Addis Ababa",
  website: "https://yaltopiatech.com/",
  socials: REQUIRED_SOCIAL_PLATFORMS.map((platform) => ({
    platform,
    handle: `primestore_${platform}`,
    url: `https://example.com/${platform}/primestore`,
    followerCount: 0,
  })),
};
