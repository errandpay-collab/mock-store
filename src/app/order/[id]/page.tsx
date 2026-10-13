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

  // `status` from the URL is only a hint; verifyPayment confirms it with the gateway.
  const payment = await verifyPayment(pick("reference"), pick("gatewayReference"), pick("status"));

  return <OrderClient id={id} payment={payment} />;
}
