"use client";

import { PLATFORM_LABELS, SocialGlyph } from "@/components/marketing/social-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  REQUIRED_SOCIAL_PLATFORMS,
  socialFilled,
  type SocialAccount,
  type SocialPlatform,
} from "@/packages/contracts";

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
      onChange([...socials, { platform, handle: "", url: "", followerCount: 0, ...patch }]);
      return;
    }
    onChange(
      socials.map((social) => (social.platform === platform ? { ...social, ...patch } : social)),
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
        const filled = row ? socialFilled(row) : false;
        return (
          <div
            key={platform}
            className="grid gap-2 rounded-md bg-card p-3 ring-1 ring-foreground/10 sm:grid-cols-2"
          >
            <p className="flex items-center gap-2 sm:col-span-2 text-sm font-medium">
              <span className="flex size-9 items-center justify-center rounded-md bg-secondary">
                <SocialGlyph platform={platform} className="size-4" />
              </span>
              {PLATFORM_LABELS[platform]}
              {filled ? (
                <span className="ml-auto text-[11px] font-normal text-muted-foreground">Ready</span>
              ) : null}
            </p>
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
