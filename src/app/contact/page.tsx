import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact — Mock Mart" };

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Get in touch" title="Contact us" subtitle="Questions about an order, or just curious how this was built?">
      <InfoSection title="Reach us">
        <p>support@mockmart.test · Mon–Fri, 9am–5pm WAT</p>
      </InfoSection>

      <section>
        <h2 className="text-lg font-bold text-stone-900">Send a message</h2>
        <div className="mt-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-card">
          <ContactForm />
        </div>
      </section>
    </InfoPage>
  );
}
