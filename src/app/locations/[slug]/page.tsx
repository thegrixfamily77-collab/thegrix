import { LocationPropertiesShelf } from "@/components/grix/LocationPropertiesShelf";
import { locationCoverUrl, locationGalleryTiles } from "@/data/imagery";
import { NAVI_MUMBAI_LOCATIONS, getLocation } from "@/data/locations";
import { PROJECTS } from "@/data/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return NAVI_MUMBAI_LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) {
    return { title: "Location · The Grix" };
  }
  const desc = loc.summary;
  const cover = locationCoverUrl(slug);
  const ogImages = [{ url: cover, width: 1200, height: 630, alt: `${loc.name} — illustrative urban context` }];

  return {
    title: `${loc.name} · Location dossier`,
    description: desc,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: {
      title: `${loc.name} · The Grix`,
      description: desc,
      url: `/locations/${slug}`,
      type: "article",
      locale: "en_IN",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${loc.name} · The Grix`,
      description: desc,
      images: [cover],
    },
  };
}

export default async function LocationPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const projectsHere = PROJECTS.filter((p) => p.locationSlug === slug);
  const tiles = locationGalleryTiles(slug);
  const cover = locationCoverUrl(slug);
  const sp = (await searchParams) ?? {};
  const segment = typeof sp.segment === "string" ? sp.segment : undefined;

  return (
    <div className="flex flex-col gap-12 pt-10 pb-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 hover:text-teal-800"
          >
            ← Research home
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-900/[0.04]">
          <div className="relative aspect-[21/9] min-h-[180px] w-full sm:aspect-[24/9]">
            <Image
              src={cover}
              alt={`${loc.name} — illustrative urban context`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-teal-300 sm:text-[11px] sm:tracking-[0.35em]">
                Location intelligence
              </p>
              <h1 className="font-display mt-2 text-2xl font-semibold tracking-tight text-white sm:text-[2.5rem] sm:leading-tight md:text-4xl">
                {loc.name}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-200 sm:mt-3 sm:text-base">{loc.summary}</p>
            </div>
          </div>
        </div>
      </div>

      <LocationPropertiesShelf locationSlug={slug} projects={projectsHere} initialSegmentSlug={segment} />

      <section className="grid gap-4 lg:grid-cols-3">
        {loc.imageHints.map((hint, idx) => {
          const src = tiles[idx] ?? tiles[0];
          return (
            <div
              key={hint}
              className="relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl border border-slate-200 shadow-md ring-1 ring-slate-900/[0.03]"
            >
              <Image src={src} alt={hint} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
              <div className="relative z-10 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-300">
                  Signal {idx + 1}
                </p>
                <p className="mt-2 text-sm leading-snug text-white">{hint}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-emerald-900">Strengths</h2>
          <ul className="mt-4 space-y-2 text-sm text-emerald-900/90">
            {loc.strengths.map((s) => (
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
            {loc.weaknesses.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
        <h2 className="font-display text-xl font-semibold text-slate-900">Connectivity details</h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">{loc.connectivity}</p>
      </section>

    </div>
  );
}
