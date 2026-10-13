export function ProductGridSkeleton() {
  return (
    <div>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-24 shrink-0 animate-pulse rounded-full bg-stone-200" />
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-3xl border border-stone-200/70 bg-white">
            <div className="aspect-[4/3] animate-pulse bg-stone-200" />
            <div className="space-y-2 p-5">
              <div className="h-3 w-16 animate-pulse rounded bg-stone-200" />
              <div className="h-4 w-32 animate-pulse rounded bg-stone-200" />
              <div className="h-3 w-full animate-pulse rounded bg-stone-200" />
              <div className="h-9 w-full animate-pulse rounded-xl bg-stone-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
