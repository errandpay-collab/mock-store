// Purely cosmetic shipping logic — the demo gateway doesn't take a shipping
// line item, so this fee is folded straight into the amount charged.
export const FREE_SHIPPING_THRESHOLD = 50000;
export const SHIPPING_FEE = 2500;

export function getShippingFee(subtotal: number) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

export function amountToFreeShipping(subtotal: number) {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}
