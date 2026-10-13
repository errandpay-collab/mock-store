import { GATEWAY_URL } from "./config";

/*
  Server-side payment check for the order page (import only from server code).

  The hosted checkout sends the shopper back to /order/[id]?reference=…&status=…
  &gatewayReference=…, but anyone can type those query values. So the store
  never trusts `status` from the URL: it asks the checkout's status endpoint,
  which confirms the payment with the ErrandPay gateway (/verify), and only a
  confirmed "successful" counts as paid.
*/

export type VerifiedStatus = "successful" | "pending" | "failed" | "expired" | "cancelled" | "unknown";

export interface VerifiedPayment {
  status: VerifiedStatus;
  /** True only when the gateway itself confirmed the payment. */
  verified: boolean;
  paymentMethod?: "card" | "bank_transfer";
  amount?: number;
  paidAt?: string;
  gatewayReference?: string;
}

const REFERENCE = /^[A-Za-z0-9-]{1,60}$/;
const GATEWAY_REFERENCE = /^[A-Za-z0-9-]{1,100}$/;
const KNOWN: VerifiedStatus[] = ["successful", "pending", "failed", "expired", "cancelled"];

export async function verifyPayment(reference?: string, gatewayReference?: string, urlStatus?: string): Promise<VerifiedPayment> {
  // No payment attempt was made (e.g. the shopper cancelled before paying): nothing to verify.
  if (!reference || !REFERENCE.test(reference) || !gatewayReference || !GATEWAY_REFERENCE.test(gatewayReference)) {
    const status = urlStatus === "cancelled" ? "cancelled" : "unknown";
    return { status, verified: false };
  }

  try {
    const url = new URL(`/api/checkout/${encodeURIComponent(reference)}/status`, GATEWAY_URL);
    url.searchParams.set("gatewayReference", gatewayReference);
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
    if (!response.ok) return { status: "unknown", verified: false, gatewayReference };

    const { data } = (await response.json()) as {
      data?: { status?: string; paymentMethod?: "card" | "bank_transfer"; amount?: number; paidAt?: string };
    };
    const status = KNOWN.includes(data?.status as VerifiedStatus) ? (data!.status as VerifiedStatus) : "unknown";
    return {
      status,
      verified: status !== "unknown",
      paymentMethod: data?.paymentMethod,
      amount: data?.amount,
      paidAt: data?.paidAt,
      gatewayReference,
    };
  } catch {
    return { status: "unknown", verified: false, gatewayReference };
  }
}
