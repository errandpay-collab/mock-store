"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/format";
import { amountToFreeShipping, FREE_SHIPPING_THRESHOLD, getShippingFee } from "@/lib/shipping";

const QUICK_LINKS = ["Audio", "Wearables", "Gaming"] as const;

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, setQty, removeItem } = useCart();
  const shippingFee = getShippingFee(subtotal);
  const remaining = amountToFreeShipping(subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-stone-950/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <h2 className="flex items-center gap-2 text-base font-bold text-stone-900">
            <span aria-hidden>🛒</span> Your cart{" "}
            {lines.length > 0 && <span className="text-stone-400">· {lines.length}</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
          >
            ✕
          </button>
        </div>

        {lines.length > 0 && (
          <div className="border-b border-stone-100 bg-stone-50/70 px-5 py-3">
            {remaining > 0 ? (
              <p className="text-xs font-medium text-stone-600">
                Add <span className="font-bold text-amber-600">{formatNaira(remaining)}</span> more for{" "}
                <span className="font-bold">free shipping</span>
              </p>
            ) : (
              <p className="text-xs font-bold text-emerald-600">🎉 You&apos;ve unlocked free shipping!</p>
            )}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="animate-float text-5xl">🛒</span>
            <p className="font-semibold text-stone-800">Your cart is empty</p>
            <p className="text-sm text-stone-500">Add a few things you like — they&apos;ll show up here.</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {QUICK_LINKS.map((cat) => (
                <Link
                  key={cat}
                  href={`/?category=${encodeURIComponent(cat)}`}
                  onClick={closeCart}
                  className="rounded-full border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-600 transition hover:border-stone-300 hover:text-stone-900"
                >
                  {cat}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Browse all products
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-2">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.slug}
                  className="animate-fade-in flex gap-3 border-b border-stone-100 py-4 last:border-0"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeCart}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100"
                  >
                    <Image src={product.images[0]} alt={product.name} fill sizes="64px" className="object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeCart}
                        className="truncate text-sm font-semibold text-stone-900 hover:underline"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(product.slug)}
                        aria-label={`Remove ${product.name}`}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-stone-400 transition hover:bg-rose-50 hover:text-rose-500"
                      >
                        <span aria-hidden>🗑</span>
                      </button>
                    </div>
                    <p className="mt-0.5 text-sm text-stone-500">{formatNaira(product.price)}</p>

                    <div className="mt-2 inline-flex items-center rounded-lg border border-stone-200">
                      <button
                        type="button"
                        onClick={() => setQty(product.slug, qty - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="grid h-8 w-8 place-items-center text-stone-500 transition hover:bg-stone-50"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-sm font-semibold text-stone-900">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(product.slug, qty + 1)}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="grid h-8 w-8 place-items-center text-stone-500 transition hover:bg-stone-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 self-start text-sm font-bold text-stone-900">
                    {formatNaira(product.price * qty)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t border-stone-100 px-5 py-5">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="text-stone-900">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  <span className="text-stone-900">{shippingFee === 0 ? "Free" : formatNaira(shippingFee)}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-stone-100 pt-3">
                <span className="text-sm font-medium text-stone-500">Total</span>
                <span className="text-lg font-bold text-stone-900">{formatNaira(subtotal + shippingFee)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-sm font-bold text-white shadow-glow transition hover:brightness-105"
              >
                Checkout
              </Link>
              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-xs text-stone-400">
                <span aria-hidden>🔒</span> Secure checkout via ErrandPay
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
