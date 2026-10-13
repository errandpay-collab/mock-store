"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCategories, searchProducts, type Category, type Product } from "@/lib/products";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  const categories = useMemo(() => getCategories(products), [products]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category");
  const [active, setActive] = useState<Category | "All">(
    () => (categories.find((c) => c === categoryParam) as Category | undefined) ?? "All"
  );

  const filtered = useMemo(() => {
    const byCategory = active === "All" ? products : products.filter((p) => p.category === active);
    return searchProducts(byCategory, query);
  }, [active, products, query]);

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        {(["All", ...categories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active === cat
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {query && (
        <p className="mt-4 text-sm text-stone-500">
          {filtered.length > 0 ? (
            <>
              {filtered.length} result{filtered.length === 1 ? "" : "s"} for{" "}
              <span className="font-semibold text-stone-800">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            <>
              No results for <span className="font-semibold text-stone-800">&ldquo;{query}&rdquo;</span>
            </>
          )}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-2 rounded-3xl border border-dashed border-stone-300 py-16 text-center">
          <span className="text-3xl">🔍</span>
          <p className="font-semibold text-stone-700">Nothing matches that search</p>
          <p className="max-w-xs text-sm text-stone-500">
            Try a different keyword, or browse by category above.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <div
              key={product.slug}
              className="animate-slide-up"
              style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
