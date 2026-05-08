import { EnquireStepLink } from "@/components/grix/EnquireStepLink";
import { propertyCardImage } from "@/data/imagery";
import { getLocation } from "@/data/locations";
import { PROJECTS } from "@/data/projects";
import { SEGMENTS } from "@/data/segments";
import { ResearchStep } from "@/lib/research-enquiry";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return { title: "Property · The Grix" };
  return {
    title: `${p.name} · Property`,
    description: p.brief,
    alternates: { canonical: `/properties/${id}` },
    openGraph: {
      title: `${p.name} · The Grix`,
      description: p.brief,
      url: `/properties/${id}`,
      images: [{ url: propertyCardImage(id), width: 1200, height: 630, alt: p.name }],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) notFound();

  const loc = getLocation(p.locationSlug);
  const segTitle = SEGMENTS.find((s) => s.slug === p.segmentSlug)?.title ?? p.segmentSlug;

  const hero = propertyCardImage(id);
  const gallery = [hero, propertyCardImage(`${id}-b`), propertyCardImage(`${id}-c`)];

  return (
    <div className="flex flex-col gap-12 pt-10 pb-12">
      <header className="flex flex-col gap-6">
        <Link
          href="/projects"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 hover:text-teal-800"
        >
          ← Back to properties
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-900/[0.04]">
          <div className="relative aspect-[21/9] min-h-[180px] w-full sm:aspect-[24/9]">
            <Image src={hero} alt={p.name} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 1152px" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-teal-300 sm:text-[11px] sm:tracking-[0.35em]">
                Property detail
              </p>
              <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-white sm:text-[2.6rem] sm:leading-tight">
                {p.name}
              </h1>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
                {loc?.name ?? p.locationSlug} · {segTitle} ·{" "}
                {p.kind === "under_construction" ? "UNDER CONSTRUCTION" : p.kind === "resale" ? "RESALE" : "RENTAL"}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">{p.brief}</p>
            </div>
          </div>
        </div>

        <EnquireStepLink
          step={ResearchStep.PROPERTY_DETAIL}
          slug={p.id}
          title={p.name}
          detail={`${p.locationSlug} · ${p.segmentSlug} · ${p.kind}${p.landType ? ` · ${p.landType}` : ""}`}
          variant="primary"
          className="w-fit"
        >
          ENQUIRE NOW
        </EnquireStepLink>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {gallery.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/45 ring-1 ring-slate-900/[0.03]"
          >
            <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-emerald-900">Strengths</h2>
          <ul className="mt-4 space-y-2 text-sm text-emerald-900/90">
            {p.strengths.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-rose-200 bg-rose-50/80 p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-rose-900">Weaknesses</h2>
          <ul className="mt-4 space-y-2 text-sm text-rose-900/90">
            {p.weaknesses.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-slate-900">Nearest services</h2>
            <p className="mt-1 text-sm text-slate-600">Illustrative map placeholder + quick service checklist.</p>
          </div>
          <Link className="text-sm font-semibold text-teal-700 hover:text-teal-900" href={`/locations/${p.locationSlug}`}>
            View location →
          </Link>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 shadow-md">
            <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_25%_25%,rgba(13,148,136,0.35),transparent_56%),radial-gradient(circle_at_70%_70%,rgba(79,70,229,0.4),transparent_52%)]" />
            <div className="relative flex h-56 items-center justify-center">
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white ring-1 ring-white/25 backdrop-blur">
                Map placeholder
              </span>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {p.nearbyServices.map((s) => (
              <li
                key={s}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

