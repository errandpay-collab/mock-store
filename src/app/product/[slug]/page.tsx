import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_ACCENT, getProduct, getRelatedProducts, PRODUCTS } from "@/lib/products";
import { getReviews } from "@/lib/reviews";
import { formatNaira } from "@/lib/format";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCartBox } from "@/components/add-to-cart-box";
import { StarRating } from "@/components/star-rating";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.name} — Mock Mart` : "Product not found — Mock Mart" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const reviews = getReviews(product.category);

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-stone-400">
        <Link href="/" className="hover:text-stone-700">
          Home
        </Link>
        <span>/</span>
        <Link href={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-stone-700">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-stone-600">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p
            className={`inline-block rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${CATEGORY_ACCENT[product.category]}`}
          >
            {product.category}
          </p>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-2">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-3xl font-bold text-stone-900">{formatNaira(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-base text-stone-400 line-through">
                {formatNaira(product.compareAtPrice)}
              </p>
            )}
            {product.compareAtPrice && (
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600">
                Save {formatNaira(product.compareAtPrice - product.price)}
              </span>
            )}
          </div>

          <p className="mt-4 leading-7 text-stone-600">{product.longDescription}</p>

          <ul className="mt-5 space-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="mt-0.5 text-emerald-500">✓</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <AddToCartBox product={product} />
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-400">
            <span>SKU {product.sku}</span>
            <span>{product.stock} in stock</span>
            <span>🔒 Secure ErrandPay checkout</span>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-lg font-bold text-stone-900">Ratings &amp; reviews</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.title} className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} />
                <span className="text-xs text-stone-400">{review.date}</span>
              </div>
              <p className="mt-2 font-semibold text-stone-900">{review.title}</p>
              <p className="mt-1 text-sm leading-6 text-stone-500">{review.body}</p>
              <p className="mt-3 text-xs font-medium text-stone-400">— {review.author}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-bold text-stone-900">You might also like</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
