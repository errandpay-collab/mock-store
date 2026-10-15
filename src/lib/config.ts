/**
 * The hosted checkout's address (server-only, read at runtime, no rebuild needed).
 * Falls back to the old NEXT_PUBLIC_GATEWAY_URL name, and to localhost only in development.
 */
export function checkoutUrl() {
  const value = (process.env.ERRANDPAY_CHECKOUT_URL || process.env.NEXT_PUBLIC_GATEWAY_URL || "").trim().replace(/\/+$/, "");
  if (value) return value;
  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";
  throw new Error("ERRANDPAY_CHECKOUT_URL is not configured.");
}
