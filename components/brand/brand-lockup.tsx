import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function BrandLockup({
  tone = "light",
  href = "/",
  size = "md",
}: {
  tone?: "dark" | "light";
  href?: string;
  size?: "sm" | "md";
}) {
  const mark = size === "sm" ? 32 : 40;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2",
        tone === "dark" ? "text-background" : "text-foreground",
      )}
    >
      <Image
        src="/yaltopia-tech-logo.svg"
        alt="Yaltopia Tech"
        width={mark}
        height={mark}
        unoptimized
        priority
        className={cn("object-contain", tone === "dark" && "invert")}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-medium tracking-wide uppercase",
            size === "sm" ? "text-[9px]" : "text-[10px]",
            tone === "dark" ? "text-background/70" : "text-muted-foreground",
          )}
        >
          Yaltopia Tech
        </span>
        <span
          className={cn(
            "font-heading font-semibold tracking-tight",
            size === "sm" ? "text-sm" : "text-base",
          )}
        >
          Affiliate
        </span>
      </span>
    </Link>
  );
}
