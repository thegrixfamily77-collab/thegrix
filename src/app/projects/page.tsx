"use client";

import { propertyCardImage } from "@/data/imagery";
import { PROJECTS, type ProjectKind } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ProjectsPage() {
  const [kind, setKind] = useState<ProjectKind | "all">("all");

  const filtered = useMemo(() => {
    if (kind === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.kind === kind);
  }, [kind]);

  const filterLabel =
    kind === "all"
      ? "All inventory"
      : kind === "under_construction"
        ? "Under construction"
        : kind === "resale"
          ? "Resale"
          : "Rental";

  return (
    <div className="flex flex-col gap-12 pt-10 pb-12">
      <header className="flex flex-col gap-6 border-b border-slate-200 pb-8">
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 hover:text-teal-800">
          ← Research home
        </Link>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-[3.25rem] md:leading-[1.1]">
              Properties shelf
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Research illustrative inventory by execution posture—delivery curve sensitivity versus resale liquidity—then
              snap each row back to its location dossier and sector thesis.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["all", "All"],
                  ["under_construction", "Under construction"],
                  ["resale", "Resale"],
                  ["rental", "Rental"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setKind(value)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    kind === value
                      ? "bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-md shadow-teal-600/20"
                      : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-teal-300 hover:text-slate-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Link
              href="/enquire"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 text-sm font-semibold tracking-wide text-white shadow-md shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700 sm:min-h-0 sm:self-start sm:py-2"
            >
              Contact / Enquire
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/50 ring-1 ring-slate-900/[0.03] transition hover:border-indigo-200 hover:shadow-lg"
          >
            <div className="relative aspect-[16/9] w-full shrink-0">
              <Image
                src={propertyCardImage(p.id)}
                alt={`Research imagery — ${p.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-teal-800 shadow-sm backdrop-blur-sm">
                  {p.kind === "under_construction" ? "Under construction" : p.kind === "resale" ? "Resale" : "Rental"}
                </span>
                <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600 shadow-sm backdrop-blur-sm">
                  {p.possessionLabel}
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900">{p.name}</h2>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{p.developer}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{p.brief}</p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em]">
                <Link className="text-teal-700 hover:text-teal-900" href={`/properties/${p.id}`}>
                  View property →
                </Link>
                <Link className="text-teal-700 hover:text-teal-900" href={`/locations/${p.locationSlug}`}>
                  Location →
                </Link>
                <Link className="text-indigo-700 hover:text-indigo-900" href={`/segments/${p.segmentSlug}`}>
                  Sector →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
