import { CreatorProfileForm } from "@/components/profile/creator-profile-form";
import { emptyCreator, getCreator } from "@/lib/mocks/creators";

export default function StudioProfilePage() {
  const creator = getCreator("c-yuti") ?? emptyCreator();

  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Profile & packages</h1>
        <p className="text-sm text-muted-foreground">
          This is what advertisers see. KYC is a separate step after you have an account.
        </p>
      </div>
      <CreatorProfileForm initial={creator} />
    </div>
  );
}
