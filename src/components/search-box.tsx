"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formatNaira } from "@/lib/format";
import { PRODUCTS, searchProducts } from "@/lib/products";

export function SearchBox({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = value.trim() ? searchProducts(PRODUCTS, value).slice(0, 5) : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goSearch(q: string) {
    setOpen(false);
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  }

  return (
    <div ref={containerRef} className={`relative ${variant === "desktop" ? "hidden sm:block" : "sm:hidden"} w-full`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goSearch(value);
        }}
      >
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
            🔍
          </span>
          <input
            type="search"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search products…"
            aria-label="Search products"
            className="h-10 w-full rounded-full border border-white/15 bg-white/10 pl-10 pr-4 text-sm text-white placeholder-stone-400 outline-none transition focus:border-amber-400/60 focus:bg-white/15"
          />
        </div>
      </form>

      {open && value.trim() && (
        <div className="absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
          {suggestions.length > 0 ? (
            <>
              <ul>
                {suggestions.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-stone-50"
                    >
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                        <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-stone-900">{p.name}</span>
                        <span className="block text-xs text-stone-400">{p.category}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-stone-700">
                        {formatNaira(p.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => goSearch(value)}
                className="block w-full border-t border-stone-100 px-4 py-2.5 text-left text-sm font-semibold text-amber-600 transition hover:bg-amber-50"
              >
                See all results for &ldquo;{value}&rdquo;
              </button>
            </>
          ) : (
            <p className="px-4 py-4 text-sm text-stone-500">No products match &ldquo;{value}&rdquo;.</p>
          )}
        </div>
      )}
    </div>
  );
}
