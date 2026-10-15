import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { getShippingFee } from "@/lib/shipping";
import { GATEWAY_URL } from "@/lib/config";

/*
  POST /api/pay: the shopper clicks "Pay with ErrandPay".

  Mock Mart is the merchant. Its server prices the cart from its own catalog (the
  browser can't change the amount) and starts the payment with ErrandPay's
  POST /api/v1/gateway/initialize using its own epKey (server-only env:
  ERRANDPAY_BASE_URL, ERRANDPAY_EP_KEY). The shopper is then sent to the hosted
  checkout at {NEXT_PUBLIC_GATEWAY_URL}/pay/{accessCode}.
*/

export const maxDuration = 30;

function summarize(items: { name: string; qty: number }[]) {
  const parts = items.map((item) => `${item.qty} x ${item.name}`);
  const text = parts.length <= 3 ? parts.join(", ") : `${parts.slice(0, 3).join(", ")} and ${parts.length - 3} more`;
  return text.slice(0, 200);
}

export async function POST(request: NextRequest) {
  const baseUrl = process.env.ERRANDPAY_BASE_URL?.trim().replace(/\/+$/, "");
  const epKey = process.env.ERRANDPAY_EP_KEY?.trim();
  if (!baseUrl || !epKey) {
    console.error("[mockmart] ERRANDPAY_BASE_URL / ERRANDPAY_EP_KEY are not configured");
    return NextResponse.json({ message: "Payments aren't set up for this store yet." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as { email?: unknown; lines?: Array<{ slug?: unknown; qty?: unknown }> } | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  const items: { name: string; qty: number; price: number }[] = [];
  for (const line of body?.lines ?? []) {
    const product = typeof line.slug === "string" ? getProduct(line.slug) : undefined;
    const qty = typeof line.qty === "number" && Number.isInteger(line.qty) ? line.qty : 0;
    if (!product || qty < 1 || qty > 99) {
      return NextResponse.json({ message: "Your cart has an item we couldn't find. Refresh and try again." }, { status: 400 });
    }
    items.push({ name: product.name, qty, price: product.price });
  }
  if (items.length === 0) return NextResponse.json({ message: "Your cart is empty." }, { status: 400 });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = getShippingFee(subtotal);
  const amount = subtotal + shippingFee;
  const orderId = `${Date.now().toString(36)}${crypto.randomBytes(4).toString("hex")}`.toUpperCase();
  const merchantReference = `EPY-${orderId}`;

  try {
    // POST /api/v1/gateway/initialize (Postman: Gateway Service > Initialize Payment).
    const response = await fetch(`${baseUrl}/api/v1/gateway/initialize`, {
      method: "POST",
      headers: { "Content-Type": "application/json", epKey },
      body: JSON.stringify({
        Amount: amount,
        Description: summarize(items),
        MerchantReference: merchantReference,
        CustomerEmail: email,
        CallbackUrl: `${request.nextUrl.origin}/order/${orderId}`,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    const result = (await response.json().catch(() => null)) as {
      message?: string;
      data?: { accessCode?: string; authorizationUrl?: string };
      error?: { message?: string };
    } | null;
    console.info(`[mockmart] initialize ${merchantReference} -> HTTP ${response.status} ${result?.message ?? "(no JSON)"}`);

    const accessCode = result?.data?.accessCode;
    if (!response.ok || result?.message !== "Successful" || !accessCode) {
      throw new Error(
        result?.error?.message ??
          (response.status === 404 ? "HTTP 404, endpoint not found on this host" : `HTTP ${response.status}`),
      );
    }

    // The documented authorizationUrl points at checkout.errandpay.com; until that domain
    // serves this checkout, use the configured checkout address with the same accessCode.
    const checkoutUrl = `${GATEWAY_URL.replace(/\/+$/, "")}/pay/${encodeURIComponent(accessCode)}`;
    return NextResponse.json({ orderId, checkoutUrl, subtotal, shippingFee, amount });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    console.error(`[mockmart] initialize failed: ${reason}`);
    const devDetail =
      process.env.NODE_ENV !== "production" ? ` [dev: POST ${baseUrl}/api/v1/gateway/initialize: ${reason}]` : "";
    return NextResponse.json(
      { message: `We couldn't start the payment. Please try again in a moment.${devDetail}` },
      { status: 502 },
    );
  }
}
