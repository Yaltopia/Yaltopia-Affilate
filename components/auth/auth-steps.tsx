"use client";

import { cn } from "@/lib/utils";

export function AuthSteps({
  steps,
  current,
  onBack,
}: {
  steps: string[];
  current: number;
  onBack?: (index: number) => void;
}) {
  return (
    <ol className="mb-6 flex items-start gap-1">
      {steps.map((label, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={label} className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={!done}
                onClick={() => onBack?.(index)}
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  active && "bg-foreground text-background",
                  done && "bg-primary text-primary-foreground",
                  !active && !done && "bg-secondary text-muted-foreground",
                )}
              >
                {index + 1}
              </button>
              {index < steps.length - 1 ? (
                <span className={cn("h-px flex-1", done ? "bg-primary" : "bg-secondary")} />
              ) : null}
            </div>
            <p
              className={cn(
                "truncate text-[11px] leading-tight",
                active ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
