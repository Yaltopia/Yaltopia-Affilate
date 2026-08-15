"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import { CreatePanel } from "@/components/dashboard/create-panel";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  ADVERTISER_KYC_DOCS,
  CREATOR_KYC_DOCS,
  type KycDocumentKind,
} from "@/packages/contracts";

import { KycUpload } from "./kyc-upload";

const advertiserHints: Record<KycDocumentKind, string> = {
  tin_certificate: "Upload a clear scan or photo of the TIN certificate.",
  national_id: "Front of the national ID. PDF or image.",
  business_license: "Current Ethiopian business license.",
  liveness_photo: "",
  page_analytics: "",
  admin_view: "",
};

const creatorHints: Record<KycDocumentKind, string> = {
  tin_certificate: "",
  national_id: "Front of the national ID. PDF or image.",
  liveness_photo: "Use the camera. Face the light. No filters.",
  page_analytics: "Screenshot of page analytics for the account you will promote from.",
  admin_view: "Screenshot of the admin / settings view that proves you own the page.",
  business_license: "",
};

type KycFormProps = {
  role: "advertiser" | "creator";
};

export function KycForm({ role }: KycFormProps) {
  const kinds = role === "advertiser" ? ADVERTISER_KYC_DOCS : CREATOR_KYC_DOCS;
  const hints = role === "advertiser" ? advertiserHints : creatorHints;
  const [files, setFiles] = useState<Partial<Record<KycDocumentKind, File>>>({});
  const [submitted, setSubmitted] = useState(false);

  const complete = useMemo(
    () => kinds.every((kind) => Boolean(files[kind])),
    [files, kinds],
  );
  const done = kinds.filter((kind) => files[kind]).length;

  function handleFile(kind: KycDocumentKind, file: File) {
    setFiles((current) => ({ ...current, [kind]: file }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <CreatePanel
        kicker="KYC"
        title="Submitted for Admin review"
        support="Files stay on this device for now. When Convex or Firebase is live they go to private storage. You cannot go live until Admin approves KYC."
        footer={
          <Button render={<Link href={role === "advertiser" ? "/app" : "/studio"} />}>
            {role === "advertiser" ? "Open dashboard" : "Open studio"}
          </Button>
        }
      >
        <p className="text-sm text-muted-foreground">
          Storage path is <span className="font-mono text-xs">kyc/{"{you}"}/</span>. Never share those files in issues.
        </p>
      </CreatePanel>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-4">
      <PageHeader
        title="KYC"
        support={
          role === "advertiser"
            ? "TIN certificate, national ID, and business license. Admin reviews before you go live."
            : "National ID, a live photo, and ownership screenshots. Not part of the package form."
        }
      />
      <CreatePanel
        kicker={`${String(done).padStart(2, "0")} / ${String(kinds.length).padStart(2, "0")}`}
        title="Required files"
        support="Every slot is required. Images or PDF."
        footer={
          <>
            <p className="text-xs text-muted-foreground">
              {complete ? "Ready to send." : "Add every required file before you can submit."}
            </p>
            <Button type="submit" disabled={!complete}>
              Submit KYC for review
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          {kinds.map((kind) => (
            <KycUpload
              key={kind}
              kind={kind}
              hint={hints[kind]}
              capture={kind === "liveness_photo"}
              fileName={files[kind]?.name}
              onFile={handleFile}
            />
          ))}
        </div>
      </CreatePanel>
    </form>
  );
}
