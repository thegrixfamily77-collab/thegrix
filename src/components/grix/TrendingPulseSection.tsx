"use client";

import type { ProjectCard } from "@/data/projects";
import type { LocationInsight } from "@/data/locations";
import { locationCoverUrl } from "@/data/imagery";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function useAutoAdvance(length: number, intervalMs: number) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (length <= 1) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % length), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, length]);
  return idx;
}

export function TrendingPulseSection({
  locations,
  projects,
}: {
  locations: LocationInsight[];
  projects: ProjectCard[];
}) {
  const trendingLocations = useMemo(() => locations.slice(0, 6), [locations]);
  const trendingProjects = useMemo(() => projects.slice(0, 6), [projects]);
  const locIdx = useAutoAdvance(trendingLocations.length, 3000);
  const projIdx = useAutoAdvance(trendingProjects.length, 3000);
  const activeLoc = trendingLocations[locIdx];
  const activeProj = trendingProjects[projIdx];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-lg shadow-slate-200/45 ring-1 ring-slate-900/[0.04] backdrop-blur sm:p-8">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.9rem]">
        Recent pulse
      </h3>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-700">Trending locations</p>
          {activeLoc ? (
            <Link
              key={activeLoc.slug}
              href={`/locations/${activeLoc.slug}`}
              className="group mt-4 block overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:border-teal-300"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={locationCoverUrl(activeLoc.slug)}
                  alt=""
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {activeLoc.name}
                  </p>
                  <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-slate-200">
                    {activeLoc.summary}
                  </p>
                </div>
              </div>
            </Link>
          ) : null}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-indigo-700">Trending projects</p>
          {activeProj ? (
            <Link
              key={activeProj.id}
              href="/projects"
              className="group mt-4 block overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-indigo-50/35 shadow-sm transition hover:border-indigo-300"
            >
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm">
                      {activeProj.kind === "under_construction"
                        ? "Under construction"
                        : activeProj.kind === "resale"
                          ? "Resale"
                          : "Rental"}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {activeProj.possessionLabel}
                  </span>
                </div>
                <p className="font-display mt-3 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {activeProj.name}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {activeProj.developer}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{activeProj.brief}</p>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

