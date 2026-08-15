"use client";

import { useRef } from "react";
import { Camera, Check, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KYC_LABELS, type KycDocumentKind } from "@/packages/contracts";

type KycUploadProps = {
  kind: KycDocumentKind;
  hint: string;
  capture?: boolean;
  fileName?: string;
  onFile: (kind: KycDocumentKind, file: File) => void;
};

export function KycUpload({ kind, hint, capture, fileName, onFile }: KycUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2 rounded-md bg-card p-4 ring-1 ring-foreground/10">
      <Label htmlFor={`kyc-${kind}`}>{KYC_LABELS[kind]}</Label>
      <p className="text-sm text-muted-foreground">{hint}</p>
      <input
        id={`kyc-${kind}`}
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        capture={capture ? "user" : undefined}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFile(kind, file);
        }}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          {capture ? <Camera data-icon="inline-start" /> : <Upload data-icon="inline-start" />}
          {capture ? "Take picture" : "Upload"}
        </Button>
        {fileName ? (
          <p className="flex items-center gap-1 text-sm text-foreground">
            <Check className="size-4 text-primary" aria-hidden />
            {fileName}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Required</p>
        )}
      </div>
    </div>
  );
}
