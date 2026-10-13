import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartDrawer } from "@/components/cart-drawer";
import { CartToast } from "@/components/cart-toast";

export const metadata: Metadata = {
  title: "Mock Mart",
  description: "A beautiful mocked-up storefront for testing the ErrandPay hosted checkout.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
          <CartDrawer />
          <CartToast />
        </Providers>
      </body>
    </html>
  );
}
