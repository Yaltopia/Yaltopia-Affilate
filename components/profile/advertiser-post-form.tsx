"use client";

import { FormEvent, useState } from "react";

import { AdvertiserPostCard } from "@/components/marketplace/advertiser-post-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockAdvertiser } from "@/lib/mocks/advertiser";
import { mockPosts } from "@/lib/mocks/criteria";
import { REQUIRED_SOCIAL_PLATFORMS, type AdvertiserPost, type SocialPlatform } from "@/packages/contracts";

const niches = ["Lifestyle", "Comedy", "Fashion", "Tech", "Food", "Music", "Beauty", "Sports"];

export function AdvertiserPostForm() {
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
    if (
      !title.trim() ||
      !description.trim() ||
      platforms.length === 0 ||
      selectedNiches.length === 0 ||
      Number(budget) <= 0
    ) {
      return;
    }
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl bg-card p-5 ring-1 ring-foreground/8">
        <h2 className="font-heading text-xl font-semibold">Make a post</h2>
        <p className="text-sm text-muted-foreground">
          Creators see this on the public board and can apply against your platforms, niche, and KPIs.
        </p>
        <div className="flex flex-col gap-1">
          <Label htmlFor="post-title">Title</Label>
          <Input
            id="post-title"
            value={title}
            placeholder="Coffee launch — 15s TikTok"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="post-desc">What you need</Label>
          <Textarea
            id="post-desc"
            value={description}
            placeholder="Show the bag, say the code…"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Platforms</legend>
          <div className="flex flex-wrap gap-2">
            {REQUIRED_SOCIAL_PLATFORMS.map((platform) => (
              <Button
                key={platform}
                type="button"
                size="sm"
                variant={platforms.includes(platform) ? "default" : "outline"}
                onClick={() => togglePlatform(platform)}
              >
                {platform}
              </Button>
            ))}
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Niches</legend>
          <div className="flex flex-wrap gap-2">
            {niches.map((niche) => (
              <Button
                key={niche}
                type="button"
                size="sm"
                variant={selectedNiches.includes(niche) ? "default" : "outline"}
                onClick={() => toggleNiche(niche)}
              >
                {niche}
              </Button>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="post-followers">Min followers</Label>
            <Input
              id="post-followers"
              type="number"
              min={1000}
              value={minFollowers}
              onChange={(event) => setMinFollowers(Number(event.target.value) || 0)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="post-budget">Budget (ETB)</Label>
            <Input
              id="post-budget"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="post-views">Min views</Label>
            <Input
              id="post-views"
              type="number"
              value={minViews}
              onChange={(event) => setMinViews(Number(event.target.value) || 0)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="post-likes">Min likes</Label>
            <Input
              id="post-likes"
              type="number"
              value={minLikes}
              onChange={(event) => setMinLikes(Number(event.target.value) || 0)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="post-comments">Min comments</Label>
            <Input
              id="post-comments"
              type="number"
              value={minComments}
              onChange={(event) => setMinComments(Number(event.target.value) || 0)}
            />
          </div>
        </div>
        <Button type="submit">Publish post</Button>
      </form>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.id}>
            <AdvertiserPostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
