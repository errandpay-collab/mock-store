export function StarRating({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      <span aria-hidden className="text-xs leading-none tracking-tight">
        {"★".repeat(Math.round(rating))}
        <span className="text-stone-300">{"★".repeat(5 - Math.round(rating))}</span>
      </span>
      <span className="text-xs font-medium text-stone-500">
        {rating.toFixed(1)}
        {typeof reviews === "number" ? ` (${reviews})` : null}
      </span>
    </div>
  );
}
