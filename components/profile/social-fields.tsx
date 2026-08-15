"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  REQUIRED_SOCIAL_PLATFORMS,
  type SocialAccount,
  type SocialPlatform,
} from "@/packages/contracts";

const labels: Record<SocialPlatform, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  telegram: "Telegram",
  facebook: "Facebook",
  other: "Other",
};

type SocialFieldsProps = {
  socials: SocialAccount[];
  showFollowers?: boolean;
  onChange: (socials: SocialAccount[]) => void;
};

export function emptySocials(): SocialAccount[] {
  return REQUIRED_SOCIAL_PLATFORMS.map((platform) => ({
    platform,
    handle: "",
    url: "",
    followerCount: 0,
  }));
}

export function SocialFields({ socials, showFollowers = true, onChange }: SocialFieldsProps) {
  function update(platform: SocialPlatform, patch: Partial<SocialAccount>) {
    const exists = socials.some((social) => social.platform === platform);
    if (!exists) {
      onChange([
        ...socials,
        { platform, handle: "", url: "", followerCount: 0, ...patch },
      ]);
      return;
    }
    onChange(
      socials.map((social) =>
        social.platform === platform ? { ...social, ...patch } : social,
      ),
    );
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium">All social links</legend>
      <p className="text-sm text-muted-foreground">
        Fill every platform you sell or promote from. Handle and URL are required on all five.
      </p>
      {REQUIRED_SOCIAL_PLATFORMS.map((platform) => {
        const row = socials.find((social) => social.platform === platform);
        return (
          <div key={platform} className="grid gap-2 rounded-xl bg-card p-2.5 ring-1 ring-foreground/10 sm:grid-cols-2">
            <p className="sm:col-span-2 text-sm font-medium">{labels[platform]}</p>
            <div className="flex flex-col gap-1">
              <Label htmlFor={`${platform}-handle`}>Handle</Label>
              <Input
                id={`${platform}-handle`}
                value={row?.handle ?? ""}
                placeholder="@handle"
                onChange={(event) => update(platform, { handle: event.target.value.replace(/^@+/, "") })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor={`${platform}-url`}>Profile URL</Label>
              <Input
                id={`${platform}-url`}
                value={row?.url ?? ""}
                placeholder="https://"
                onChange={(event) => update(platform, { url: event.target.value })}
              />
            </div>
            {showFollowers ? (
              <div className="flex flex-col gap-1 sm:col-span-2">
                <Label htmlFor={`${platform}-followers`}>Followers</Label>
                <Input
                  id={`${platform}-followers`}
                  type="number"
                  min={0}
                  value={row?.followerCount ?? 0}
                  onChange={(event) =>
                    update(platform, { followerCount: Number(event.target.value) || 0 })
                  }
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </fieldset>
  );
}
