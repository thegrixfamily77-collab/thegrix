"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DashboardCounts = {
  homepage: boolean;
  projects: number;
  locations: number;
  segments: number;
};

type LiveStats = {
  dayKey: string;
  activeNow: number;
  visitedToday: number;
  pageViewsToday: number;
  signupsToday: number;
  enquiriesToday: number;
};

async function fetchCounts(): Promise<DashboardCounts> {
  const [h, p, l, s] = await Promise.all([
    fetch("/api/admin/homepage", { cache: "no-store" })
      .then((r) => r.ok)
      .catch(() => false),
    fetch("/api/admin/projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { projects?: unknown[] }) => Number(j?.projects?.length ?? 0)),
    fetch("/api/admin/locations", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { locations?: unknown[] }) => Number(j?.locations?.length ?? 0)),
    fetch("/api/admin/segments", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { segments?: unknown[] }) => Number(j?.segments?.length ?? 0)),
  ]);
  return { homepage: h, projects: p, locations: l, segments: s };
}

async function fetchLiveStats(): Promise<LiveStats | null> {
  const res = await fetch("/api/admin/analytics", { cache: "no-store" });
  const json = (await res.json()) as Partial<LiveStats> & { ok?: boolean };
  if (!res.ok || !json.ok) return null;
  return {
    dayKey: String(json.dayKey ?? ""),
    activeNow: Number(json.activeNow ?? 0),
    visitedToday: Number(json.visitedToday ?? 0),
    pageViewsToday: Number(json.pageViewsToday ?? 0),
    signupsToday: Number(json.signupsToday ?? 0),
    enquiriesToday: Number(json.enquiriesToday ?? 0),
  };
}

const sections = [
  {
    href: "/admin/homepage",
    title: "Homepage",
    desc: "Hero titles, CTAs, SEO description, and investment quotes ticker.",
    tone: "from-violet-600 to-indigo-600",
  },
  {
    href: "/admin/properties",
    title: "Properties",
    desc: "Inventory cards: copy, kinds, lists, and links to locations & segments.",
    tone: "from-teal-600 to-cyan-600",
  },
  {
    href: "/admin/locations",
    title: "Locations",
    desc: "Dossier text, strengths & weaknesses, developers, and image hints.",
    tone: "from-indigo-600 to-blue-600",
  },
  {
    href: "/admin/segments",
    title: "Segments",
    desc: "Property-type pages: thesis, performance notes, strengths & weaknesses.",
    tone: "from-rose-600 to-orange-500",
  },
] as const;

export default function AdminDashboardPage() {
  const [ready, setReady] = useState(false);
  const [counts, setCounts] = useState<DashboardCounts | null>(null);
  const [live, setLive] = useState<LiveStats | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalRecords = useMemo(() => {
    if (!counts) return 0;
    return counts.projects + counts.locations + counts.segments;
  }, [counts]);

  useEffect(() => {
    setReady(true);
    let cancelled = false;
    void (async () => {
      try {
        const next = await fetchCounts();
        if (!cancelled) setCounts(next);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load dashboard");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const next = await fetchLiveStats();
        if (!cancelled) {
          setLive(next);
          setLiveError(next ? null : "Could not load live stats.");
        }
      } catch {
        if (!cancelled) {
          setLive(null);
          setLiveError("Could not load live stats.");
        }
      }
    }

    void load();
    const id = window.setInterval(() => void load(), 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900 p-6 text-white shadow-lg ring-1 ring-white/10 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-teal-200/90">Website activity</p>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">Live metrics</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200/90">
              Approximate counters from anonymous browser beacons & form submissions (UTC day:{" "}
              <span className="font-mono text-teal-100">{live?.dayKey ?? "…"}</span>). “Active now” uses pings in roughly
              the last 5 minutes.
            </p>
          </div>
        </div>
        {liveError ? (
          <p className="mt-4 rounded-xl border border-rose-400/40 bg-rose-500/15 px-4 py-3 text-sm text-rose-100">
            {liveError}
          </p>
        ) : null}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              { label: "Active now", value: live?.activeNow, sub: "Recent site visitors (~5 min)" },
              { label: "Visited today", value: live?.visitedToday, sub: "Unique browsers (today)" },
              { label: "New sign-ups today", value: live?.signupsToday, sub: "/signup submits" },
              { label: "Enquiries today", value: live?.enquiriesToday, sub: "Successful /api/enquire posts" },
            ] as const
          ).map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur sm:py-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">{card.label}</p>
              <p className="font-display mt-2 text-3xl font-semibold tabular-nums tracking-tight sm:text-[2.15rem]">
                {live ? card.value : "—"}
              </p>
              <p className="mt-1 text-xs leading-snug text-slate-400">{card.sub}</p>
              {card.label === "Visited today" && live ? (
                <p className="mt-2 text-[11px] text-slate-500">Page views today: {live.pageViewsToday}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">Homepage</p>
          <p className="font-display mt-3 text-2xl font-semibold text-slate-900">
            {counts ? (counts.homepage ? "Ready" : "—") : "—"}
          </p>
          <p className="mt-2 text-sm text-slate-600">Copy & quotes (single document).</p>
          <Link className="mt-4 inline-flex text-sm font-semibold text-violet-700 hover:text-violet-900" href="/admin/homepage">
            Edit →
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-teal-700">Properties</p>
          <p className="font-display mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {counts ? counts.projects : "—"}
          </p>
          <Link className="mt-4 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-900" href="/admin/properties">
            Manage →
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-indigo-700">Locations</p>
          <p className="font-display mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {counts ? counts.locations : "—"}
          </p>
          <Link className="mt-4 inline-flex text-sm font-semibold text-indigo-700 hover:text-indigo-900" href="/admin/locations">
            Manage →
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-rose-700">Segments</p>
          <p className="font-display mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {counts ? counts.segments : "—"}
          </p>
          <Link className="mt-4 inline-flex text-sm font-semibold text-rose-700 hover:text-rose-900" href="/admin/segments">
            Manage →
          </Link>
        </div>
      </section>

      <div className="rounded-2xl border border-slate-200 bg-slate-100/80 px-4 py-3 text-sm text-slate-700">
        <span className="font-semibold text-slate-900">{counts ? totalRecords : "—"}</span> total records across properties,
        locations, and segments (homepage is separate).
      </div>

      {error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-900 shadow-sm">
          Dashboard failed to load: {error}
        </div>
      ) : null}

      <section>
        <h2 className="font-display text-lg font-semibold text-slate-900">Sections</h2>
        <p className="mt-1 text-sm text-slate-600">Choose a workspace—each keeps its own data and saves to disk when you confirm.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {sections.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] transition hover:border-teal-200 hover:shadow-lg"
            >
              <span
                className={`inline-block rounded-full bg-gradient-to-r px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white ${item.tone}`}
              >
                Open
              </span>
              <h3 className="font-display mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal-700 opacity-0 transition group-hover:opacity-100">
                Continue →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {ready ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50/90 p-5 text-sm text-amber-950 shadow-sm ring-1 ring-amber-900/[0.06]">
          Public pages read from saved JSON under <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs">/content</code> when
          present. Security is off for now—add auth before production.
        </div>
      ) : null}
    </div>
  );
}
