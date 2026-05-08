"use client";

import type { HomepageContent } from "@/data/homepage";
import Link from "next/link";
import { useEffect, useState } from "react";

function linesToQuotes(raw: string): { text: string }[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((text) => ({ text }));
}

function quotesToLines(quotes: { text: string }[]): string {
  return quotes.map((q) => q.text).join("\n");
}

export default function AdminHomepagePage() {
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [quotesText, setQuotesText] = useState("");
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/admin/homepage", { cache: "no-store" });
        const json = (await res.json()) as { ok?: boolean; homepage?: HomepageContent; error?: string };
        if (!res.ok || !json.ok || !json.homepage) {
          if (!cancelled) setErr(json.error ?? "Failed to load");
          return;
        }
        if (!cancelled) {
          setHomepage(json.homepage);
          setQuotesText(quotesToLines(json.homepage.tickerQuotes));
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

  async function save() {
    if (!homepage) return;
    setSaving(true);
    setSaveMsg(null);
    setErr(null);
    const next: HomepageContent = {
      ...homepage,
      tickerQuotes: linesToQuotes(quotesText),
    };
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homepage: next }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setErr(json.error ?? "Save failed");
        setSaving(false);
        return;
      }
      const re = await fetch("/api/admin/homepage", { cache: "no-store" });
      const j2 = (await re.json()) as { homepage?: HomepageContent };
      if (j2.homepage) {
        setHomepage(j2.homepage);
        setQuotesText(quotesToLines(j2.homepage.tickerQuotes));
      }
      setSaveMsg("Saved. Refresh the public homepage to see changes.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
    }
    setSaving(false);
  }

  if (loading || !homepage) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
        {err ? err : "Loading homepage copy…"}
      </div>
    );
  }

  const field =
    "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">Section</p>
          <h2 className="font-display mt-1 text-xl font-semibold text-slate-900">Homepage</h2>
          <p className="mt-1 text-sm text-slate-600">Hero text, SEO description, and rotating quotes above locations.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm hover:border-teal-300"
            target="_blank"
            rel="noreferrer"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save homepage"}
          </button>
        </div>
      </div>

      {saveMsg ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{saveMsg}</p>
      ) : null}
      {err ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">{err}</p> : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          Meta description (SEO / social)
          <textarea
            className={`${field} min-h-[100px]`}
            value={homepage.metaDescription}
            onChange={(e) => setHomepage({ ...homepage, metaDescription: e.target.value })}
          />
        </label>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
            Hero title
            <input
              className={field}
              value={homepage.heroTitle}
              onChange={(e) => setHomepage({ ...homepage, heroTitle: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
            Hero eyebrow
            <input
              className={field}
              value={homepage.heroEyebrow}
              onChange={(e) => setHomepage({ ...homepage, heroEyebrow: e.target.value })}
            />
          </label>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          Primary CTA label
          <input
            className={field}
            value={homepage.heroCtaExplore}
            onChange={(e) => setHomepage({ ...homepage, heroCtaExplore: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          Secondary CTA label
          <input
            className={field}
            value={homepage.heroCtaPropertyType}
            onChange={(e) => setHomepage({ ...homepage, heroCtaPropertyType: e.target.value })}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
        Investment quotes (one line per quote)
        <textarea
          className={`${field} min-h-[220px] font-mono text-[13px]`}
          value={quotesText}
          onChange={(e) => setQuotesText(e.target.value)}
        />
      </label>
    </div>
  );
}
