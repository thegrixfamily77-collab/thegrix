import { locationCoverUrl } from "@/data/imagery";
import type { LandType, ProjectKind } from "@/data/projects";
import { getLocationLive, getProjectsLive, getSegmentsLive } from "@/lib/content/live-data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = await getLocationLive(slug);
  if (!loc) return { title: "Properties · The Grix" };
  return {
    title: `${loc.name} · Properties`,
    description: `Filtered property list for ${loc.name}.`,
    alternates: { canonical: `/locations/${slug}/properties` },
    openGraph: {
      title: `${loc.name} · Properties · The Grix`,
      description: `Filtered property list for ${loc.name}.`,
      url: `/locations/${slug}/properties`,
      images: [{ url: locationCoverUrl(slug), width: 1200, height: 630, alt: `${loc.name} cover` }],
    },
  };
}

function asKind(v: unknown): ProjectKind | null {
  return v === "under_construction" || v === "resale" || v === "rental" ? v : null;
}

function asLandType(v: unknown): LandType | null {
  return v === "agricultural" || v === "na_plot" ? v : null;
}

export default async function LocationPropertiesPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const loc = await getLocationLive(slug);
  if (!loc) notFound();

  const segments = await getSegmentsLive();
  const sp = (await searchParams) ?? {};
  const kind = asKind(typeof sp.kind === "string" ? sp.kind : null);
  const segment = typeof sp.segment === "string" ? sp.segment : null;
  const landType = asLandType(typeof sp.land === "string" ? sp.land : null);
  const segmentTitle = segment ? segments.find((s) => s.slug === segment)?.title : null;
  const cover = locationCoverUrl(slug);

  const projects = await getProjectsLive();
  const allHere = projects.filter((p) => p.locationSlug === slug);
  const filtered = allHere.filter((p) => {
    if (segment && p.segmentSlug !== segment) return false;
    if (segment === "land") {
      if (landType && p.landType !== landType) return false;
      return true;
    }
    if (kind && p.kind !== kind) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-10 pt-10 pb-12">
      <header className="flex flex-col gap-6">
        <Link
          href={`/locations/${slug}${segment ? `?segment=${encodeURIComponent(segment)}` : ""}`}
          className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 hover:text-teal-800"
        >
          ← Back to {loc.name}
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-900/[0.04]">
          <div className="relative aspect-[21/9] min-h-[160px] w-full sm:aspect-[24/9]">
            <Image
              src={cover}
              alt={`${loc.name} — illustrative urban context`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-teal-300 sm:text-[11px] sm:tracking-[0.35em]">
                Properties · {loc.name}
              </p>
              <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-white sm:text-[2.5rem] sm:leading-tight">
                {segment === "land"
                  ? landType === "agricultural"
                    ? "AGRICULTURAL"
                    : landType === "na_plot"
                      ? "NA PLOT"
                      : "LAND"
                  : kind === "under_construction"
                    ? "UNDER CONSTRUCTION"
                    : kind === "resale"
                      ? "RESALE"
                      : kind === "rental"
                        ? "RENTAL"
                      : "ALL"}
              </h1>
              {segmentTitle ? (
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
                  Segment: {segmentTitle}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> item(s).
          </p>
          <div className="flex flex-wrap gap-2">
            {segment === "land" ? (
              <>
                <Link
                  href={`/locations/${slug}/properties?segment=land&land=agricultural`}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    landType === "agricultural"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  Agricultural
                </Link>
                <Link
                  href={`/locations/${slug}/properties?segment=land&land=na_plot`}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    landType === "na_plot"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  NA plot
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/locations/${slug}/properties?kind=under_construction${segment ? `&segment=${encodeURIComponent(segment)}` : ""}`}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    kind === "under_construction"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  Under construction
                </Link>
                <Link
                  href={`/locations/${slug}/properties?kind=resale${segment ? `&segment=${encodeURIComponent(segment)}` : ""}`}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    kind === "resale"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  Resale
                </Link>
                <Link
                  href={`/locations/${slug}/properties?kind=rental${segment ? `&segment=${encodeURIComponent(segment)}` : ""}`}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    kind === "rental"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  Rental
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-slate-600">No tagged samples for this filter.</p>
          ) : (
            filtered.map((p) => (
              <Link
                key={p.id}
                href={`/properties/${p.id}`}
                className="block rounded-xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition hover:border-teal-300 hover:bg-teal-50/30"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-800">
                    {p.kind === "under_construction"
                      ? "Under construction"
                      : p.kind === "resale"
                        ? "Resale"
                        : "Rental"}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {p.possessionLabel}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900">{p.name}</p>
                <p className="mt-1 text-xs text-slate-600">{p.developer}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{p.brief}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

