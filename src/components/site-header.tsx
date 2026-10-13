"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { SearchBox } from "./search-box";

export function SiteHeader() {
  const { count, toggleCart } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-stone-950/95 backdrop-blur supports-[backdrop-filter]:bg-stone-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 text-lg shadow-glow">
            🛍️
          </span>
          <span className="hidden flex-col leading-none min-[420px]:flex">
            <span className="text-sm font-bold tracking-tight text-white">Mock Mart</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
              Demo store
            </span>
          </span>
        </Link>

        <div className="flex-1">
          <SearchBox variant="desktop" />
        </div>

        <button
          type="button"
          onClick={toggleCart}
          aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          className="group relative flex h-11 shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
        >
          <span aria-hidden>🛒</span>
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span
              className={`grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 px-1 text-[11px] font-bold text-white ${
                bump ? "animate-bump" : ""
              }`}
            >
              {count}
            </span>
          )}
        </button>
      </div>

      <div className="border-t border-white/10 px-5 py-2.5 sm:hidden">
        <SearchBox variant="mobile" />
      </div>
    </header>
  );
}
