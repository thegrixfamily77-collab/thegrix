import Link from "next/link";

export const metadata = {
  title: "Admin · The Grix",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-8 pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/40 ring-1 ring-slate-900/[0.03] sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">Admin</p>
            <h1 className="font-display mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              The Grix content manager
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Add, edit, and delete every content detail safely. Requires the admin token.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm hover:border-teal-300 hover:text-slate-900"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-slate-800"
            >
              Back to site
            </Link>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

