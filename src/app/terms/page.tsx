import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = { title: "Terms of service — Mock Mart" };

export default function TermsPage() {
  return (
    <InfoPage eyebrow="Legal" title="Terms of service" subtitle="The short, honest version.">
      <InfoSection title="It's a demo">
        <p>
          By using Mock Mart you acknowledge it&apos;s a test storefront: products, prices, stock levels, and
          reviews are illustrative, not real offers for sale.
        </p>
      </InfoSection>

      <InfoSection title="Payments">
        <p>
          Checkout hands off to the ErrandPay hosted checkout sandbox. No real charge is made, and no real
          goods are shipped as a result of completing checkout here.
        </p>
      </InfoSection>

      <InfoSection title="No warranty">
        <p>
          Mock Mart is provided as-is, purely to exercise a payment integration end to end — it comes with no
          guarantees about uptime, accuracy, or fitness for any purpose beyond that.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
