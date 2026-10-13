// A snapshot of what was in the cart at the moment the shopper left for the
// ErrandPay hosted checkout, keyed by order id. The browser navigates fully
// away to the gateway and back, so this is how /order/[id] recovers what was
// actually bought without a shared backend — a real integration would look
// this up server-side instead. See README for the caveat.
const STORAGE_PREFIX = "mockmart:pending:";

export interface PendingOrderLine {
  slug: string;
  name: string;
  image: string;
  qty: number;
  price: number;
}

export interface PendingOrderShipping {
  fullName: string;
  address: string;
  city: string;
  phone: string;
}

export interface PendingOrder {
  id: string;
  reference: string;
  email: string;
  shipping: PendingOrderShipping;
  lines: PendingOrderLine[];
  subtotal: number;
  shippingFee: number;
  amount: number;
  createdAt: string;
}

export function savePendingOrder(order: PendingOrder) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + order.id, JSON.stringify(order));
  } catch {
    // ignore
  }
}

export function readPendingOrder(id: string): PendingOrder | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + id);
    return raw ? (JSON.parse(raw) as PendingOrder) : null;
  } catch {
    return null;
  }
}
