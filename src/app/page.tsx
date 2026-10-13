import { Suspense } from "react";
import { getCategories, PRODUCTS } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { HeroCollage } from "@/components/hero-collage";

const PERKS = ["Free instant checkout", "Secure hosted payment", "Same-day mock delivery", "Easy returns"];

const STATS = [
  { label: "Products", value: `${PRODUCTS.length}+` },
  { label: "Categories", value: `${getCategories(PRODUCTS).length}` },
  { label: "Avg. rating", value: "4.6★" },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen pb-20">
      <section className="relative overflow-hidden bg-stone-950">
        <div className="bg-dot-grid absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-rose-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="animate-fade-in inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              <span aria-hidden>✦</span> Mock Mart · Test storefront
            </p>
            <h1 className="animate-slide-up mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Shop the catalog,
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                checkout for real.
              </span>
            </h1>
            <p
              className="animate-slide-up mt-5 max-w-lg text-base leading-7 text-stone-300"
              style={{ animationDelay: "80ms" }}
            >
              Browse products, build a cart, and pay with the ErrandPay hosted
              checkout end to end — this store exists to exercise that
              integration, dressed up like a real one.
            </p>

            <div
              className="animate-slide-up mt-7 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "140ms" }}
            >
              <a
                href="#products"
                className="flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-6 text-sm font-bold text-white shadow-glow transition hover:brightness-105"
              >
                Start shopping
              </a>
              <a
                href="#products"
                className="flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse categories
              </a>
            </div>

            <div
              className="animate-slide-up mt-9 flex flex-wrap gap-x-8 gap-y-3"
              style={{ animationDelay: "200ms" }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroCollage />
        </div>

        <div className="relative border-t border-white/10 bg-white/[0.03]">
          <div className="no-scrollbar flex w-max animate-marquee gap-10 whitespace-nowrap py-3 text-sm font-medium text-stone-300">
            {[...PERKS, ...PERKS].map((perk, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-amber-400">✦</span> {perk}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div id="products" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
            All products
          </h2>
          <p className="text-sm text-stone-400">{PRODUCTS.length} items</p>
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid products={PRODUCTS} />
        </Suspense>
      </div>
    </main>
  );
}
