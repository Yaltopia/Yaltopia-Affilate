import { KycForm } from "@/components/kyc/kyc-form";

export default function AdvertiserKycPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">KYC</h1>
        <p className="text-sm text-muted-foreground">
          After registration. TIN certificate, national ID, and business license. Admin
          reviews before you go live.
        </p>
      </div>
      <KycForm role="advertiser" />
    </div>
  );
}
