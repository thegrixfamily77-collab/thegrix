"use client";

import { AdminImageUrlField, GalleryImageAppender } from "@/components/admin/AdminImageUrlField";
import type { AreaDeveloper, LocationInsight } from "@/data/locations";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function linesToStrings(s: string): string[] {
  return s.split("\n").map((x) => x.trim()).filter(Boolean);
}

function stringsToLines(a: string[]): string {
  return a.join("\n");
}

function emptyLocation(): LocationInsight {
  return {
    slug: "",
    name: "",
    summary: "",
    lifestyle: "",
    connectivity: "",
    strengths: [],
    weaknesses: [],
    futureGrowth: "",
    pastPerformance: "",
    imageHints: [],
    topDevelopers: [{ name: "", notableProjects: "" }],
  };
}

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<LocationInsight[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [strTxt, setStrTxt] = useState("");
  const [weakTxt, setWeakTxt] = useState("");
  const [hintsTxt, setHintsTxt] = useState("");
  const [devs, setDevs] = useState<AreaDeveloper[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const selected = selectedSlug ? locations.find((l) => l.slug === selectedSlug) : null;

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return locations;
    return locations.filter((l) => l.slug.includes(t) || l.name.toLowerCase().includes(t));
  }, [locations, q]);

  useEffect(() => {
    let c = false;
    void (async () => {
      try {
        const res = await fetch("/api/admin/locations", { cache: "no-store" });
        const json = (await res.json()) as { ok?: boolean; locations?: LocationInsight[]; error?: string };
        if (!res.ok || !json.ok || !json.locations) {
          if (!c) setErr(json.error ?? "Failed to load");
          return;
        }
        if (!c) {
          setLocations(json.locations);
          if (json.locations[0]) setSelectedSlug(json.locations[0].slug);
        }
      } catch (e) {
        if (!c) setErr(e instanceof Error ? e.message : "Error");
      } finally {
        if (!c) setLoading(false);
      }
    })();
    return () => {
      c = true;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    setStrTxt(stringsToLines(selected.strengths));
    setWeakTxt(stringsToLines(selected.weaknesses));
    setHintsTxt(stringsToLines(selected.imageHints));
    setDevs(selected.topDevelopers.length ? selected.topDevelopers : [{ name: "", notableProjects: "" }]);
  }, [selected]);

  function patch(patch: Partial<LocationInsight>) {
    if (!selectedSlug) return;
    setLocations((prev) => prev.map((l) => (l.slug === selectedSlug ? { ...l, ...patch } : l)));
  }

  function updateDevs(rows: AreaDeveloper[]) {
    setDevs(rows);
    if (!selectedSlug) return;
    setLocations((prev) =>
      prev.map((l) => (l.slug === selectedSlug ? { ...l, topDevelopers: rows } : l)),
    );
  }

  async function saveAll() {
    const devRows = devs.filter((d) => d.name.trim() || d.notableProjects.trim());
    const next = locations.map((l) =>
      selectedSlug === l.slug
        ? {
            ...l,
            strengths: linesToStrings(strTxt),
            weaknesses: linesToStrings(weakTxt),
            imageHints: linesToStrings(hintsTxt),
            topDevelopers: devRows,
          }
        : l,
    );

    const slugs = new Set(next.map((l) => l.slug));
    if (slugs.size !== next.length) {
      setErr("Duplicate location slug.");
      return;
    }
    if (next.some((l) => !l.slug.trim() || !l.name.trim())) {
      setErr("Each location needs slug and name.");
      return;
    }

    setSaving(true);
    setErr(null);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/locations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locations: next }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setErr(json.error ?? "Save failed");
        setSaving(false);
        return;
      }
      setLocations(next);
      setMsg(`Saved ${next.length} locations.`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
    }
    setSaving(false);
  }

  function add() {
    const l = emptyLocation();
    const u = { ...l, slug: `loc_${Date.now()}`, name: "New location" };
    setLocations((prev) => [...prev, u]);
    setSelectedSlug(u.slug);
  }

  function remove() {
    if (!selectedSlug) return;
    if (!window.confirm("Remove this location from the list? Save to persist.")) return;
    const idRm = selectedSlug;
    setLocations((prev) => {
      const n = prev.filter((l) => l.slug !== idRm);
      setSelectedSlug(n[0]?.slug ?? null);
      return n;
    });
  }

  const field =
    "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20";

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">{err ?? "Loading…"}</div>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[260px,minmax(0,1fr)]">
      <aside className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={add} className="rounded-full bg-teal-700 px-3 py-2 text-xs font-semibold uppercase text-white hover:bg-teal-800">
            Add location
          </button>
          <button type="button" disabled={!selectedSlug} onClick={remove} className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-800 hover:bg-rose-50 disabled:opacity-40">
            Remove
          </button>
        </div>
        <input className={field} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        <ul className="max-h-[520px] space-y-1 overflow-y-auto [scrollbar-width:thin]">
          {filtered.map((l) => (
            <li key={l.slug}>
              <button
                type="button"
                onClick={() => setSelectedSlug(l.slug)}
                className={`w-full rounded-2xl border px-3 py-2.5 text-left text-sm ${
                  selectedSlug === l.slug ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 hover:border-teal-300"
                }`}
              >
                <span className="block font-semibold">{l.name}</span>
                <span className="block text-[11px] opacity-80">{l.slug}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-slate-900">Location dossier</h2>
          <div className="flex gap-2">
            <Link href="/#locations" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase hover:border-teal-300">
              View site
            </Link>
            <button type="button" disabled={saving} onClick={() => void saveAll()} className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase text-white disabled:opacity-60">
              {saving ? "Saving…" : "Save all"}
            </button>
          </div>
        </div>
        {msg ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900">{msg}</p> : null}
        {err ? <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-900">{err}</p> : null}

        {!selected ? (
          <p className="text-sm text-slate-600">Select or add a location.</p>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Slug (URL)
                <input
                  className={`${field} font-mono`}
                  value={selected.slug}
                  onChange={(e) => {
                    const next = e.target.value.trim().toLowerCase();
                    if (!selectedSlug) return;
                    setLocations((prev) =>
                      prev.map((l) => (l.slug === selectedSlug ? { ...l, slug: next } : l)),
                    );
                    setSelectedSlug(next);
                  }}
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Display name
                <input className={field} value={selected.name} onChange={(e) => patch({ name: e.target.value })} />
              </label>
            </div>
            <AdminImageUrlField
              label="Cover image (URL or upload from this computer)"
              value={selected.coverImageUrl ?? ""}
              onChange={(v) => patch({ coverImageUrl: v })}
            />
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase text-slate-600">
                Gallery images (optional, one URL per line)
              </label>
              <p className="text-xs text-slate-500">Paste URLs or upload files — each upload appends a new line.</p>
              <GalleryImageAppender
                onUploaded={(url) => {
                  if (!selectedSlug) return;
                  setLocations((prev) =>
                    prev.map((l) =>
                      l.slug === selectedSlug
                        ? { ...l, galleryImageUrls: [...(l.galleryImageUrls ?? []), url] }
                        : l,
                    ),
                  );
                }}
              />
              <textarea
                className={`${field} min-h-[90px] font-mono text-[13px]`}
                value={stringsToLines(selected.galleryImageUrls ?? [])}
                onChange={(e) => patch({ galleryImageUrls: linesToStrings(e.target.value) })}
                placeholder="https://…\n/content/uploads/….jpg"
              />
            </div>
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
              Summary
              <textarea className={`${field} min-h-[70px]`} value={selected.summary} onChange={(e) => patch({ summary: e.target.value })} />
            </label>
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
              Lifestyle
              <textarea className={`${field} min-h-[70px]`} value={selected.lifestyle} onChange={(e) => patch({ lifestyle: e.target.value })} />
            </label>
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
              Connectivity
              <textarea className={`${field} min-h-[70px]`} value={selected.connectivity} onChange={(e) => patch({ connectivity: e.target.value })} />
            </label>
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Future growth
                <textarea className={`${field} min-h-[70px]`} value={selected.futureGrowth} onChange={(e) => patch({ futureGrowth: e.target.value })} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Past performance
                <textarea className={`${field} min-h-[70px]`} value={selected.pastPerformance} onChange={(e) => patch({ pastPerformance: e.target.value })} />
              </label>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Strengths (line each)
                <textarea className={`${field} min-h-[120px]`} value={strTxt} onChange={(e) => setStrTxt(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Weaknesses (line each)
                <textarea className={`${field} min-h-[120px]`} value={weakTxt} onChange={(e) => setWeakTxt(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Image hints (line each)
                <textarea className={`${field} min-h-[120px]`} value={hintsTxt} onChange={(e) => setHintsTxt(e.target.value)} />
              </label>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-600">Top developers</p>
              <ul className="mt-2 flex flex-col gap-2">
                {devs.map((d, idx) => (
                  <li key={idx} className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <input
                      className={`${field} min-w-[140px] flex-1`}
                      placeholder="Name"
                      value={d.name}
                      onChange={(e) => {
                        const next = devs.slice();
                        next[idx] = { ...next[idx], name: e.target.value };
                        updateDevs(next);
                      }}
                    />
                    <input
                      className={`${field} min-w-[180px] flex-[2]`}
                      placeholder="Notable projects"
                      value={d.notableProjects}
                      onChange={(e) => {
                        const next = devs.slice();
                        next[idx] = { ...next[idx], notableProjects: e.target.value };
                        updateDevs(next);
                      }}
                    />
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-white"
                      onClick={() => updateDevs(devs.filter((_, i) => i !== idx))}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-teal-400 hover:text-teal-800"
                onClick={() => updateDevs([...devs, { name: "", notableProjects: "" }])}
              >
                + Add developer row
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
