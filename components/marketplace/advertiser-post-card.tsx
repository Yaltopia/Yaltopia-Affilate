import { Badge } from "@/components/ui/badge";
import { formatEtb } from "@/lib/format";
import type { AdvertiserPost } from "@/packages/contracts";

export function AdvertiserPostCard({ post }: { post: AdvertiserPost }) {
  return (
    <article className="ya-hover-lift flex flex-col gap-3 rounded-2xl bg-card p-3 ring-1 ring-foreground/8 hover:ring-foreground/16">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{post.advertiserName}</p>
          <h3 className="font-heading text-lg font-semibold">{post.title}</h3>
        </div>
        <Badge>{post.status}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{post.description}</p>
      <p className="text-sm">
        {post.platforms.join(", ")} · {post.niches.join(", ")} ·{" "}
        {post.minFollowers.toLocaleString()}+ followers
      </p>
      <p className="text-sm">
        KPIs: {post.minViews.toLocaleString()} views · {post.minLikes.toLocaleString()} likes ·{" "}
        {post.minComments.toLocaleString()} comments
      </p>
      <p className="font-mono font-medium">{formatEtb(post.budget)}</p>
    </article>
  );
}
