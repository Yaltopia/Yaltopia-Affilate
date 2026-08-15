import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { AdvertiserProfileForm } from "@/components/profile/advertiser-profile-form";
import { Button } from "@/components/ui/button";

export default function JoinAdvertiserPage() {
  return (
    <main className="ya-enter mx-auto flex min-h-full w-full max-w-4xl flex-col gap-8 px-3 py-8 md:px-4">
      <BrandLockup />
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Advertiser registration</p>
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Create an account and complete the seller profile
        </h1>
        <p className="text-muted-foreground">
          Register and add all social links. KYC starts after you have an account — not on
          this form.
        </p>
      </div>
      <AdvertiserProfileForm showRegister kycHref="/app/kyc" />
      <Button variant="outline" render={<Link href="/" />}>
        Back
      </Button>
    </main>
  );
}
