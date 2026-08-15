"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { claimPage } from "@/lib/claim-store";
import { emptyCreator } from "@/lib/mocks/creators";
import { registerAccount } from "@/lib/session-store";
import { isCreatorProfileComplete, type Creator } from "@/packages/contracts";

import { PackageFields } from "./package-fields";
import { RegisterFields } from "./register-fields";
import { SocialFields } from "./social-fields";

export function CreatorProfileForm({
  initial = emptyCreator(),
  showRegister = false,
  kycHref,
  claimId,
}: {
  initial?: Creator;
  showRegister?: boolean;
  kycHref?: string;
  claimId?: string;
}) {
  const [profile, setProfile] = useState<Creator>(initial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const profileReady = useMemo(() => isCreatorProfileComplete(profile), [profile]);
  const complete = profileReady && (!showRegister || (Boolean(email.trim()) && password.length >= 8));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) return;
    setError("");
    if (showRegister) {
      try {
        const session = await registerAccount({
          email,
          password,
          displayName: profile.displayName,
          roles: ["creator"],
        });
        if (claimId) claimPage(claimId, session.profileId, session.displayName);
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
          <Label htmlFor="cr-name">Display name</Label>
          <Input
            id="cr-name"
            value={profile.displayName}
            onChange={(event) => setProfile({ ...profile, displayName: event.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="cr-city">City</Label>
          <Input
            id="cr-city"
            value={profile.city}
            onChange={(event) => setProfile({ ...profile, city: event.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="cr-niche">Niche</Label>
          <Input
            id="cr-niche"
            value={profile.niche}
            onChange={(event) => setProfile({ ...profile, niche: event.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <Label htmlFor="cr-bio">Bio</Label>
          <Textarea
            id="cr-bio"
            value={profile.bio}
            onChange={(event) => setProfile({ ...profile, bio: event.target.value })}
          />
        </div>
      </div>
      <SocialFields
        socials={profile.socials}
        onChange={(socials) => setProfile({ ...profile, socials })}
      />
      <PackageFields
        packages={profile.packages}
        onChange={(packages) => setProfile({ ...profile, packages })}
      />
      <Button type="submit" disabled={!complete}>
        {showRegister ? "Register and save profile" : "Save complete profile"}
      </Button>
      {!complete ? (
        <p className="text-sm text-muted-foreground">
          {showRegister ? "Account, " : ""}
          bio, all five social links, and at least one priced package are required.
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
