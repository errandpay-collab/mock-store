import { checkoutUrl } from "./config";

/*
  Server-side payment check for the order page (import only from server code).

  The hosted checkout sends the shopper back to /order/[id]?reference=<accessCode>
  &status=…&gatewayReference=…, but anyone can type those values. So the store
  never trusts `status` from the URL: it asks the checkout's status endpoint, which
  reads the payment from the ErrandPay gateway (GET /gateway/checkout/{accessCode}),
  and only counts it when the gateway's merchantReference is THIS order's.
*/

export type VerifiedStatus = "successful" | "pending" | "failed" | "expired" | "cancelled" | "unknown";

export interface VerifiedPayment {
  status: VerifiedStatus;
  /** True only when the gateway itself confirmed the payment belongs to this order. */
  verified: boolean;
  paymentMethod?: "card" | "bank_transfer";
  amount?: number;
  paidAt?: string;
  gatewayReference?: string;
}

const ACCESS_CODE = /^[A-Za-z0-9_-]{8,64}$/;
const KNOWN: VerifiedStatus[] = ["successful", "pending", "failed", "expired", "cancelled"];

export async function verifyPayment(orderId: string, accessCode?: string, urlStatus?: string): Promise<VerifiedPayment> {
  // No access code (e.g. the shopper cancelled before paying): nothing to verify.
  if (!accessCode || !ACCESS_CODE.test(accessCode)) {
    return { status: urlStatus === "cancelled" ? "cancelled" : "unknown", verified: false };
  }

  try {
    const url = new URL(`/api/checkout/${encodeURIComponent(accessCode)}/status`, checkoutUrl());
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
    if (!response.ok) return { status: "unknown", verified: false };

    const { data } = (await response.json()) as {
      data?: {
        status?: string;
        paymentMethod?: "card" | "bank_transfer";
        amount?: number;
        paidAt?: string;
        gatewayReference?: string;
        merchantReference?: string;
      };
    };

    // A real access code from a different order must not confirm this one.
    if (data?.merchantReference !== `EPY-${orderId}`) return { status: "unknown", verified: false };

    const status = KNOWN.includes(data?.status as VerifiedStatus) ? (data!.status as VerifiedStatus) : "unknown";
    return {
      status,
      verified: status !== "unknown",
      paymentMethod: data?.paymentMethod,
      amount: data?.amount,
      paidAt: data?.paidAt,
      gatewayReference: data?.gatewayReference,
    };
  } catch {
    return { status: "unknown", verified: false };
  }
}
