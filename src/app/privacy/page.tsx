import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = { title: "Privacy policy — Mock Mart" };

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="Legal" title="Privacy policy" subtitle="Short, because there isn't much to disclose.">
      <InfoSection title="What's stored, and where">
        <p>
          Your cart and any past order snapshots live only in this browser&apos;s{" "}
          <code className="rounded bg-stone-100 px-1.5 py-0.5 text-[13px]">localStorage</code> — nothing is
          sent to or stored on a Mock Mart server, because there isn&apos;t one.
        </p>
      </InfoSection>

      <InfoSection title="What checkout sends onward">
        <p>
          The email, name, address, phone, and order amount you enter at checkout are only used to build the
          redirect URL to the ErrandPay hosted checkout and to render your own order confirmation page. They
          aren&apos;t emailed, logged, or shared with anyone else.
        </p>
      </InfoSection>

      <InfoSection title="Clearing your data">
        <p>
          Clearing your browser&apos;s site data for this domain removes your cart and order history
          instantly and completely — there&apos;s no backup copy anywhere.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
