import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function CreatePanel({
  kicker,
  title,
  support,
  children,
  footer,
  className,
}: {
  kicker?: string;
  title: string;
  support?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-md bg-card ring-1 ring-foreground/10",
        className,
      )}
    >
      <header className="flex flex-col gap-1 border-b border-border px-5 py-4">
        {kicker ? (
          <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {kicker}
          </p>
        ) : null}
        <h2 className="font-heading text-lg font-semibold tracking-tight">{title}</h2>
        {support ? <p className="max-w-2xl text-sm text-muted-foreground">{support}</p> : null}
      </header>
      <div className="flex flex-col gap-5 px-5 py-5">{children}</div>
      {footer ? (
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-secondary/40 px-5 py-3">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}

export function FieldRow({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
