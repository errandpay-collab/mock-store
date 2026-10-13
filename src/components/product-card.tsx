"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/format";
import type { Product } from "@/lib/products";
import { StarRating } from "./star-rating";

const BADGE_STYLE: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-sky-500",
  Bestseller: "bg-amber-500",
  Sale: "bg-rose-500",
};

export function ProductCard({ product }: { product: Product }) {
  const { qtyOf, addItem, setQty } = useCart();
  const qty = qtyOf(product.slug);
  const href = `/product/${product.slug}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      {product.badge && (
        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${BADGE_STYLE[product.badge]}`}
        >
          {product.badge}
        </span>
      )}
      {product.stock <= 15 && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-stone-950/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
          Only {product.stock} left
        </span>
      )}

      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">
          {product.category}
        </p>
        <Link href={href} className="mt-1 font-semibold text-stone-900 hover:underline">
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-6 text-stone-500">
          {product.description}
        </p>

        <div className="mt-3">
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-lg font-bold text-stone-900">{formatNaira(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-sm text-stone-400 line-through">{formatNaira(product.compareAtPrice)}</p>
          )}
        </div>

        {qty === 0 ? (
          <button
            type="button"
            onClick={() => addItem(product.slug)}
            className="mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-stone-900 text-sm font-semibold text-white transition group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-rose-500"
          >
            Add to cart
          </button>
        ) : (
          <div className="mt-4 flex h-11 w-full items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-1">
            <button
              type="button"
              onClick={() => setQty(product.slug, qty - 1)}
              aria-label={`Decrease quantity of ${product.name}`}
              className="grid h-9 w-9 place-items-center rounded-lg text-stone-600 transition hover:bg-white"
            >
              −
            </button>
            <span className="text-sm font-bold text-stone-900">{qty} in cart</span>
            <button
              type="button"
              onClick={() => setQty(product.slug, qty + 1)}
              aria-label={`Increase quantity of ${product.name}`}
              className="grid h-9 w-9 place-items-center rounded-lg text-stone-600 transition hover:bg-white"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
