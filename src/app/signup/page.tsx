"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [notice, setNotice] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void fetch("/api/analytics/signup", { method: "POST", keepalive: true }).catch(() => {});
    setNotice(true);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 pt-10 pb-12">
      <div>
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 hover:text-teal-800">
          ← Back home
        </Link>
        <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-slate-900">Sign up</h1>
        <p className="mt-3 text-slate-600">
          Create an account to bookmark dossiers and sync preferences. Registration is not wired yet—drop in your auth
          stack when ready.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 ring-1 ring-slate-900/[0.04]"
      >
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
          Name
          <input
            name="name"
            type="text"
            autoComplete="name"
            className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
            placeholder="you@example.com"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
          Password
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
            placeholder="Choose a password"
          />
        </label>
        <button
          type="submit"
          className="min-h-[44px] rounded-full bg-gradient-to-r from-teal-700 to-teal-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700"
        >
          Create account
        </button>
        {notice ? (
          <p className="rounded-xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-700">
            Demo only—hook your signup API or OAuth here.
          </p>
        ) : null}
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-teal-800 hover:text-teal-900">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
