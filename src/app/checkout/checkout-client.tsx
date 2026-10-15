"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/format";
import { savePendingOrder } from "@/lib/pending-order";
import { getShippingFee, amountToFreeShipping } from "@/lib/shipping";
import { CheckoutSteps } from "@/components/checkout-steps";

interface FormState {
  email: string;
  fullName: string;
  address: string;
  city: string;
  phone: string;
}

const EMPTY_FORM: FormState = { email: "shopper@example.com", fullName: "", address: "", city: "", phone: "" };

export function CheckoutClient() {
  const { lines, subtotal, setQty, removeItem } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  // Display only: the store's server recalculates the amount from its own catalog.
  const shippingFee = getShippingFee(subtotal);
  const total = subtotal + shippingFee;
  const remainingForFreeShipping = amountToFreeShipping(subtotal);

  function field(name: keyof FormState) {
    return {
      value: form[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, [name]: e.target.value }));
        setErrors((er) => ({ ...er, [name]: false }));
      },
    };
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (lines.length === 0 || submitting) return;
    const required: (keyof FormState)[] = ["email", "fullName", "address", "city", "phone"];
    const nextErrors: Partial<Record<keyof FormState, boolean>> = {};
    for (const key of required) {
      if (!form[key].trim()) nextErrors[key] = true;
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      document.getElementById(`field-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }

    setSubmitting(true);
    setPayError(null);
    try {
      // The store's server prices the cart and calls ErrandPay's /gateway/initialize.
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, lines: lines.map((l) => ({ slug: l.product.slug, qty: l.qty })) }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.checkoutUrl) {
        throw new Error(result?.message ?? "We couldn't start the payment. Please try again.");
      }

      // Snapshot the order so /order/[id] can show what was bought after the round trip.
      savePendingOrder({
        id: result.orderId,
        reference: `EPY-${result.orderId}`,
        email: form.email,
        shipping: { fullName: form.fullName, address: form.address, city: form.city, phone: form.phone },
        subtotal: result.subtotal,
        shippingFee: result.shippingFee,
        amount: result.amount,
        createdAt: new Date().toISOString(),
        lines: lines.map((l) => ({
          slug: l.product.slug,
          name: l.product.name,
          image: l.product.images[0],
          qty: l.qty,
          price: l.product.price,
        })),
      });

      window.location.href = result.checkoutUrl;
    } catch (error) {
      setPayError(error instanceof Error ? error.message : "We couldn't start the payment. Please try again.");
      setSubmitting(false);
    }
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto grid min-h-[70vh] max-w-lg place-items-center px-5 text-center">
        <div>
          <span className="text-4xl">🛍️</span>
          <h1 className="mt-4 text-xl font-bold text-stone-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-stone-500">
            Add a few products before heading to checkout.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
      <Link href="/" className="text-sm font-medium text-stone-500 hover:text-stone-900">
        &larr; Back to products
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Checkout</h1>
        <CheckoutSteps current={2} />
      </div>

      <form onSubmit={handlePay} className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]" noValidate>
        <div className="space-y-6">
          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-bold text-stone-900">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-stone-900 text-xs text-white">
                1
              </span>
              Contact
            </h2>
            <div className="mt-4">
              <label htmlFor="field-email" className="mb-1.5 block text-sm font-medium text-stone-600">
                Email
              </label>
              <input
                id="field-email"
                type="email"
                placeholder="you@example.com"
                {...field("email")}
                className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:ring-4 ${
                  errors.email
                    ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
                    : "border-stone-200 focus:border-amber-500 focus:ring-amber-500/10"
                }`}
              />
              {errors.email && <p className="mt-1.5 text-xs font-medium text-rose-500">Email is required.</p>}
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-bold text-stone-900">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-stone-900 text-xs text-white">
                2
              </span>
              Shipping address
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="field-fullName" className="mb-1.5 block text-sm font-medium text-stone-600">
                  Full name
                </label>
                <input
                  id="field-fullName"
                  type="text"
                  placeholder="Ada Obi"
                  {...field("fullName")}
                  className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:ring-4 ${
                    errors.fullName
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-stone-200 focus:border-amber-500 focus:ring-amber-500/10"
                  }`}
                />
                {errors.fullName && <p className="mt-1.5 text-xs font-medium text-rose-500">Required.</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="field-address" className="mb-1.5 block text-sm font-medium text-stone-600">
                  Address
                </label>
                <input
                  id="field-address"
                  type="text"
                  placeholder="12 Admiralty Way"
                  {...field("address")}
                  className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:ring-4 ${
                    errors.address
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-stone-200 focus:border-amber-500 focus:ring-amber-500/10"
                  }`}
                />
                {errors.address && <p className="mt-1.5 text-xs font-medium text-rose-500">Required.</p>}
              </div>

              <div>
                <label htmlFor="field-city" className="mb-1.5 block text-sm font-medium text-stone-600">
                  City
                </label>
                <input
                  id="field-city"
                  type="text"
                  placeholder="Lagos"
                  {...field("city")}
                  className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:ring-4 ${
                    errors.city
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-stone-200 focus:border-amber-500 focus:ring-amber-500/10"
                  }`}
                />
                {errors.city && <p className="mt-1.5 text-xs font-medium text-rose-500">Required.</p>}
              </div>

              <div>
                <label htmlFor="field-phone" className="mb-1.5 block text-sm font-medium text-stone-600">
                  Phone
                </label>
                <input
                  id="field-phone"
                  type="tel"
                  placeholder="080X XXX XXXX"
                  {...field("phone")}
                  className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:ring-4 ${
                    errors.phone
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-stone-200 focus:border-amber-500 focus:ring-amber-500/10"
                  }`}
                />
                {errors.phone && <p className="mt-1.5 text-xs font-medium text-rose-500">Required.</p>}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-bold text-stone-900">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-stone-900 text-xs text-white">
                3
              </span>
              Payment
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-500">
              You&apos;ll choose card or bank transfer on the next screen, handled securely by the
              ErrandPay hosted checkout — Mock Mart never sees your card details.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-600">
                💳 Card
              </span>
              <span className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-600">
                🏦 Bank transfer
              </span>
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-card">
            <h2 className="font-bold text-stone-900">Order summary</h2>

            <ul className="mt-4 max-h-72 overflow-y-auto pr-1">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.slug}
                  className="flex items-center gap-3 border-b border-stone-100 py-3 first:pt-0 last:border-0 last:pb-0"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                    <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-stone-900 px-1 text-[10px] font-bold text-white">
                      {qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-stone-900">{product.name}</p>
                    <div className="mt-1 inline-flex items-center rounded-lg border border-stone-200">
                      <button
                        type="button"
                        onClick={() => setQty(product.slug, qty - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="grid h-6 w-6 place-items-center text-stone-500 transition hover:bg-stone-50"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-xs font-semibold text-stone-900">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(product.slug, qty + 1)}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="grid h-6 w-6 place-items-center text-stone-500 transition hover:bg-stone-50"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(product.slug)}
                        aria-label={`Remove ${product.name}`}
                        className="grid h-6 w-6 place-items-center text-stone-400 transition hover:text-rose-500"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-stone-900">
                    {formatNaira(product.price * qty)}
                  </p>
                </li>
              ))}
            </ul>

            {remainingForFreeShipping > 0 ? (
              <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                Add {formatNaira(remainingForFreeShipping)} more for free shipping.
              </p>
            ) : (
              <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                🎉 You&apos;ve unlocked free shipping.
              </p>
            )}

            <div className="mt-4 space-y-2 border-t border-stone-100 pt-4 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="text-stone-900">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Shipping</span>
                <span className="text-stone-900">
                  {shippingFee === 0 ? "Free" : formatNaira(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-stone-100 pt-2 text-base font-bold text-stone-900">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-5 text-sm font-bold text-white shadow-glow transition hover:brightness-105 disabled:cursor-wait disabled:opacity-80"
            >
              {submitting ? "Starting secure payment…" : "Pay with ErrandPay"}
            </button>

            {payError && (
              <p role="alert" className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-center text-xs font-medium text-rose-600">
                {payError}
              </p>
            )}

            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-stone-400">
              <span aria-hidden>🔒</span> Secured by ErrandPay
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}
