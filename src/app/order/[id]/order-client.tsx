"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/format";
import { readPendingOrder, type PendingOrder } from "@/lib/pending-order";
import type { VerifiedPayment } from "@/lib/payment-status";
import { CheckoutSteps } from "@/components/checkout-steps";
import { Confetti } from "@/components/confetti";

const TRACKER_STEPS = [
  { icon: "✅", label: "Confirmed" },
  { icon: "📦", label: "Preparing" },
  { icon: "🚚", label: "Delivered" },
] as const;

function estimatedDelivery() {
  const d = new Date();
  d.setDate(d.getDate() + 4);
  return d.toLocaleDateString("en-NG", { weekday: "long", month: "long", day: "numeric" });
}

export function OrderClient({ id, payment }: { id: string; payment: VerifiedPayment }) {
  const { clear, hydrated } = useCart();
  const [order, setOrder] = useState<PendingOrder | null | undefined>(undefined);
  const cleared = useRef(false);

  // Read the order snapshot as soon as we know the id — this doesn't need to
  // wait on the cart at all, it's a separate localStorage key.
  useEffect(() => {
    setOrder(readPendingOrder(id));
  }, [id]);

  // Paid means: the gateway confirmed it (server-side, see payment-status.ts) AND,
  // when both are known, the amount it recorded equals this order's total.
  const amountMatches =
    payment.amount === undefined || !order || Math.round(payment.amount * 100) === Math.round(order.amount * 100);
  const paid = payment.verified && payment.status === "successful" && amountMatches;

  // Clear the cart only for a confirmed payment, and only once the cart itself has
  // finished loading from localStorage. Doing this before `hydrated` is a race:
  // CartProvider's own hydration effect can fire afterward and silently restore
  // the pre-checkout cart from storage, overwriting the clear.
  useEffect(() => {
    if (paid && order && hydrated && !cleared.current) {
      cleared.current = true;
      clear();
    }
  }, [paid, order, hydrated, clear]);

  if (order === undefined) {
    return <main className="min-h-screen" />;
  }

  if (!paid) {
    return <PaymentNotConfirmed id={id} payment={payment} amountMismatch={!amountMatches} />;
  }

  // Fallback for a direct visit with no snapshot on this browser.
  if (!order) {
    return (
      <main className="mx-auto grid min-h-[70vh] max-w-lg place-items-center px-5 text-center">
        <div className="animate-pop-in rounded-3xl border border-stone-200 bg-white p-8 shadow-card">
          <span className="text-4xl">✅</span>
          <h1 className="mt-4 text-xl font-bold text-stone-900">You&apos;re back at Mock Mart</h1>
          <p className="mt-2 text-sm leading-6 text-stone-500">
            ErrandPay sent you back here after checkout for order{" "}
            <span className="font-medium text-stone-700">{id}</span>. We couldn&apos;t find the order
            details on this browser.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[80vh] max-w-2xl px-5 py-10 sm:py-16">
      <div className="mb-6 hidden justify-center sm:flex">
        <CheckoutSteps current={3} />
      </div>

      <div className="animate-pop-in relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 text-center shadow-card sm:p-10">
        <Confetti />

        <div className="relative mx-auto grid h-16 w-16 place-items-center">
          <span className="animate-ring-pulse absolute inset-0 rounded-full bg-emerald-400/40" />
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-3xl text-white shadow-glow">
            ✅
          </div>
        </div>

        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-stone-900">Order confirmed!</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          Thanks{order.shipping?.fullName ? `, ${order.shipping.fullName.split(" ")[0]}` : ""} — a receipt
          was sent to <span className="font-medium text-stone-700">{order.email}</span>.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-700">● Paid</span>
          <span className="rounded-full bg-stone-100 px-3 py-1 font-medium text-stone-500">
            Order {order.reference}
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1 font-medium text-stone-500">
            {new Date(order.createdAt).toLocaleString("en-NG", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>

        {/* What happens next */}
        <div className="mt-8 flex items-center justify-center">
          {TRACKER_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full text-sm ${
                    i === 0 ? "bg-emerald-500 text-white" : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {step.icon}
                </span>
                <span className={`text-[11px] font-semibold ${i === 0 ? "text-stone-900" : "text-stone-400"}`}>
                  {step.label}
                </span>
              </div>
              {i < TRACKER_STEPS.length - 1 && (
                <span className="mx-2 h-px w-10 bg-stone-200 sm:w-16" aria-hidden />
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-stone-400">Estimated delivery: {estimatedDelivery()}</p>

        <div className="mt-8 rounded-2xl bg-stone-50 p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Items</p>
          <ul className="mt-2">
            {order.lines.map((line) => (
              <li key={line.slug} className="flex items-center gap-3 py-1.5 text-sm">
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                  <Image src={line.image} alt="" fill sizes="40px" className="object-cover" />
                </span>
                <span className="flex-1 text-stone-700">
                  {line.name} <span className="text-stone-400">&times;{line.qty}</span>
                </span>
                <span className="font-medium text-stone-900">{formatNaira(line.price * line.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 space-y-1 border-t border-stone-200 pt-3 text-sm">
            {typeof order.subtotal === "number" && (
              <>
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="text-stone-900">{formatNaira(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  <span className="text-stone-900">
                    {(order.shippingFee ?? 0) === 0 ? "Free" : formatNaira(order.shippingFee)}
                  </span>
                </div>
              </>
            )}
            <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-bold text-stone-900">
              <span>Total paid</span>
              <span>{formatNaira(order.amount)}</span>
            </div>
          </div>

          {order.shipping?.address && (
            <div className="mt-4 border-t border-stone-200 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Shipping to</p>
              <p className="mt-1 text-sm text-stone-700">
                {order.shipping.fullName}
                <br />
                {order.shipping.address}, {order.shipping.city}
                <br />
                {order.shipping.phone}
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-xs leading-5 text-stone-400">
          Payment confirmed with ErrandPay
          {payment.paymentMethod ? ` · ${payment.paymentMethod === "bank_transfer" ? "Bank transfer" : "Card"}` : ""}
          {payment.gatewayReference ? ` · ${payment.gatewayReference}` : ""}
        </p>

        <div className="no-print mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Continue shopping
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-stone-200 px-5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            🖨️ Print receipt
          </button>
        </div>
      </div>
    </main>
  );
}

const NOT_CONFIRMED = {
  pending: {
    icon: "⏳",
    title: "Confirming your payment",
    body: "Your payment is still being confirmed. Bank transfers can take a few minutes. Your cart is saved.",
    action: "check",
  },
  failed: {
    icon: "⚠️",
    title: "Payment didn't go through",
    body: "Your bank declined or the payment failed. You haven't been charged for this order. Your cart is saved.",
    action: "retry",
  },
  expired: {
    icon: "⌛",
    title: "Payment window expired",
    body: "The payment wasn't completed in time. Your cart is saved, so you can try again.",
    action: "retry",
  },
  cancelled: {
    icon: "↩️",
    title: "Payment cancelled",
    body: "You left the checkout before paying. Your cart is saved, so you can pick up where you left off.",
    action: "retry",
  },
  unknown: {
    icon: "❔",
    title: "We couldn't confirm your payment yet",
    body: "We haven't received a confirmed payment for this order. If you paid, check again in a moment.",
    action: "check",
  },
} as const;

function PaymentNotConfirmed({
  id,
  payment,
  amountMismatch,
}: {
  id: string;
  payment: VerifiedPayment;
  amountMismatch: boolean;
}) {
  const view = amountMismatch
    ? {
        icon: "⚠️",
        title: "Payment amount doesn't match",
        body: "The amount paid is different from this order's total, so the order hasn't been confirmed. Please contact support.",
        action: "none" as const,
      }
    : NOT_CONFIRMED[payment.status === "successful" ? "unknown" : payment.status];

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-lg place-items-center px-5 text-center">
      <div className="animate-pop-in w-full rounded-3xl border border-stone-200 bg-white p-8 shadow-card">
        <span className="text-4xl" aria-hidden>
          {view.icon}
        </span>
        <h1 className="mt-4 text-xl font-bold text-stone-900">{view.title}</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">{view.body}</p>
        <p className="mt-4 text-xs text-stone-400">
          Order {id}
          {payment.gatewayReference ? ` · ErrandPay ref ${payment.gatewayReference}` : ""}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {view.action === "retry" && (
            <Link
              href="/checkout"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-5 text-sm font-bold text-white shadow-glow transition hover:brightness-105"
            >
              Try again
            </Link>
          )}
          {view.action === "check" && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Check again
            </button>
          )}
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-stone-200 px-5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Back to products
          </Link>
        </div>
      </div>
    </main>
  );
}
