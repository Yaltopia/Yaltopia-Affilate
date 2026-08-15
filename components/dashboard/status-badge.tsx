import { BadgeCheck, Clock, MessageCircle, CircleDashed, AlertTriangle, Wallet, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { CollaborationStatus } from "@/packages/contracts";

const labels: Record<CollaborationStatus, string> = {
  requested: "Requested",
  countered: "Countered",
  accepted: "Awaiting deposit",
  rejected: "Rejected",
  expired: "Expired",
  funded: "Funds secured",
  sample_review: "Sample review",
  posted: "Posted",
  release_requested: "Release asked",
  in_progress: "In progress",
  submitted: "On review",
  completed: "Paid",
  disputed: "Disputed",
};

export function StatusBadge({ status }: { status: CollaborationStatus }) {
  const label = labels[status];

  if (status === "completed") {
    return (
      <Badge variant="default">
        <BadgeCheck data-icon="inline-start" />
        {label}
      </Badge>
    );
  }

  if (status === "funded" || status === "accepted") {
    return (
      <Badge variant="secondary">
        <Wallet data-icon="inline-start" />
        {label}
      </Badge>
    );
  }

  if (status === "posted" || status === "release_requested") {
    return (
      <Badge variant="outline">
        <Play data-icon="inline-start" />
        {label}
      </Badge>
    );
  }

  if (status === "in_progress" || status === "sample_review") {
    return (
      <Badge variant="secondary">
        <Clock data-icon="inline-start" />
        {label}
      </Badge>
    );
  }

  if (status === "submitted") {
    return (
      <Badge variant="outline">
        <BadgeCheck data-icon="inline-start" />
        {label}
      </Badge>
    );
  }

  if (status === "disputed" || status === "rejected" || status === "expired") {
    return (
      <Badge variant="destructive">
        <AlertTriangle data-icon="inline-start" />
        {label}
      </Badge>
    );
  }

  if (status === "countered") {
    return (
      <Badge variant="secondary">
        <MessageCircle data-icon="inline-start" />
        {label}
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <CircleDashed data-icon="inline-start" />
      {label}
    </Badge>
  );
}
