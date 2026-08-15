import { AdvertiserProfileForm } from "@/components/profile/advertiser-profile-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { mockAdvertiser } from "@/lib/mocks/advertiser";

export default function ProfilePage() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <PageHeader
        title="Seller profile"
        support="Complete the business profile and every social link before you go live."
      />
      <AdvertiserProfileForm initial={mockAdvertiser} kycHref="/app/kyc" />
    </div>
  );
}
