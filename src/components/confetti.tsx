"use client";

const PIECES = ["🎉", "✨", "🎊", "⭐"];

export function Confetti({ count = 14 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-visible">
      {Array.from({ length: count }).map((_, i) => {
        const left = 4 + Math.round((92 / count) * i) + Math.floor(Math.random() * 4);
        const delay = Math.random() * 0.5;
        const duration = 1.6 + Math.random() * 1.2;
        return (
          <span
            key={i}
            className="animate-confetti absolute top-0 text-lg"
            style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
          >
            {PIECES[i % PIECES.length]}
          </span>
        );
      })}
    </div>
  );
}
