import { AdvertiserProfileForm } from "@/components/profile/advertiser-profile-form";
import { mockAdvertiser } from "@/lib/mocks/advertiser";

export default function ProfilePage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Seller profile</h1>
        <p className="text-sm text-muted-foreground">
          Complete the business profile and every social link before you go live.
        </p>
      </div>
      <AdvertiserProfileForm initial={mockAdvertiser} />
    </div>
  );
}
