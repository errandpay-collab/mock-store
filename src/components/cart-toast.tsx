"use client";

import { useCart } from "@/lib/cart-context";

export function CartToast() {
  const { toast } = useCart();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
    >
      {toast && (
        <div className="animate-pop-in pointer-events-auto flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-white shadow-2xl">
          <span aria-hidden>✓</span>
          {toast}
        </div>
      )}
    </div>
  );
}
