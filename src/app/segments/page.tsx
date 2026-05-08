import { sectorFeatureImage } from "@/data/imagery";
import { getSegmentsLive } from "@/lib/content/live-data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const description =
  "Sector atlas for Navi Mumbai—compact, premium, commercial & industrial segments with performance posture, strengths, and friction points.";

export const metadata: Metadata = {
  title: "Property type",
  description,
  alternates: { canonical: "/segments" },
  openGraph: {
    title: "Property type · The Grix",
    description,
    url: "/segments",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property type · The Grix",
    description,
    images: ["/opengraph-image"],
  },
};

export default async function SegmentsIndex() {
  const segments = await getSegmentsLive();
  return (
    <div className="flex flex-col gap-12 pt-10 pb-12">
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-8">
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 hover:text-teal-800">
          ← Research home
        </Link>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-[3.25rem] md:leading-[1.1]">
          PROPERTY TYPE
        </h1>
        <Link
          href="/enquire"
          className="inline-flex min-h-[44px] w-fit items-center justify-center rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700 sm:min-h-0"
        >
          Contact / Enquire
        </Link>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {segments.map((s) => (
          <Link
            key={s.slug}
            href={`/segments/${s.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/50 ring-1 ring-slate-900/[0.03] transition hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/5"
          >
            <div className="relative aspect-[2/1] w-full overflow-hidden sm:aspect-[2.2/1]">
              <Image
                src={s.featureImageUrl?.trim() ? s.featureImageUrl : sectorFeatureImage(s.slug)}
                alt={`Illustrative imagery — ${s.title}`}
                fill
                className="object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-1 flex-col p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-teal-700">Property type</p>
              <h2 className="font-display mt-2 text-[1.35rem] font-semibold tracking-tight text-slate-900 sm:text-xl">
                {s.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{s.summary}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-teal-600/0 transition group-hover:text-teal-700">
                Open →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
