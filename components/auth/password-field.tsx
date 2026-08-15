"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { cn } from "@/lib/utils";

export function PasswordField({
  id,
  label,
  value,
  autoComplete,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  autoComplete: string;
  onChange: (value: string) => void;
}) {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          placeholder={label}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 rounded-md bg-secondary/50 px-3 pr-11"
        />
        <button
          type="button"
          className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
          aria-label={visible ? t(locale, "hidePassword") : t(locale, "showPassword")}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}

export const authInputClass = cn("h-11 rounded-md bg-secondary/50 px-3");
