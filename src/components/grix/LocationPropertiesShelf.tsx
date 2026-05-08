"use client";

import type { SegmentProfile } from "@/data/segments";
import type { ProjectCard } from "@/data/projects";
import Link from "next/link";
import { useMemo, useState } from "react";

export function LocationPropertiesShelf({
  locationSlug,
  projects,
  segments,
  initialSegmentSlug,
}: {
  locationSlug: string;
  projects: ProjectCard[];
  segments: SegmentProfile[];
  initialSegmentSlug?: string;
}) {
  const normalizedInitialSegment = useMemo(() => {
    if (!initialSegmentSlug) return null;
    return segments.some((s) => s.slug === initialSegmentSlug) ? initialSegmentSlug : null;
  }, [initialSegmentSlug, segments]);
  const [segmentSlug, setSegmentSlug] = useState<string | null>(normalizedInitialSegment);

  const segmentOptions = useMemo(
    () =>
      segments.map((s) => ({
        slug: s.slug,
        title: s.title,
      })),
    [segments],
  );

  const hasAnyProjects = useMemo(() => projects.length > 0, [projects.length]);
  const isLand = segmentSlug === "land";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900">Properties</h2>
          <p className="mt-1 text-sm text-slate-600">
            Choose a segment, then open the relevant results.
          </p>
        </div>
        <Link className="text-sm font-semibold text-teal-700 hover:text-teal-900" href="/projects">
          Full shelf →
        </Link>
      </div>

      <div className="mt-5">
        {!normalizedInitialSegment ? (
          <div className="flex flex-wrap gap-2">
            {segmentOptions.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => {
                  setSegmentSlug(s.slug);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  segmentSlug === s.slug
                    ? "bg-slate-900 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        ) : normalizedInitialSegment ? (
          <p className="text-sm font-semibold text-slate-700">
            Segment selected:{" "}
            <span className="font-display">
              {segments.find((s) => s.slug === normalizedInitialSegment)?.title ?? normalizedInitialSegment}
            </span>
          </p>
        ) : (
          <p className="text-sm text-slate-600">Select a segment above to continue.</p>
        )}
      </div>

      {!segmentSlug ? (
        <p className="mt-5 text-sm text-slate-600">Select a segment to continue.</p>
      ) : isLand ? (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link
            href={`/locations/${encodeURIComponent(locationSlug)}/properties?segment=land&land=agricultural`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700 sm:min-h-0"
          >
            AGRICULTURAL
          </Link>
          <Link
            href={`/locations/${encodeURIComponent(locationSlug)}/properties?segment=land&land=na_plot`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/40 sm:min-h-0"
          >
            NA PLOT
          </Link>
          {!hasAnyProjects ? <p className="text-sm text-slate-500">No projects tagged for this location yet.</p> : null}
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link
            href={`/locations/${encodeURIComponent(locationSlug)}/properties?kind=under_construction${
              segmentSlug ? `&segment=${encodeURIComponent(segmentSlug)}` : ""
            }`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700 sm:min-h-0"
          >
            UNDER CONSTRUCTION
          </Link>
          <Link
            href={`/locations/${encodeURIComponent(locationSlug)}/properties?kind=resale${
              segmentSlug ? `&segment=${encodeURIComponent(segmentSlug)}` : ""
            }`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/40 sm:min-h-0"
          >
            RESALE
          </Link>
          <Link
            href={`/locations/${encodeURIComponent(locationSlug)}/properties?kind=rental${
              segmentSlug ? `&segment=${encodeURIComponent(segmentSlug)}` : ""
            }`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:min-h-0"
          >
            RENTAL
          </Link>
          {!hasAnyProjects ? <p className="text-sm text-slate-500">No projects tagged for this location yet.</p> : null}
        </div>
      )}
    </section>
  );
}

