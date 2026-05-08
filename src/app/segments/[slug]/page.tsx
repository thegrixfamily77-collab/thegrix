import { LocationCard } from "@/components/grix/LocationCard";
import { sectorFeatureImage } from "@/data/imagery";
import { locationCoverUrl } from "@/data/imagery";
import { NAVI_MUMBAI_LOCATIONS } from "@/data/locations";
import { SEGMENTS, getSegment } from "@/data/segments";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEGMENTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seg = getSegment(slug);
  if (!seg) {
    return { title: "Property type · The Grix" };
  }
  const desc = seg.summary;
  const hero = sectorFeatureImage(slug);
  const ogImages = [{ url: hero, width: 1200, height: 630, alt: `${seg.title} — illustrative sector context` }];

  return {
    title: `${seg.title} · Property type`,
    description: desc,
    alternates: { canonical: `/segments/${slug}` },
    openGraph: {
      title: `${seg.title} · The Grix`,
      description: desc,
      url: `/segments/${slug}`,
      type: "article",
      locale: "en_IN",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${seg.title} · The Grix`,
      description: desc,
      images: [hero],
    },
  };
}

export default async function SegmentDetail({ params }: Props) {
  const { slug } = await params;
  const seg = getSegment(slug);
  if (!seg) notFound();
  const locationPreviews = [...NAVI_MUMBAI_LOCATIONS]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((l) => ({
      slug: l.slug,
      name: l.name,
      summary: l.summary,
      imageSrc: locationCoverUrl(l.slug),
    }));

  return (
    <div className="flex flex-col gap-10 pt-10 pb-12">
      <header className="flex flex-col gap-6">
        <Link
          href="/segments"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 hover:text-teal-800"
        >
          ← Property type
        </Link>
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-900/[0.04]">
          <div className="relative aspect-[21/9] min-h-[160px] w-full sm:aspect-[24/9]">
            <Image
              src={sectorFeatureImage(slug)}
              alt={`${seg.title} — illustrative sector context`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-teal-300">
                Property type
              </p>
              <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-white sm:text-[2.5rem] sm:leading-tight">
                {seg.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">{seg.summary}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-lg shadow-slate-200/45 ring-1 ring-slate-900/[0.04] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.9rem]">
              LOCATIONS
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Choose a location to continue.
            </p>
          </div>
          <Link href="/#locations" className="text-sm font-semibold text-teal-700 hover:text-teal-900">
            Browse atlas home →
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {locationPreviews.map((l) => (
            <LocationCard
              key={l.slug}
              slug={`${l.slug}?segment=${encodeURIComponent(slug)}`}
              name={l.name}
              summary={l.summary}
              imageSrc={l.imageSrc}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
