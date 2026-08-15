"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import { StatusBadge } from "@/components/dashboard/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatEtb } from "@/lib/format";
import { mockCreators } from "@/lib/mocks/creators";
import {
  addSampleFeedback,
  addSampleRound,
  markVideoPosted,
  releaseBlockedReason,
  requestRelease,
  secureOrder,
  sendFunds,
  useOrderState,
} from "@/lib/order-store";
import {
  canCoverOrder,
  canRequestRelease,
  canSendFunds,
  canStartSample,
  criteriaMet,
} from "@/packages/contracts";

const steps = ["Agreed", "Deposit", "Sample", "Posted", "Release"] as const;

function stepIndex(status: string, escrow: string) {
  if (status === "completed") return 4;
  if (status === "release_requested" || status === "posted") return 3;
  if (status === "sample_review") return 2;
  if (status === "funded" || escrow === "secured") return 1;
  if (status === "accepted") return 0;
  return 0;
}

export function OrderDetail({
  orderId,
  role,
}: {
  orderId: string;
  role: "advertiser" | "creator";
}) {
  const { wallet, briefs, samples } = useOrderState();
  const brief = briefs.find((item) => item.id === orderId);
  const creator = mockCreators.find((item) => item.id === brief?.creatorId);
  const thread = useMemo(
    () => samples.filter((item) => item.orderId === orderId).slice().reverse(),
    [samples, orderId],
  );

  const [feedback, setFeedback] = useState("");
  const [sampleNote, setSampleNote] = useState("");
  const [sampleUrl, setSampleUrl] = useState("");
  const [postedUrl, setPostedUrl] = useState("");
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  if (!brief || !creator) {
    return <p className="text-sm text-muted-foreground">Order not found.</p>;
  }

  const activeStep = stepIndex(brief.status, brief.escrowStatus);
  const covers = canCoverOrder(wallet.available, brief.briefFee);
  const blocked = releaseBlockedReason(brief);
  const listHref = role === "advertiser" ? "/app/briefs" : "/studio";

  function onFeedback(event: FormEvent) {
    event.preventDefault();
    if (!feedback.trim()) return;
    addSampleFeedback(orderId, feedback);
    setFeedback("");
  }

  function onSample(event: FormEvent) {
    event.preventDefault();
    if (!sampleNote.trim() || !sampleUrl.trim()) return;
    addSampleRound(orderId, sampleNote, sampleUrl);
    setSampleNote("");
    setSampleUrl("");
  }

  function onPosted(event: FormEvent) {
    event.preventDefault();
    markVideoPosted(orderId, postedUrl || brief?.postedUrl || "");
  }

  function onRelease(event: FormEvent) {
    event.preventDefault();
    requestRelease(orderId, { views, likes, comments });
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-2xl bg-card p-3 ring-1 ring-foreground/8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={creator.photoUrl} alt="" />
            <AvatarFallback>{creator.displayName.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              <Link href={listHref} className="underline underline-offset-4">
                Briefs
              </Link>
              {" · "}
              {creator.displayName}
            </p>
            <h1 className="font-heading text-2xl font-bold tracking-tight">{brief.offerTitle}</h1>
            <p className="truncate text-sm text-muted-foreground">{brief.note}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <p className="font-mono text-lg font-semibold">{formatEtb(brief.briefFee)}</p>
          <StatusBadge status={brief.status} />
        </div>
      </div>

      <ol className="grid grid-cols-5 gap-1.5 text-center text-xs">
        {steps.map((label, index) => (
          <li
            key={label}
            className={
              index <= activeStep
                ? "rounded-lg bg-primary px-1.5 py-2 font-medium text-primary-foreground"
                : "rounded-lg bg-card px-1.5 py-2 text-muted-foreground ring-1 ring-foreground/8"
            }
          >
            {label}
          </li>
        ))}
      </ol>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:items-start">
      <section className="flex flex-col gap-3 rounded-2xl bg-card p-3 ring-1 ring-foreground/8">
        <h2 className="font-heading text-xl font-semibold">Sample video</h2>
        <p className="text-sm text-muted-foreground">
          Go back and forth until the cut is right. Funds stay reserved.
        </p>
        {thread.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sample yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {thread.map((round) => (
              <li key={round.id} className="rounded-xl bg-background px-2.5 py-2 ring-1 ring-foreground/8">
                <p className="text-xs text-muted-foreground">
                  {round.authorRole} · {round.kind}
                </p>
                <p className="text-sm">{round.note}</p>
                {round.videoUrl ? (
                  <a href={round.videoUrl} className="text-sm underline underline-offset-4" target="_blank" rel="noreferrer">
                    Sample link
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        {role === "creator" && canStartSample(brief) ? (
          <form onSubmit={onSample} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="sample-url">Sample URL</Label>
              <Input
                id="sample-url"
                value={sampleUrl}
                placeholder="https://"
                onChange={(event) => setSampleUrl(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="sample-note">Note</Label>
              <Textarea
                id="sample-note"
                value={sampleNote}
                onChange={(event) => setSampleNote(event.target.value)}
              />
            </div>
            <Button type="submit">Send sample</Button>
          </form>
        ) : null}
        {role === "advertiser" && brief.status === "sample_review" ? (
          <form onSubmit={onFeedback} className="flex flex-col gap-3">
            <Label htmlFor="feedback">Request a change</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
            <Button type="submit" variant="outline">
              Send feedback
            </Button>
          </form>
        ) : null}
        {brief.status === "sample_review" ? (
          <form onSubmit={onPosted} className="flex flex-col gap-3">
            <Label htmlFor="posted-url">Posted video URL</Label>
            <Input
              id="posted-url"
              value={postedUrl || brief.postedUrl || ""}
              placeholder="https://"
              onChange={(event) => setPostedUrl(event.target.value)}
            />
            <Button type="submit">Mark as posted</Button>
          </form>
        ) : null}
      </section>

      <aside className="flex flex-col gap-4">
      <section className="flex flex-col gap-2 rounded-2xl bg-card p-3 ring-1 ring-foreground/8">
        <h2 className="font-heading text-lg font-semibold">Escrow</h2>
        <p className="text-sm text-muted-foreground">
          Deposit enough to match this order. The creator films a sample only after funds are secured.
        </p>
        <p className="text-sm">
          Available {formatEtb(wallet.available)} · reserved {formatEtb(wallet.reserved)}
        </p>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">Escrow {brief.escrowStatus}</p>
        {role === "advertiser" && brief.status === "accepted" ? (
          <div className="flex flex-wrap gap-2">
            <Button type="button" disabled={!covers} onClick={() => secureOrder(brief.id)}>
              Secure {formatEtb(brief.briefFee)}
            </Button>
            {!covers ? (
              <Button variant="outline" render={<Link href="/app/wallet" />}>
                Deposit to wallet
              </Button>
            ) : null}
          </div>
        ) : null}
      </section>
      <section className="flex flex-col gap-3 rounded-2xl bg-card p-3 ring-1 ring-foreground/8">
        <h2 className="font-heading text-lg font-semibold">Release</h2>
        <p className="text-sm">
          Criteria: {brief.minViews.toLocaleString()} views · {brief.minLikes.toLocaleString()} likes ·{" "}
          {brief.minComments.toLocaleString()} comments
        </p>
        {brief.actualViews != null ? (
          <p className="text-sm">
            Actual: {brief.actualViews.toLocaleString()} views · {brief.actualLikes?.toLocaleString()} likes ·{" "}
            {brief.actualComments?.toLocaleString()} comments
            {brief.actualViews != null &&
            criteriaMet(
              { views: brief.actualViews, likes: brief.actualLikes ?? 0, comments: brief.actualComments ?? 0 },
              brief,
            )
              ? " · met"
              : ""}
          </p>
        ) : null}
        {brief.postedUrl ? (
          <a href={brief.postedUrl} className="text-sm underline underline-offset-4" target="_blank" rel="noreferrer">
            Live post
          </a>
        ) : null}
        {role === "creator" && canRequestRelease(brief) ? (
          <form onSubmit={onRelease} className="grid gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="rel-views">Views</Label>
              <Input
                id="rel-views"
                type="number"
                value={views}
                onChange={(event) => setViews(Number(event.target.value) || 0)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="rel-likes">Likes</Label>
              <Input
                id="rel-likes"
                type="number"
                value={likes}
                onChange={(event) => setLikes(Number(event.target.value) || 0)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="rel-comments">Comments</Label>
              <Input
                id="rel-comments"
                type="number"
                value={comments}
                onChange={(event) => setComments(Number(event.target.value) || 0)}
              />
            </div>
            <Button type="submit" className="sm:col-span-3">
              Ask for release
            </Button>
          </form>
        ) : null}
        {blocked ? <p className="text-sm text-muted-foreground">{blocked}</p> : null}
        {role === "advertiser" && canSendFunds(brief) ? (
          <Button type="button" onClick={() => sendFunds(brief.id)}>
            Send funds to creator
          </Button>
        ) : null}
        {brief.status === "completed" ? (
          <p className="text-sm">Funds sent. Escrow released.</p>
        ) : null}
      </section>
      </aside>
      </div>
    </div>
  );
}
