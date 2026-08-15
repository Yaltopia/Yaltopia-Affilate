"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

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
      <div className="flex flex-col gap-4 rounded-3xl bg-card p-6 ring-1 ring-foreground/10">
        <h2 className="font-heading text-2xl font-bold">Submitted for Admin review</h2>
        <p className="text-muted-foreground">
          Files stay on this device for now. When Firebase is wired they go to private{" "}
          <span className="font-mono text-sm">kyc/{"{you}"}/</span> storage. You cannot go live
          until Admin approves KYC.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button render={<Link href={role === "advertiser" ? "/app" : "/studio"} />}>
            {role === "advertiser" ? "Open dashboard" : "Open studio"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      <Button type="submit" disabled={!complete}>
        Submit KYC for review
      </Button>
      {!complete ? (
        <p className="text-sm text-muted-foreground">
          Add every required file before you can submit.
        </p>
      ) : null}
    </form>
  );
}
