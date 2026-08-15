import { AdvertiserPostForm } from "@/components/profile/advertiser-post-form";

export default function AdvertiserPostsPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Posts</h1>
        <p className="text-sm text-muted-foreground">
          Publish what you want to advertise. Live posts show on the public board.
        </p>
      </div>
      <AdvertiserPostForm />
    </div>
  );
}
