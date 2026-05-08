import { AdminSectionNav } from "@/components/admin/AdminSectionNav";
import Link from "next/link";

export const metadata = {
  title: "Admin · The Grix",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-50 pb-14 pt-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <header className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/40 ring-1 ring-slate-900/[0.03] sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">Admin</p>
            <h1 className="font-display mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              The Grix content manager
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Each section is separate—homepage copy, inventory, dossiers, and sector pages. Edit, add, or remove records
              and save.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <AdminSectionNav />
            <Link
              href="/"
              className="inline-flex w-fit rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-slate-800"
            >
              ← Public website
            </Link>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

