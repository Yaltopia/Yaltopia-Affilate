import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { AdvertiserPostCard } from "@/components/marketplace/advertiser-post-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { mockPosts } from "@/lib/mocks/criteria";

export default function PublicPostsPage() {
  const live = mockPosts.filter((post) => post.status === "live");

  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader tone="light" compact />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-3 py-6 md:px-4">
        <Reveal className="flex flex-col gap-3">
          <h1 className="font-heading text-4xl font-bold tracking-tight">Advertiser posts</h1>
          <p className="text-muted-foreground">
            Sellers post what they need. Creators apply. Packages stay on the creator.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button render={<Link href="/app/posts" />}>Make a post</Button>
            <Button variant="outline" render={<Link href="/join/creator" />}>
              Join as creator
            </Button>
          </div>
        </Reveal>
        <ul className="flex flex-col gap-3">
          {live.map((post, index) => (
            <li key={post.id}>
              <Reveal delay={index * 60}>
                <AdvertiserPostCard post={post} />
              </Reveal>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter compact />
    </div>
  );
}
