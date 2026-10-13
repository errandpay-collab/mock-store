import type { Metadata } from "next";
import { formatNaira } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/shipping";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = { title: "Shipping & delivery — Mock Mart" };

const ZONES = [
  { zone: "Lagos", eta: "1–2 business days" },
  { zone: "Abuja & Port Harcourt", eta: "2–3 business days" },
  { zone: "Rest of Nigeria", eta: "3–5 business days" },
];

export default function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Support"
      title="Shipping & delivery"
      subtitle="How orders would move if Mock Mart shipped anything real."
    >
      <InfoSection title="Delivery estimates">
        <div className="overflow-hidden rounded-2xl border border-stone-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Zone</th>
                <th className="px-4 py-3 font-semibold">Estimated delivery</th>
              </tr>
            </thead>
            <tbody>
              {ZONES.map((row) => (
                <tr key={row.zone} className="border-t border-stone-100">
                  <td className="px-4 py-3 text-stone-700">{row.zone}</td>
                  <td className="px-4 py-3 text-stone-500">{row.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfoSection>

      <InfoSection title="Shipping cost">
        <p>
          A flat {formatNaira(SHIPPING_FEE)} shipping fee applies to every order, waived automatically once
          your cart subtotal reaches {formatNaira(FREE_SHIPPING_THRESHOLD)} — the cart and checkout pages
          show a live progress bar toward that threshold.
        </p>
      </InfoSection>

      <InfoSection title="Tracking your order">
        <p>
          After checkout, ErrandPay redirects you back to an order confirmation page with your reference,
          items, and delivery estimate. Since this is a demo, nothing actually ships — that page is as far
          as tracking goes.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
