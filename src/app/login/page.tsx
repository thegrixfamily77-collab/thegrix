"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [notice, setNotice] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(true);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 pt-10 pb-12">
      <div>
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 hover:text-teal-800">
          ← Back home
        </Link>
        <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-slate-900">Log in</h1>
        <p className="mt-3 text-slate-600">
          Access your saved research workspace. Authentication is not wired yet—this screen is ready for your auth
          provider.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 ring-1 ring-slate-900/[0.04]"
      >
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
            autoComplete="current-password"
            className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="min-h-[44px] rounded-full bg-gradient-to-r from-teal-700 to-teal-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700"
        >
          Log in
        </button>
        {notice ? (
          <p className="rounded-xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-700">
            Demo only—connect NextAuth, Clerk, or your API here.
          </p>
        ) : null}
        <p className="text-center text-sm text-slate-600">
          No account?{" "}
          <Link href="/signup" className="font-semibold text-teal-800 hover:text-teal-900">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
