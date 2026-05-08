"use client";

import { useEffect, useMemo, useState } from "react";

const AWARDS = [
  { year: "2026", title: "Research-first UX (internal)" },
  { year: "2025", title: "Best clarity initiative (internal)" },
  { year: "2025", title: "Atlas quality milestone (internal)" },
  { year: "2024", title: "Consistency badge (internal)" },
];

const CULTURE = [
  { label: "On-ground visits", desc: "Node walks, transit reads, infra tracking." },
  { label: "Research jams", desc: "Turning messy notes into crisp dossiers." },
  { label: "Design reviews", desc: "Less noise, more signal." },
  { label: "Team sessions", desc: "Frameworks, not hype." },
  { label: "Work culture", desc: "Calm craft. Reliable delivery." },
  { label: "Community", desc: "Listening loops with real buyers." },
];

function useAutoAdvance(length: number, intervalMs: number) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (length <= 1) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % length), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, length]);
  return idx;
}

export function AwardsAndCultureSection() {
  const awards = useMemo(() => AWARDS, []);
  const culture = useMemo(() => CULTURE, []);
  const awardIdx = useAutoAdvance(awards.length, 3000);
  const cultureIdx = useAutoAdvance(culture.length, 3000);
  const activeAward = awards[awardIdx];
  const activeCulture = culture[cultureIdx];

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-teal-50/35 p-6 shadow-lg shadow-slate-200/45 ring-1 ring-slate-900/[0.04] sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.9rem]">
              Awards
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Auto-scrolls every 3 seconds. Replace placeholders with real award images.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Highlights</p>
        </div>

        {activeAward ? (
          <div
            key={`${activeAward.year}-${activeAward.title}`}
            className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/45 ring-1 ring-slate-900/[0.03]"
          >
            <div className="relative h-36 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
              <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.45),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(79,70,229,0.35),transparent_52%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white ring-1 ring-white/25 backdrop-blur">
                  Award image
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{activeAward.year}</p>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                {activeAward.title}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-indigo-50/30 p-6 shadow-lg shadow-slate-200/45 ring-1 ring-slate-900/[0.04] sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.9rem]">
              Team & culture
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Auto-scrolls every 3 seconds. Replace placeholders with real work & culture photos.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Inside the company</p>
        </div>

        {activeCulture ? (
          <div
            key={activeCulture.label}
            className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/45 ring-1 ring-slate-900/[0.03]"
          >
            <div className="relative h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
              <div className="absolute inset-0 opacity-65 [background:radial-gradient(circle_at_25%_25%,rgba(13,148,136,0.35),transparent_56%),radial-gradient(circle_at_70%_70%,rgba(79,70,229,0.4),transparent_52%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white ring-1 ring-white/25 backdrop-blur">
                  Photo
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="font-display text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                {activeCulture.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{activeCulture.desc}</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

