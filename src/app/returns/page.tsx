import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = { title: "Returns & refunds — Mock Mart" };

export default function ReturnsPage() {
  return (
    <InfoPage
      eyebrow="Support"
      title="Returns & refunds"
      subtitle="What a returns policy would say, if there were anything to return."
    >
      <InfoSection title="Return window">
        <p>
          Eligible items can be returned within 14 days of delivery, unworn and in their original packaging,
          for a full refund to the original payment method.
        </p>
      </InfoSection>

      <InfoSection title="How it would work">
        <p>1. Start a return from your order confirmation page.</p>
        <p>2. Drop the package at any partner pickup point, or schedule a pickup.</p>
        <p>3. Refunds are issued once the return is received — typically within 5–7 business days.</p>
      </InfoSection>

      <InfoSection title="The honest version">
        <p>
          Mock Mart doesn&apos;t process real orders or refunds — it exists to test the{" "}
          <strong className="font-semibold text-stone-800">ErrandPay hosted checkout</strong>. This page is
          here so the storefront reads like a complete one, not because there&apos;s a warehouse behind it.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
