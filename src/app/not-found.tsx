import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-lg place-items-center px-5 text-center">
      <div>
        <span className="text-5xl">🧭</span>
        <h1 className="mt-4 text-2xl font-bold text-stone-900">Page not found</h1>
        <p className="mt-2 text-sm text-stone-500">
          The page you&apos;re looking for doesn&apos;t exist, or the product may have been removed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}
