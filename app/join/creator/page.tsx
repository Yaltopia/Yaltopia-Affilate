import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { CreatorProfileForm } from "@/components/profile/creator-profile-form";
import { Button } from "@/components/ui/button";
import { emptyCreator, getCreator } from "@/lib/mocks/creators";
import { primarySocial } from "@/packages/contracts";

export default async function JoinCreatorPage({
  searchParams,
}: {
  searchParams: Promise<{ claim?: string }>;
}) {
  const { claim } = await searchParams;
  const listed = claim ? getCreator(claim) : undefined;
  const handle = listed ? primarySocial(listed)?.handle : undefined;
  const initial = listed
    ? { ...listed, packages: emptyCreator().packages, city: listed.city || "Addis Ababa" }
    : emptyCreator();

  return (
    <main className="ya-enter mx-auto flex min-h-full w-full max-w-4xl flex-col gap-8 px-3 py-8 md:px-4">
      <BrandLockup />
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Creator registration</p>
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          {listed ? `Claim @${handle ?? listed.displayName}` : "Create an account and list your packages"}
        </h1>
        <p className="text-muted-foreground">
          {listed
            ? "This page is a placeholder from the Favikon Ethiopia ranking. Register to claim the handle. KYC is after you have an account."
            : "Register, then fill the profile and every package. KYC starts after you have an account — not on this package form."}
        </p>
      </div>
      <CreatorProfileForm
        showRegister
        kycHref="/studio/kyc"
        initial={initial}
        claimId={listed?.id}
      />
      <Button variant="outline" render={<Link href="/" />}>
        Back
      </Button>
    </main>
  );
}
