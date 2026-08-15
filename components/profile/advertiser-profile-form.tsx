"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { emptyAdvertiser } from "@/lib/mocks/advertiser";
import { registerAccount } from "@/lib/session-store";
import { isAdvertiserProfileComplete, type AdvertiserProfile } from "@/packages/contracts";

import { RegisterFields } from "./register-fields";
import { SocialFields } from "./social-fields";

export function AdvertiserProfileForm({
  initial = emptyAdvertiser(),
  showRegister = false,
  kycHref,
}: {
  initial?: AdvertiserProfile;
  showRegister?: boolean;
  kycHref?: string;
}) {
  const [profile, setProfile] = useState<AdvertiserProfile>(initial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const profileReady = useMemo(() => isAdvertiserProfileComplete(profile), [profile]);
  const complete = profileReady && (!showRegister || (Boolean(email.trim()) && password.length >= 8));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) return;
    setError("");
    if (showRegister) {
      try {
        await registerAccount({
          email,
          password,
          displayName: profile.name,
          roles: ["advertiser"],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not register.");
        return;
      }
    }
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {showRegister ? (
        <RegisterFields
          email={email}
          password={password}
          onEmail={setEmail}
          onPassword={setPassword}
        />
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="adv-name">Business name</Label>
          <Input
            id="adv-name"
            value={profile.name}
            onChange={(event) => setProfile({ ...profile, name: event.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="adv-city">City</Label>
          <Input
            id="adv-city"
            value={profile.city}
            onChange={(event) => setProfile({ ...profile, city: event.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <Label htmlFor="adv-web">Website</Label>
          <Input
            id="adv-web"
            value={profile.website}
            onChange={(event) => setProfile({ ...profile, website: event.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <Label htmlFor="adv-bio">About the seller</Label>
          <Textarea
            id="adv-bio"
            value={profile.bio}
            onChange={(event) => setProfile({ ...profile, bio: event.target.value })}
          />
        </div>
      </div>
      <SocialFields
        socials={profile.socials}
        showFollowers={false}
        onChange={(socials) => setProfile({ ...profile, socials })}
      />
      <Button type="submit" disabled={!complete}>
        {showRegister ? "Register and save profile" : "Save complete profile"}
      </Button>
      {!complete ? (
        <p className="text-sm text-muted-foreground">
          {showRegister ? "Account, " : ""}
          name, city, website, bio, and all five social links are required.
        </p>
      ) : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {saved ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm">
            {showRegister
              ? "Account created. You are signed in. KYC is a separate step after this."
              : "Profile saved."}
          </p>
          {kycHref ? (
            <Button render={<Link href={kycHref} />}>Continue to KYC</Button>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
