import type { ReactNode } from "react";

export function InfoPage({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-xl leading-7 text-stone-500">{subtitle}</p>}
      <div className="mt-10 space-y-8">{children}</div>
    </main>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-stone-900">{title}</h2>
      <div className="mt-2 space-y-3 text-sm leading-7 text-stone-600">{children}</div>
    </section>
  );
}
