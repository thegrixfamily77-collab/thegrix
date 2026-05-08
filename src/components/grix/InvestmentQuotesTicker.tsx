"use client";

import { useEffect, useMemo, useState } from "react";

type Quote = { text: string };

const QUOTES: Quote[] = [
  { text: "Price is what you pay; process is what protects you." },
  { text: "Buy cashflows you can explain in one sentence." },
  { text: "Risk hides in assumptions—write them down." },
  { text: "Liquidity is a feature; don’t treat it as a footnote." },
  { text: "Patience is a strategy when the numbers are honest." },
  { text: "If the story changes weekly, the asset is not ready." },
  { text: "Great deals survive boring questions." },
  { text: "Diversify by drivers, not by names." },
  { text: "When leverage rises, margins of safety must widen." },
  { text: "Exit paths matter as much as entry points." },
];

export function InvestmentQuotesTicker({
  quotes: quotesProp,
  intervalMs = 3000,
}: {
  quotes?: Quote[];
  intervalMs?: number;
}) {
  const quotes = useMemo(() => (quotesProp?.length ? quotesProp : QUOTES), [quotesProp]);
  const [idx, setIdx] = useState(0);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    setIdx(0);
  }, [quotes]);

  useEffect(() => {
    const t = window.setInterval(() => {
      setRolling(true);
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % quotes.length);
        setRolling(false);
      }, 520);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, quotes.length]);

  const current = quotes[idx] ?? quotes[0];
  const next = quotes[(idx + 1) % quotes.length] ?? quotes[0];
  if (!current || !next) return null;

  const itemHeightPx = 76;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white/55 px-4 py-3 shadow-[0_18px_42px_-26px_rgba(15,23,42,0.55)] ring-1 ring-slate-900/[0.05] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/55 via-white/20 to-teal-50/30" />

      <div className="relative overflow-hidden" style={{ height: `${itemHeightPx}px` }}>
        <div
          className="absolute inset-x-0 top-0 will-change-transform"
          style={{
            transform: rolling ? `translate3d(0,-${itemHeightPx}px,0)` : "translate3d(0,0,0)",
            transition: rolling ? "transform 520ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          }}
        >
          <div className="flex flex-col justify-center" style={{ height: `${itemHeightPx}px` }}>
            <p className="font-display mx-auto max-w-[46ch] text-center text-[15px] font-semibold leading-snug tracking-tight text-slate-900 sm:text-base">
              &ldquo;{current.text}&rdquo;
            </p>
          </div>

          <div className="flex flex-col justify-center" style={{ height: `${itemHeightPx}px` }}>
            <p className="font-display mx-auto max-w-[46ch] text-center text-[15px] font-semibold leading-snug tracking-tight text-slate-900 sm:text-base">
              &ldquo;{next.text}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

