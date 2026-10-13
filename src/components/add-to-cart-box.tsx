"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function AddToCartBox({ product }: { product: Product }) {
  const { addItem, qtyOf, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const alreadyInCart = qtyOf(product.slug);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid h-12 w-11 place-items-center text-stone-600 transition hover:bg-stone-50"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-bold text-stone-900">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            aria-label="Increase quantity"
            className="grid h-12 w-11 place-items-center text-stone-600 transition hover:bg-stone-50"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            addItem(product.slug, qty);
            setQty(1);
          }}
          className="flex h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-5 text-sm font-bold text-white shadow-glow transition hover:brightness-105"
        >
          Add to cart
        </button>
      </div>

      {alreadyInCart > 0 && (
        <button
          type="button"
          onClick={openCart}
          className="mt-3 text-sm font-medium text-stone-500 underline decoration-dotted underline-offset-4 hover:text-stone-800"
        >
          {alreadyInCart} already in your cart — view cart
        </button>
      )}
    </div>
  );
}
