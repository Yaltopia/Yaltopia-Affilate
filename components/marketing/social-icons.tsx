import type { SocialPlatform } from "@/packages/contracts";

export const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  telegram: "Telegram",
  facebook: "Facebook",
  other: "Other",
};

const iconClass = "size-3.5";

export function SocialGlyph({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
          <rect x="2" y="6" width="20" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
          <path
            d="M14 4v9.2a3.8 3.8 0 1 1-3.2-3.75V12a1.6 1.6 0 1 0 1.6 1.6V4h3.2A5.4 5.4 0 0 0 20 8.4V11a8.2 8.2 0 0 1-4.4-1.3V4h-1.6z"
            fill="currentColor"
          />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
          <path
            d="M20.5 4.5 3.8 11.1c-1.1.4-1.1 1.1-.2 1.4l4.3 1.3 1.6 5c.2.6.6.7 1 .3l2.3-1.9 4.4 3.3c.8.5 1.4.2 1.6-.7L21.7 6c.3-1.2-.4-1.8-1.2-1.5z"
            fill="currentColor"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
          <path
            d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
  }
}
