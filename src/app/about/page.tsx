import type { Metadata } from "next";
import { PRODUCTS, getCategories } from "@/lib/products";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = { title: "About — Mock Mart" };

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="The store behind the checkout"
      subtitle="Mock Mart looks and shops like a real store because that's what makes it a useful test — the products just aren't real."
    >
      <InfoSection title="What this is">
        <p>
          Mock Mart is a fully working storefront — browse {PRODUCTS.length} products across{" "}
          {getCategories(PRODUCTS).length} categories, add them to a cart, and check out — built to exercise
          the <strong className="font-semibold text-stone-800">ErrandPay hosted checkout</strong> the same
          way a real merchant integration would: a full page redirect to the gateway, and a return trip back
          here once payment completes.
        </p>
      </InfoSection>

      <InfoSection title="Why it exists">
        <p>
          Payment integrations are easy to get wrong in ways that only show up once a real browser makes a
          real round trip. Mock Mart plays the &ldquo;merchant&rdquo; side of that round trip — it never
          imports gateway code, it only navigates to the gateway&apos;s pay URL and reads a return redirect —
          so the actual integration surface gets exercised, not just the API shape.
        </p>
      </InfoSection>

      <InfoSection title="What's real, what isn't">
        <p>Real: the cart, the checkout flow, the redirect to ErrandPay, and the order confirmation.</p>
        <p>
          Not real: the products, the inventory counts, the reviews, and anything sent by email. Nothing you
          enter here is stored on a server — the cart and order history live only in your browser&apos;s
          local storage.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
