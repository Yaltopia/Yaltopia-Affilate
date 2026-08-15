"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export function DropSelect({
  label,
  summary,
  placeholder,
  align = "start",
  className,
  triggerLabel,
  children,
}: {
  label?: string;
  summary: string;
  placeholder?: boolean;
  align?: "start" | "end";
  className?: string;
  triggerLabel?: string;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative flex flex-col gap-1.5", className)}>
      {label ? <p className="text-sm font-medium">{label}</p> : null}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="listbox"
        aria-label={triggerLabel}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 text-sm",
          "outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          open && "bg-muted",
        )}
      >
        <span className={cn("min-w-0 truncate text-left", placeholder && "text-muted-foreground")}>
          {summary}
        </span>
        <ChevronDown className={cn("size-4 shrink-0 opacity-60 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open ? (
        <div
          id={panelId}
          role="listbox"
          className={cn(
            "absolute top-full z-50 mt-1.5 max-h-72 w-full min-w-full overflow-y-auto rounded-xl bg-popover p-1.5 shadow-md ring-1 ring-foreground/10",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {children(() => setOpen(false))}
        </div>
      ) : null}
    </div>
  );
}
