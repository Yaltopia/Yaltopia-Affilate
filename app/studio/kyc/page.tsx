import { KycForm } from "@/components/kyc/kyc-form";

export default function CreatorKycPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">KYC</h1>
        <p className="text-sm text-muted-foreground">
          After registration. National ID, a live photo, and ownership screenshots. Not
          part of the package form.
        </p>
      </div>
      <KycForm role="creator" />
    </div>
  );
}
