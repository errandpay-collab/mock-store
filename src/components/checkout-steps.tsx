const STEPS = ["Cart", "Details & payment", "Confirmation"] as const;

export function CheckoutSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex items-center gap-2 text-xs font-semibold sm:gap-3 sm:text-sm">
      {STEPS.map((label, i) => {
        const step = (i + 1) as 1 | 2 | 3;
        const done = step < current;
        const active = step === current;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3">
            {i > 0 && (
              <span
                className={`h-px w-4 sm:w-10 ${done || active ? "bg-amber-500" : "bg-stone-200"}`}
                aria-hidden
              />
            )}
            <span className="flex items-center gap-1.5">
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${
                  done
                    ? "bg-amber-500 text-white"
                    : active
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-400"
                }`}
              >
                {done ? "✓" : step}
              </span>
              <span className={active ? "text-stone-900" : done ? "text-stone-500" : "text-stone-400"}>
                {label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
