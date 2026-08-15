"use client";

import { Check } from "lucide-react";

import { DropSelect } from "@/components/marketing/drop-select";
import { cn } from "@/lib/utils";

export type MultiSelectOption<T extends string> = {
  value: T;
  label: string;
};

export function MultiSelect<T extends string>({
  label,
  placeholder,
  selectedLabel,
  values,
  options,
  onToggle,
}: {
  label: string;
  placeholder: string;
  selectedLabel: string;
  values: T[];
  options: MultiSelectOption<T>[];
  onToggle: (value: T) => void;
}) {
  const picked = options.filter((option) => values.includes(option.value));
  const summary =
    picked.length === 0
      ? placeholder
      : picked.length === 1
        ? picked[0].label
        : `${picked.length} ${selectedLabel}`;

  return (
    <div className="flex flex-col gap-1.5">
      <DropSelect label={label} summary={summary} placeholder={picked.length === 0}>
        {() => (
          <ul className="flex flex-col gap-0.5">
            {options.map((option) => {
              const checked = values.includes(option.value);
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={checked}
                    onClick={() => onToggle(option.value)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm outline-none",
                      "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent",
                      checked && "bg-accent/70",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-[4px] border",
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background",
                      )}
                      aria-hidden
                    >
                      {checked ? <Check className="size-3" /> : null}
                    </span>
                    <span className="min-w-0 flex-1 leading-snug">{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </DropSelect>
      {picked.length > 1 ? (
        <div className="flex flex-wrap gap-1">
          {picked.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-foreground"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
