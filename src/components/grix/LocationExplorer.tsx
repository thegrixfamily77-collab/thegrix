"use client";

import { LocationCard } from "@/components/grix/LocationCard";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

export interface LocationPreview {
  slug: string;
  name: string;
  summary: string;
  imageSrc: string;
}

export function LocationExplorer({
  locations,
  initialQuery = "",
  autoFocus = false,
}: {
  locations: LocationPreview[];
  initialQuery?: string;
  autoFocus?: boolean;
}) {
  const [q, setQ] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return locations;
    return locations.filter(
      (l) =>
        l.name.toLowerCase().includes(needle) ||
        l.slug.toLowerCase().includes(needle) ||
        l.summary.toLowerCase().includes(needle),
    );
  }, [locations, q]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-200/45 ring-1 ring-slate-900/[0.04] backdrop-blur sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <label htmlFor="loc-search" className="sr-only">
              Search locations
            </label>
            <div className="relative max-w-xl">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                <span aria-hidden className="text-lg">
                  ⌕
                </span>
              </div>
              <input
                ref={inputRef}
                id="loc-search"
                type="search"
                enterKeyHint="search"
                placeholder="Search locations (Airoli, Kharghar, Palm Beach)…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoFocus={autoFocus}
                className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 py-3 text-[15px] text-slate-900 shadow-inner shadow-slate-100 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-500/15 focus:shadow-[0_0_0_6px_rgba(13,148,136,0.08)]"
              />
              {q.trim().length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    inputRef.current?.focus();
                  }}
                  className="absolute inset-y-0 right-3 inline-flex items-center justify-center rounded-full px-3 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="-mx-4 flex gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
          {filtered.map((loc) => (
            <LocationCard
              key={loc.slug}
              slug={loc.slug}
              name={loc.name}
              summary={loc.summary}
              imageSrc={loc.imageSrc}
              variant="strip"
            />
          ))}
        </div>
      </div>

      <div className="hidden gap-5 md:grid sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((loc) => (
          <LocationCard
            key={loc.slug}
            slug={loc.slug}
            name={loc.name}
            summary={loc.summary}
            imageSrc={loc.imageSrc}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-600">
          No matches—try another keyword or browse sectors and properties from the navigation.
        </p>
      ) : null}
    </div>
  );
}
