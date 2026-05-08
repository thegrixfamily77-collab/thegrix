"use client";

import { AdminImageUrlField } from "@/components/admin/AdminImageUrlField";
import type { LandType, ProjectCard, ProjectKind } from "@/data/projects";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function linesToStrings(s: string): string[] {
  return s.split("\n").map((x) => x.trim()).filter(Boolean);
}

function stringsToLines(a: string[]): string {
  return a.join("\n");
}

function newProject(): ProjectCard {
  return {
    id: `p_${Date.now()}`,
    name: "",
    developer: "",
    locationSlug: "vashi",
    segmentSlug: "residential",
    kind: "under_construction",
    possessionLabel: "",
    brief: "",
    strengths: [],
    weaknesses: [],
    nearbyServices: [],
  };
}

export default function AdminPropertiesPage() {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [strengthsTxt, setStrengthsTxt] = useState("");
  const [weaknessesTxt, setWeaknessesTxt] = useState("");
  const [nearbyTxt, setNearbyTxt] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const selected = selectedId ? projects.find((p) => p.id === selectedId) : null;

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return projects;
    return projects.filter(
      (p) =>
        p.id.toLowerCase().includes(t) ||
        p.name.toLowerCase().includes(t) ||
        p.developer.toLowerCase().includes(t) ||
        p.locationSlug.toLowerCase().includes(t),
    );
  }, [projects, q]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/admin/projects", { cache: "no-store" });
        const json = (await res.json()) as { ok?: boolean; projects?: ProjectCard[]; error?: string };
        if (!res.ok || !json.ok || !json.projects) {
          if (!cancelled) setErr(json.error ?? "Failed to load");
          return;
        }
        if (!cancelled) {
          setProjects(json.projects);
          if (json.projects[0]) setSelectedId(json.projects[0].id);
        }
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "Error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    setStrengthsTxt(stringsToLines(selected.strengths));
    setWeaknessesTxt(stringsToLines(selected.weaknesses));
    setNearbyTxt(stringsToLines(selected.nearbyServices));
  }, [selected]);

  function updateSelected(patch: Partial<ProjectCard>) {
    if (!selectedId) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== selectedId) return p;
        return { ...p, ...patch };
      }),
    );
  }

  function applyListsToSelection() {
    if (!selectedId) return;
    updateSelected({
      strengths: linesToStrings(strengthsTxt),
      weaknesses: linesToStrings(weaknessesTxt),
      nearbyServices: linesToStrings(nearbyTxt),
    });
  }

  async function saveAll() {
    setSaving(true);
    setMsg(null);
    setErr(null);
    try {
      const body = projects.map((p) =>
        selectedId === p.id
          ? {
              ...p,
              strengths: linesToStrings(strengthsTxt),
              weaknesses: linesToStrings(weaknessesTxt),
              nearbyServices: linesToStrings(nearbyTxt),
            }
          : p,
      );

      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: body }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setErr(json.error ?? "Save failed");
        setSaving(false);
        return;
      }
      setProjects(body);
      setMsg(`Saved ${body.length} properties.`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
    }
    setSaving(false);
  }

  function addNew() {
    const n = newProject();
    setProjects((prev) => [...prev, n]);
    setSelectedId(n.id);
  }

  function removeSelected() {
    if (!selectedId) return;
    if (!window.confirm(`Delete ${selectedId}? This cannot be undone after save.`)) return;
    const idToRemove = selectedId;
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== idToRemove);
      setSelectedId(next[0]?.id ?? null);
      return next;
    });
  }

  const field =
    "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20";

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">{err ?? "Loading…"}</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px,minmax(0,1fr)]">
      <aside className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={addNew} className="rounded-full bg-teal-700 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-teal-800">
            Add property
          </button>
          <button type="button" onClick={removeSelected} disabled={!selectedId} className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-rose-800 hover:bg-rose-50 disabled:opacity-40">
            Delete
          </button>
        </div>
        <input
          className={field}
          placeholder="Search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <ul className="max-h-[520px] space-y-1 overflow-y-auto [scrollbar-width:thin]">
          {filtered.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`w-full rounded-2xl border px-3 py-2.5 text-left text-sm transition ${
                  selectedId === p.id
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-teal-300"
                }`}
              >
                <span className="block font-semibold">{p.name || "(untitled)"}</span>
                <span className="block text-[11px] opacity-80">{p.id}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-slate-900">Edit property</h2>
          <div className="flex gap-2">
            <Link href="/projects" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:border-teal-300">
              View shelf
            </Link>
            <button type="button" disabled={saving} onClick={saveAll} className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-slate-800 disabled:opacity-60">
              {saving ? "Saving…" : "Save all"}
            </button>
          </div>
        </div>
        {msg ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900">{msg}</p> : null}
        {err ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-900">{err}</p> : null}

        {!selected ? (
          <p className="text-sm text-slate-600">Select or add a property.</p>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                ID (URL)
                <input className={`${field} font-mono`} value={selected.id} onChange={(e) => updateSelected({ id: e.target.value.trim() })} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Name
                <input className={field} value={selected.name} onChange={(e) => updateSelected({ name: e.target.value })} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Developer
                <input className={field} value={selected.developer} onChange={(e) => updateSelected({ developer: e.target.value })} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Location slug
                <input className={field} value={selected.locationSlug} onChange={(e) => updateSelected({ locationSlug: e.target.value.trim().toLowerCase() })} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Segment slug
                <input className={field} value={selected.segmentSlug} onChange={(e) => updateSelected({ segmentSlug: e.target.value.trim().toLowerCase() })} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Kind
                <select
                  className={field}
                  value={selected.kind}
                  onChange={(e) => updateSelected({ kind: e.target.value as ProjectKind })}
                >
                  <option value="under_construction">Under construction</option>
                  <option value="resale">Resale</option>
                  <option value="rental">Rental</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Land type (optional)
                <select
                  className={field}
                  value={selected.landType ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    updateSelected({ landType: v === "" ? undefined : (v as LandType) });
                  }}
                >
                  <option value="">—</option>
                  <option value="agricultural">Agricultural</option>
                  <option value="na_plot">NA plot</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Possession label
                <input className={field} value={selected.possessionLabel} onChange={(e) => updateSelected({ possessionLabel: e.target.value })} />
              </label>
              <div className="sm:col-span-2">
                <AdminImageUrlField
                  label="Property image (URL or upload from this computer)"
                  value={selected.imageUrl ?? ""}
                  onChange={(v) => updateSelected({ imageUrl: v })}
                  hint="Paste any image URL, or choose a file — it will be saved under /content/uploads/ and linked automatically."
                />
              </div>
            </div>
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Brief
              <textarea className={`${field} min-h-[90px]`} value={selected.brief} onChange={(e) => updateSelected({ brief: e.target.value })} />
            </label>
            <div className="grid gap-4 lg:grid-cols-3">
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Strengths (line each)
                <textarea className={`${field} min-h-[140px]`} value={strengthsTxt} onChange={(e) => setStrengthsTxt(e.target.value)} onBlur={() => applyListsToSelection()} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Weaknesses (line each)
                <textarea className={`${field} min-h-[140px]`} value={weaknessesTxt} onChange={(e) => setWeaknessesTxt(e.target.value)} onBlur={() => applyListsToSelection()} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Nearby services (line each)
                <textarea className={`${field} min-h-[140px]`} value={nearbyTxt} onChange={(e) => setNearbyTxt(e.target.value)} onBlur={() => applyListsToSelection()} />
              </label>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
