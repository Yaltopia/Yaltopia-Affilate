import type { SocialPlatform } from "@/packages/contracts";

import { cn } from "@/lib/utils";

export const SOCIAL_AUTH_LABELS: Record<
  "google" | SocialPlatform,
  string
> = {
  google: "Google",
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  telegram: "Telegram",
  facebook: "Facebook",
  other: "Other",
};

export const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  telegram: "Telegram",
  facebook: "Facebook",
  other: "Other",
};

export function SocialGlyph({
  platform,
  className,
}: {
  platform: SocialPlatform | "google";
  className?: string;
}) {
  const cls = cn("size-3.5", className);
  switch (platform) {
    case "google":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <rect x="2" y="6" width="20" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path
            d="M14 4v9.2a3.8 3.8 0 1 1-3.2-3.75V12a1.6 1.6 0 1 0 1.6 1.6V4h3.2A5.4 5.4 0 0 0 20 8.4V11a8.2 8.2 0 0 1-4.4-1.3V4h-1.6z"
            fill="currentColor"
          />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path
            d="M20.5 4.5 3.8 11.1c-1.1.4-1.1 1.1-.2 1.4l4.3 1.3 1.6 5c.2.6.6.7 1 .3l2.3-1.9 4.4 3.3c.8.5 1.4.2 1.6-.7L21.7 6c.3-1.2-.4-1.8-1.2-1.5z"
            fill="currentColor"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path
            d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
  }
}
