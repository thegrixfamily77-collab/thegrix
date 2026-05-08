"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const TOKEN_KEY = "grix_admin_token_v1";

function useAdminToken() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const saved = window.localStorage.getItem(TOKEN_KEY) ?? "";
    setToken(saved);
  }, []);
  function save(next: string) {
    setToken(next);
    window.localStorage.setItem(TOKEN_KEY, next);
  }
  function clear() {
    setToken("");
    window.localStorage.removeItem(TOKEN_KEY);
  }
  return { token, save, clear };
}

async function ping(token: string): Promise<string | null> {
  try {
    const res = await fetch("/api/admin/segments", {
      headers: { "x-admin-token": token },
      cache: "no-store",
    });
    if (res.ok) return null;
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    return json.error ?? `HTTP ${res.status}`;
  } catch (err) {
    return err instanceof Error ? err.message : "Network error";
  }
}

export default function AdminDashboardPage() {
  const { token, save, clear } = useAdminToken();
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<"unknown" | "ok" | "bad">("unknown");
  const [message, setMessage] = useState<string | null>(null);

  const tokenMasked = useMemo(() => (token ? `${token.slice(0, 3)}••••••${token.slice(-2)}` : "—"), [token]);

  async function check() {
    setChecking(true);
    setMessage(null);
    const err = await ping(token);
    setChecking(false);
    if (err) {
      setStatus("bad");
      setMessage(err);
      return;
    }
    setStatus("ok");
  }

  useEffect(() => {
    if (!token) return;
    void check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-slate-900">Admin access</h2>
            <p className="mt-2 text-sm text-slate-600">
              Set your token once. It stays in your browser (localStorage) and is sent as <code>x-admin-token</code>.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Current token: <span className="font-mono tracking-normal text-slate-700">{tokenMasked}</span>
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-[360px]">
            <input
              value={token}
              onChange={(e) => save(e.target.value)}
              placeholder="Paste ADMIN_TOKEN"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={check}
                disabled={!token || checking}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checking ? "Checking…" : "Validate token"}
              </button>
              <button
                type="button"
                onClick={clear}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-rose-300 hover:bg-rose-50/40"
              >
                Clear
              </button>
            </div>
            <div className="text-sm">
              {status === "ok" ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">
                  Token OK. You can manage content now.
                </p>
              ) : status === "bad" ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-900">
                  Token failed: {message}
                </p>
              ) : (
                <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  Not validated yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {(
          [
            { href: "/admin/projects", title: "Projects / Properties", desc: "Inventory cards and property detail data." },
            { href: "/admin/locations", title: "Locations", desc: "Dossier copy, strengths/weaknesses, developer lists." },
            { href: "/admin/segments", title: "Segments", desc: "Sector theses and performance narratives." },
          ] as const
        ).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] transition hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-teal-700">Manage</p>
            <h3 className="font-display mt-2 text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-teal-700/0 transition group-hover:text-teal-700">
              Open →
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}

