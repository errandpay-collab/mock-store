import { verifyPayment } from "@/lib/payment-status";
import { OrderClient } from "./order-client";

// Always render per request: the payment result must be checked live, never cached.
export const dynamic = "force-dynamic";

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const pick = (key: string) => (typeof query[key] === "string" ? (query[key] as string) : undefined);

  // `reference` is the accessCode the checkout returns. `status` is only a hint;
  // verifyPayment confirms the payment (and that it is this order's) with the gateway.
  const payment = await verifyPayment(id, pick("reference"), pick("status"));

  return <OrderClient id={id} payment={payment} />;
}
