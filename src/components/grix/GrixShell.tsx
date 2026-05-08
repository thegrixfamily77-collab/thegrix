import { IMAGE_ATTRIBUTION } from "@/data/imagery";
import { ResearchStep, buildEnquiryHref } from "@/lib/research-enquiry";
import Link from "next/link";

export function GrixShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grix-mesh relative flex min-h-dvh flex-col">
      <div className="pointer-events-none fixed inset-0 grix-grid-bg opacity-[0.65]" aria-hidden />
      <a
        href="#grix-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl px-4 pt-3 sm:pt-4">
          <div className="w-full rounded-[999px] border border-slate-200/90 bg-white/80 px-4 py-3 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.04] backdrop-blur-xl sm:px-5 sm:py-3.5">
            <div className="flex w-full items-center justify-between gap-3">
              <Link href="/" className="group flex min-w-0 flex-col leading-tight">
                <span className="font-display text-[1.55rem] font-semibold tracking-tight text-slate-900 transition group-hover:text-teal-900 sm:text-[1.8rem]">
                  THE GRIX
                </span>
                <span className="grix-eyebrow mt-1 text-[9px] font-semibold uppercase tracking-[0.38em] text-slate-600 sm:text-[10px]">
                  RESEARCH&nbsp;|&nbsp;TRUST&nbsp;|&nbsp;INVEST
                </span>
              </Link>

              <nav className="flex shrink-0 items-center justify-end gap-2 sm:gap-3" aria-label="Header">
                <Link
                  href={buildEnquiryHref({ step: ResearchStep.HEADER_CONTACT })}
                  className="min-h-[40px] shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-800 shadow-sm transition hover:border-teal-300 hover:bg-teal-50/90 sm:min-h-0 sm:px-4 sm:py-2 sm:text-[15px]"
                >
                  Contact us
                </Link>
                <Link
                  href="/login"
                  className="min-h-[40px] shrink-0 rounded-full bg-slate-900 px-3 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:min-h-0 sm:px-4 sm:py-2 sm:text-[15px]"
                >
                  Login / Sign up
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main
        id="grix-main"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-0 text-[15px] leading-relaxed sm:text-base sm:leading-relaxed"
      >
        {children}
      </main>
      <footer className="relative z-10 border-t border-slate-200/90 bg-white py-12 text-[15px] leading-relaxed text-slate-600 shadow-[0_-1px_0_rgba(15,23,42,0.03)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="font-display text-xl font-semibold text-slate-900">The Grix</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              One calm workspace for Navi Mumbai micro-markets—locations, sectors, and inventory signals for deeper due
              diligence. Not transactional advice; verify independently before decisions.
            </p>
            <p className="mt-4 text-xs text-slate-500">{IMAGE_ATTRIBUTION}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="font-semibold text-slate-700 hover:text-teal-900" href="/#locations">
                  Locations
                </Link>
              </li>
              <li>
                <Link className="font-semibold text-slate-700 hover:text-indigo-900" href="/segments">
                  Sectors
                </Link>
              </li>
              <li>
                <Link className="font-semibold text-slate-700 hover:text-indigo-900" href="/projects">
                  Properties
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="font-semibold text-slate-700 hover:text-slate-900" href="/about">
                  About us
                </Link>
              </li>
              <li>
                <Link className="font-semibold text-slate-700 hover:text-slate-900" href="/careers">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="font-semibold text-slate-700 hover:text-slate-900" href="/privacy-policy">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-slate-700 hover:text-teal-900"
                  href={buildEnquiryHref({ step: ResearchStep.HEADER_CONTACT })}
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link className="font-semibold text-slate-700 hover:text-slate-900" href="/investors">
                  For investors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-white/70 px-6 py-6 shadow-sm ring-1 ring-slate-900/[0.03] backdrop-blur sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Follow us</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              <a
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-teal-300 hover:bg-teal-50/40"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                Instagram · @thegrix
              </a>
              <a
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/40"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                Facebook · /thegrix
              </a>
              <a
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/40"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn · The Grix
              </a>
              <a
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                X (Twitter) · @thegrix
              </a>
              <a
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-rose-300 hover:bg-rose-50/30"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                YouTube · The Grix
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-4">
          <div className="flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} The Grix. All rights reserved.</p>
            <p>Built for clarity-first research.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
