"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import { AuthSteps } from "@/components/auth/auth-steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { emptyAdvertiser } from "@/lib/mocks/advertiser";
import {
  hasAllSocialLinks,
  isAdvertiserProfileComplete,
  type AdvertiserProfile,
} from "@/packages/contracts";

import { SocialFields } from "./social-fields";

export function AdvertiserProfileForm({
  initial = emptyAdvertiser(),
  kycHref,
}: {
  initial?: AdvertiserProfile;
  kycHref?: string;
}) {
  const locale = useLocale();
  const [profile, setProfile] = useState<AdvertiserProfile>(initial);
  const [saved, setSaved] = useState(false);
  const [step, setStep] = useState(0);
  const complete = useMemo(() => isAdvertiserProfileComplete(profile), [profile]);
  const steps = [t(locale, "stepProfile"), t(locale, "stepSocials")];
  const aboutOk = Boolean(
    profile.name.trim() && profile.bio.trim() && profile.city.trim() && profile.website.trim(),
  );
  const socialsOk = hasAllSocialLinks(profile.socials);
  const gate = [aboutOk, socialsOk];
  const last = steps.length - 1;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < last) {
      if (!gate[step]) return;
      setStep(step + 1);
      return;
    }
    if (!complete) return;
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <AuthSteps steps={steps} current={step} onBack={setStep} />
      {step === 0 ? (
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
      ) : (
        <SocialFields
          socials={profile.socials}
          showFollowers={false}
          onChange={(socials) => setProfile({ ...profile, socials })}
        />
      )}
      <div className="flex flex-wrap gap-2">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
            {t(locale, "backStep")}
          </Button>
        ) : null}
        <Button type="submit" disabled={!gate[step]}>
          {step < last ? t(locale, "nextStep") : "Save profile"}
        </Button>
      </div>
      {step === last && !complete ? (
        <p className="text-sm text-muted-foreground">Name, city, website, bio, and all five social links are required.</p>
      ) : null}
      {saved ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm">Profile saved.</p>
          {kycHref ? <Button render={<Link href={kycHref} />}>Continue to KYC</Button> : null}
        </div>
      ) : null}
    </form>
  );
}
