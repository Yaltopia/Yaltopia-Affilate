import Image from "next/image";

export function PageLoader({ label = "Loading Affiliate" }: { label?: string }) {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <Image
        src="/yaltopia-tech-logo.svg"
        alt=""
        width={56}
        height={56}
        unoptimized
        className="animate-pulse object-contain"
      />
      <p className="text-sm text-muted-foreground">{label}</p>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function CreatorCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8">
      <div className="aspect-4/5 animate-pulse bg-secondary" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-3 w-24 animate-pulse rounded bg-secondary" />
        <div className="h-3 w-full animate-pulse rounded bg-secondary" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-secondary" />
        <div className="mt-1 h-8 w-full animate-pulse rounded-lg bg-secondary" />
      </div>
    </div>
  );
}

export function CreatorGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <CreatorCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

export function DetailSkeleton() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-3 py-5 md:px-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
      <div className="aspect-4/3 animate-pulse rounded-2xl bg-secondary lg:aspect-4/5" />
      <div className="flex flex-col gap-3 rounded-2xl bg-card p-3 ring-1 ring-foreground/8">
        <div className="h-6 w-40 animate-pulse rounded bg-secondary" />
        <div className="h-16 animate-pulse rounded-xl bg-secondary" />
        <div className="h-16 animate-pulse rounded-xl bg-secondary" />
        <div className="h-16 animate-pulse rounded-xl bg-secondary" />
      </div>
    </div>
  );
}
