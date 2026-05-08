"use client";

import { AdminImageUrlField } from "@/components/admin/AdminImageUrlField";
import type { SegmentProfile } from "@/data/segments";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function lines(s: string): string[] {
  return s.split("\n").map((x) => x.trim()).filter(Boolean);
}

function joinLines(a: string[]): string {
  return a.join("\n");
}

function emptySegment(): SegmentProfile {
  return {
    slug: "",
    title: "",
    summary: "",
    pastPerformance: "",
    presentPerformance: "",
    strengths: [],
    weaknesses: [],
  };
}

export default function AdminSegmentsPage() {
  const [segments, setSegments] = useState<SegmentProfile[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [strTxt, setStrTxt] = useState("");
  const [weakTxt, setWeakTxt] = useState("");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const selected = selectedSlug ? segments.find((s) => s.slug === selectedSlug) : null;

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return segments;
    return segments.filter((s) => s.slug.includes(t) || s.title.toLowerCase().includes(t));
  }, [segments, q]);

  useEffect(() => {
    let c = false;
    void (async () => {
      try {
        const res = await fetch("/api/admin/segments", { cache: "no-store" });
        const json = (await res.json()) as { ok?: boolean; segments?: SegmentProfile[]; error?: string };
        if (!res.ok || !json.ok || !json.segments) {
          if (!c) setErr(json.error ?? "Failed to load");
          return;
        }
        if (!c) {
          setSegments(json.segments);
          if (json.segments[0]) setSelectedSlug(json.segments[0].slug);
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
    setStrTxt(joinLines(selected.strengths));
    setWeakTxt(joinLines(selected.weaknesses));
  }, [selected]);

  function patch(patch: Partial<SegmentProfile>) {
    if (!selectedSlug) return;
    setSegments((prev) =>
      prev.map((s) => (s.slug === selectedSlug ? { ...s, ...patch } : s)),
    );
  }

  async function saveAll() {
    const next =
      selectedSlug !== null && selected !== null
        ? segments.map((s) =>
            s.slug === selectedSlug
              ? { ...s, strengths: lines(strTxt), weaknesses: lines(weakTxt) }
              : s,
          )
        : segments;

    const slugs = new Set(next.map((s) => s.slug));
    if (slugs.size !== next.length) {
      setErr("Duplicate slug detected—each segment must have a unique slug.");
      return;
    }

    setSaving(true);
    setErr(null);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/segments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segments: next }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setErr(json.error ?? "Save failed");
        setSaving(false);
        return;
      }
      setSegments(next);
      setMsg(`Saved ${next.length} segments.`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
    }
    setSaving(false);
  }

  function add() {
    const s = emptySegment();
    const unique = { ...s, slug: `segment_${Date.now()}`, title: "NEW SEGMENT" };
    setSegments((prev) => [...prev, unique]);
    setSelectedSlug(unique.slug);
  }

  function remove() {
    if (!selectedSlug) return;
    if (!window.confirm("Remove this segment from the list? Save to persist.")) return;
    setSegments((prev) => {
      const next = prev.filter((s) => s.slug !== selectedSlug);
      setSelectedSlug(next[0]?.slug ?? null);
      return next;
    });
  }

  const field =
    "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20";

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">{err ?? "Loading…"}</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px,minmax(0,1fr)]">
      <aside className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={add} className="rounded-full bg-indigo-700 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-indigo-800">
            Add segment
          </button>
          <button type="button" disabled={!selectedSlug} onClick={remove} className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-800 hover:bg-rose-50 disabled:opacity-40">
            Remove
          </button>
        </div>
        <input className={field} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        <ul className="max-h-[520px] space-y-1 overflow-y-auto [scrollbar-width:thin]">
          {filtered.map((s) => (
            <li key={s.slug}>
              <button
                type="button"
                onClick={() => setSelectedSlug(s.slug)}
                className={`w-full rounded-2xl border px-3 py-2.5 text-left text-sm ${
                  selectedSlug === s.slug ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 hover:border-teal-300"
                }`}
              >
                <span className="block font-semibold">{s.title}</span>
                <span className="block text-[11px] opacity-80">{s.slug}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-slate-900">Segment (property type)</h2>
          <div className="flex gap-2">
            <Link href="/segments" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:border-teal-300">
              View site
            </Link>
            <button type="button" disabled={saving} onClick={() => void saveAll()} className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-60">
              {saving ? "Saving…" : "Save all"}
            </button>
          </div>
        </div>
        {msg ? <p className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900">{msg}</p> : null}
        {err ? <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-900">{err}</p> : null}

        {!selected ? (
          <p className="text-sm text-slate-600">Select or add a segment.</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Slug (URL)
                <input
                  className={`${field} font-mono`}
                  value={selected.slug}
                  onChange={(e) => {
                    const next = e.target.value.trim().toLowerCase();
                    if (!selectedSlug) return;
                    setSegments((prev) =>
                      prev.map((s) => (s.slug === selectedSlug ? { ...s, slug: next } : s)),
                    );
                    setSelectedSlug(next);
                  }}
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Title
                <input className={field} value={selected.title} onChange={(e) => patch({ title: e.target.value })} />
              </label>
            </div>
            <AdminImageUrlField
              label="Feature image (URL or upload from this computer)"
              value={selected.featureImageUrl ?? ""}
              onChange={(v) => patch({ featureImageUrl: v })}
              hint="Saved files are served from your site as /content/uploads/…"
            />
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
              Summary
              <textarea className={`${field} min-h-[80px]`} value={selected.summary} onChange={(e) => patch({ summary: e.target.value })} />
            </label>
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
              Past performance
              <textarea className={`${field} min-h-[70px]`} value={selected.pastPerformance} onChange={(e) => patch({ pastPerformance: e.target.value })} />
            </label>
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
              Present performance
              <textarea className={`${field} min-h-[70px]`} value={selected.presentPerformance} onChange={(e) => patch({ presentPerformance: e.target.value })} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Strengths (one per line)
                <textarea className={`${field} min-h-[120px]`} value={strTxt} onChange={(e) => setStrTxt(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase text-slate-600">
                Weaknesses (one per line)
                <textarea className={`${field} min-h-[120px]`} value={weakTxt} onChange={(e) => setWeakTxt(e.target.value)} />
              </label>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
