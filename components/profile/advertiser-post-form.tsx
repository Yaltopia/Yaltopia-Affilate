"use client";

import { FormEvent, useState } from "react";

import { CreatePanel, FieldRow } from "@/components/dashboard/create-panel";
import { PageHeader } from "@/components/dashboard/page-header";
import { AdvertiserPostCard } from "@/components/marketplace/advertiser-post-card";
import { PLATFORM_LABELS, SocialGlyph } from "@/components/marketing/social-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/lib/category-store";
import { mockAdvertiser } from "@/lib/mocks/advertiser";
import { mockPosts } from "@/lib/mocks/criteria";
import { cn } from "@/lib/utils";
import { REQUIRED_SOCIAL_PLATFORMS, type AdvertiserPost, type SocialPlatform } from "@/packages/contracts";

export function AdvertiserPostForm() {
  const niches = useCategories()
    .filter((category) => category.active)
    .map((category) => category.name);
  const [posts, setPosts] = useState<AdvertiserPost[]>(mockPosts);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(["tiktok"]);
  const [selectedNiches, setSelectedNiches] = useState<string[]>(["Lifestyle"]);
  const [minFollowers, setMinFollowers] = useState(1000);
  const [minViews, setMinViews] = useState(5000);
  const [minLikes, setMinLikes] = useState(200);
  const [minComments, setMinComments] = useState(20);
  const [budget, setBudget] = useState("15000.00");

  const ready =
    Boolean(title.trim() && description.trim()) &&
    platforms.length > 0 &&
    selectedNiches.length > 0 &&
    Number(budget) > 0;

  function togglePlatform(platform: SocialPlatform) {
    setPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform],
    );
  }

  function toggleNiche(niche: string) {
    setSelectedNiches((current) =>
      current.includes(niche) ? current.filter((item) => item !== niche) : [...current, niche],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) return;
    setPosts([
      {
        id: `post-${Date.now()}`,
        advertiserId: mockAdvertiser.id,
        advertiserName: mockAdvertiser.name,
        title: title.trim(),
        description: description.trim(),
        platforms,
        niches: selectedNiches,
        minFollowers,
        minViews,
        minLikes,
        minComments,
        budget: { amount: budget, currency: "ETB" },
        status: "live",
      },
      ...posts,
    ]);
    setTitle("");
    setDescription("");
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="New order"
        support="Creators see this on /orders and the landing Orders switch."
      />
      <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-4">
        <CreatePanel
          kicker="Step 1"
          title="The brief"
          support="One sentence title, then what the creator must film."
        >
          <FieldRow label="Title" htmlFor="post-title" hint="Keep it scannable on a card.">
            <Input
              id="post-title"
              value={title}
              placeholder="Coffee launch — 15s TikTok"
              onChange={(event) => setTitle(event.target.value)}
            />
          </FieldRow>
          <FieldRow label="What you need" htmlFor="post-desc">
            <Textarea
              id="post-desc"
              value={description}
              placeholder="Show the bag, say the code, keep it under 20 seconds."
              className="min-h-28 rounded-md"
              onChange={(event) => setDescription(event.target.value)}
            />
          </FieldRow>
        </CreatePanel>
        <CreatePanel
          kicker="Step 2"
          title="Who can apply"
          support="Platforms and categories from the Admin catalog."
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Platforms</p>
            <div className="flex flex-wrap gap-1.5">
              {REQUIRED_SOCIAL_PLATFORMS.map((platform) => {
                const on = platforms.includes(platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform)}
                    className={cn(
                      "inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium ring-1",
                      on
                        ? "bg-foreground text-background ring-foreground"
                        : "bg-background text-foreground ring-foreground/15",
                    )}
                  >
                    <SocialGlyph platform={platform} className="size-3.5" />
                    {PLATFORM_LABELS[platform]}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Categories</p>
            <div className="flex flex-wrap gap-1.5">
              {niches.map((niche) => {
                const on = selectedNiches.includes(niche);
                return (
                  <button
                    key={niche}
                    type="button"
                    onClick={() => toggleNiche(niche)}
                    className={cn(
                      "inline-flex h-9 items-center rounded-md px-2.5 text-xs font-medium ring-1",
                      on
                        ? "bg-foreground text-background ring-foreground"
                        : "bg-background text-foreground ring-foreground/15",
                    )}
                  >
                    {niche}
                  </button>
                );
              })}
            </div>
          </div>
        </CreatePanel>
        <CreatePanel
          kicker="Step 3"
          title="Budget and KPIs"
          support="Money is ETB with a string amount. Release waits on these floors."
          footer={
            <>
              <p className="text-xs text-muted-foreground">
                {ready ? "Ready to publish." : "Title, description, platforms, category, and budget are required."}
              </p>
              <Button type="submit" disabled={!ready}>
                Publish order
              </Button>
            </>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldRow label="Budget (ETB)" htmlFor="post-budget">
              <Input
                id="post-budget"
                inputMode="decimal"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
              />
            </FieldRow>
            <FieldRow label="Min followers" htmlFor="post-followers">
              <Input
                id="post-followers"
                type="number"
                min={1000}
                value={minFollowers}
                onChange={(event) => setMinFollowers(Number(event.target.value) || 0)}
              />
            </FieldRow>
            <FieldRow label="Min views" htmlFor="post-views">
              <Input
                id="post-views"
                type="number"
                value={minViews}
                onChange={(event) => setMinViews(Number(event.target.value) || 0)}
              />
            </FieldRow>
            <FieldRow label="Min likes" htmlFor="post-likes">
              <Input
                id="post-likes"
                type="number"
                value={minLikes}
                onChange={(event) => setMinLikes(Number(event.target.value) || 0)}
              />
            </FieldRow>
            <FieldRow label="Min comments" htmlFor="post-comments">
              <Input
                id="post-comments"
                type="number"
                value={minComments}
                onChange={(event) => setMinComments(Number(event.target.value) || 0)}
              />
            </FieldRow>
          </div>
        </CreatePanel>
      </form>
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-lg font-semibold">Live on the board</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.id}>
              <AdvertiserPostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
