"use client";

import { Label } from "@/components/ui/label";
import { useCategories } from "@/lib/category-store";
import { nicheLabel } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import { cn } from "@/lib/utils";

export function CategorySelect({
  id,
  label,
  value,
  onChange,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const locale = useLocale();
  const categories = useCategories().filter((category) => category.active);
  const options = value && !categories.some((category) => category.name === value)
    ? [{ id: `legacy-${value}`, name: value }, ...categories]
    : categories;

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm",
          "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        )}
      >
        <option value="">{locale === "am" ? "ምድብ ይምረጡ" : "Choose a category"}</option>
        {options.map((category) => (
          <option key={category.id} value={category.name}>
            {nicheLabel(locale, category.name, categories)}
          </option>
        ))}
      </select>
    </div>
  );
}
