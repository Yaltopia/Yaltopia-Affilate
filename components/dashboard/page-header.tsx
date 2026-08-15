export function PageHeader({
  title,
  support,
}: {
  title: string;
  support?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
      {support ? <p className="text-sm text-muted-foreground">{support}</p> : null}
    </div>
  );
}
