# Mock Mart

A small storefront — product catalog, cart, checkout — used to test the
[ErrandPay hosted checkout](../errandpay-hosted-checkout) end to end, the way a
real merchant integration would use it: it never imports gateway code, it only
navigates the browser to the gateway's `/pay/[reference]` URL and gets a
`returnUrl` redirect back.

This is deliberately a **separate app** from the gateway — see the reasoning
in the conversation that created it: it plays the "merchant" role so the
integration surface (redirect + returnUrl, not shared internals) is what
actually gets exercised.

## Run

This app and the gateway run as two separate dev servers, side by side:

```bash
# terminal 1, in errandpay-hosted-checkout
npm install
npm run dev            # http://localhost:3000

# terminal 2, in errandpay-mock-store
npm install
npm run dev            # http://localhost:3100
```

Open <http://localhost:3100>, pick a product, and pay. You'll land on the
gateway's hosted checkout with the real product name/amount, and get sent
back to this app's `/order/[id]` page on completion.

## How the integration works

1. **Catalog and cart** (`/`): products, a cart in React context persisted to `localStorage`.
2. **Checkout** (`/checkout`): collects contact and shipping details, then "Pay with ErrandPay"
   sends the shopper to the hosted checkout:

   ```text
   {NEXT_PUBLIC_GATEWAY_URL}/pay/EPY-<orderId>
     ?amount=<subtotal + shipping>&currency=NGN&description=<items>
     &merchant=Mock+Mart&email=<email>&returnUrl=<this store>/order/<orderId>
   ```

   The cart is snapshotted to `localStorage` under the order id so the order page can show what
   was bought after the round trip.
3. **Payment**: the shopper pays by card or bank transfer on the hosted checkout, which talks to
   the real ErrandPay gateway.
4. **Return** (`/order/[id]`): the checkout sends the shopper back with
   `?reference=…&status=…&gatewayReference=…`. The store **does not trust `status`**. Its server
   asks the checkout's status endpoint, which confirms with the gateway (`/verify`)
   (`src/lib/payment-status.ts`). The order shows as paid, and the cart is cleared, only when the
   gateway confirms `successful` and the amount matches the order. Pending, failed, expired and
   cancelled payments get their own screen, and the cart is kept so the shopper can try again.

## Deploy (Vercel)

1. Deploy the hosted checkout first and note its URL.
2. In this project's Vercel settings, set `NEXT_PUBLIC_GATEWAY_URL=https://<checkout>.vercel.app`
   (no trailing slash). `NEXT_PUBLIC_STORE_URL` is optional.
3. Deploy. Vercel detects Next.js; no other settings are needed.

## Known limitations (test store)

- The amount travels in the payment link, which the hosted checkout only accepts on a test
  deployment (`CHECKOUT_ALLOW_LINK_SESSION=true`). Real merchants will use a server-side
  "initialize payment" call instead.
- Orders and cart live in this browser's `localStorage` only: no accounts or order database.
- The order page confirms payments when the shopper returns. A real store would also listen to the
  gateway webhook, so orders are confirmed even if the shopper never comes back.
