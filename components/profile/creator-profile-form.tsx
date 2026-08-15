"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { AuthSteps } from "@/components/auth/auth-steps";
import { CategorySelect } from "@/components/marketplace/category-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { emptyCreator } from "@/lib/mocks/creators";
import { hasAllSocialLinks, type Creator } from "@/packages/contracts";

import { SocialFields } from "./social-fields";

export function CreatorProfileForm({
  initial = emptyCreator(),
  kycHref,
}: {
  initial?: Creator;
  kycHref?: string;
}) {
  const locale = useLocale();
  const [profile, setProfile] = useState<Creator>(initial);
  const [saved, setSaved] = useState(false);
  const [step, setStep] = useState(0);
  const steps = [t(locale, "stepProfile"), t(locale, "stepSocials")];
  const aboutOk = Boolean(
    profile.displayName.trim() && profile.bio.trim() && profile.city.trim() && profile.niche.trim(),
  );
  const socialsOk = hasAllSocialLinks(profile.socials);
  const complete = aboutOk && socialsOk;
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
          <CategorySelect
            id="cr-niche"
            label="Category"
            value={profile.niche}
            onChange={(niche) => setProfile({ ...profile, niche })}
            required
          />
          <div className="flex flex-col gap-1 sm:col-span-2">
            <Label htmlFor="cr-bio">Bio</Label>
            <Textarea
              id="cr-bio"
              value={profile.bio}
              onChange={(event) => setProfile({ ...profile, bio: event.target.value })}
            />
          </div>
        </div>
      ) : (
        <SocialFields socials={profile.socials} onChange={(socials) => setProfile({ ...profile, socials })} />
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
        <p className="text-sm text-muted-foreground">Bio and all five social links are required.</p>
      ) : null}
      {saved ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm">Profile saved. Packages are a separate studio page.</p>
          {kycHref ? <Button render={<Link href={kycHref} />}>Continue to KYC</Button> : null}
        </div>
      ) : null}
    </form>
  );
}
