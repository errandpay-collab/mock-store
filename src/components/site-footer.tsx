import Link from "next/link";

const SHOP_LINKS = ["Audio", "Wearables", "Gaming", "Home", "Accessories"] as const;

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping & delivery", href: "/shipping" },
  { label: "Returns & refunds", href: "/returns" },
];

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-[18px] w-[18px]">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="9" />
      <path d="M13.8 9.2h-1.6c-.5 0-.9.4-.9.9v1.4h2.4l-.3 2.1h-2.1V19h-2.2v-5.4H9.3v-2.1h1.8v-1.6c0-1.5 1.1-2.7 2.6-2.7h1.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "X (Twitter)", icon: XIcon },
  { label: "Facebook", icon: FacebookIcon },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-stone-950 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 text-lg shadow-glow">
              🛍️
            </span>
            <span className="text-sm font-bold tracking-tight text-white">Mock Mart</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-stone-400">
            A demo storefront built to exercise the ErrandPay hosted checkout end to end — products, prices,
            and orders here are not real.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {SOCIALS.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                title={`${label} (demo link)`}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-stone-300 transition hover:border-white/30 hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Shop</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SHOP_LINKS.map((cat) => (
              <li key={cat}>
                <Link href={`/?category=${encodeURIComponent(cat)}`} className="text-stone-400 transition hover:text-white">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-stone-400 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-stone-400 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-stone-500 sm:flex-row">
          <p>© {year} Mock Mart. All rights reserved.</p>
          <p>Demo store — not a real merchant. Payments via ErrandPay.</p>
        </div>
      </div>
    </footer>
  );
}
