import { CreatorProfileForm } from "@/components/profile/creator-profile-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { emptyCreator, getCreator } from "@/lib/mocks/creators";

export default function StudioProfilePage() {
  const creator = getCreator("c-yuti") ?? emptyCreator();

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <PageHeader
        title="Profile"
        support="Public name, bio, and socials. Packages have their own page."
      />
      <CreatorProfileForm initial={creator} kycHref="/studio/kyc" />
    </div>
  );
}
