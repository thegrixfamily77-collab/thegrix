import type { Metadata } from "next";

import { HeroLocationSlideshow } from "@/components/grix/HeroLocationSlideshow";
import { AwardsAndCultureSection } from "@/components/grix/AwardsAndCultureSection";
import { InvestmentQuotesTicker } from "@/components/grix/InvestmentQuotesTicker";
import { LeadershipSection } from "@/components/grix/LeadershipSection";
import { LocationExplorerFromUrl } from "@/components/grix/LocationExplorerFromUrl";
import { TrendingPulseSection } from "@/components/grix/TrendingPulseSection";
import { VideoReviewsCarousel } from "@/components/grix/VideoReviewsCarousel";
import { locationCoverUrl } from "@/data/imagery";
import { getHomepageLive, getLocationsLive, getProjectsLive } from "@/lib/content/live-data";
import Link from "next/link";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomepageLive();
  const description = home.metaDescription;

  return {
    title: {
      absolute: "The Grix — Navi Mumbai Real Estate Research Atlas",
    },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title: "The Grix · Navi Mumbai Real Estate Research Atlas",
      description,
      url: "/",
      type: "website",
      locale: "en_IN",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "The Grix research atlas" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "The Grix · Navi Mumbai Real Estate Research Atlas",
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function HomePage() {
  const locations = await getLocationsLive();
  const projects = await getProjectsLive();
  const home = await getHomepageLive();

  const previews = [...locations]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((l) => ({
      slug: l.slug,
      name: l.name,
      summary: l.summary,
      imageSrc: l.coverImageUrl?.trim() ? l.coverImageUrl : locationCoverUrl(l.slug),
    }));

  const slides = previews.map((l) => ({ slug: l.slug, src: l.imageSrc, label: l.name }));

  return (
    <div className="flex flex-col gap-12 pb-10">
      <section className="relative -mx-4 mt-4 w-[calc(100%+2rem)] sm:mt-5">
        <HeroLocationSlideshow
          className="max-w-none"
          heightClassName="h-[calc(100dvh-132px)] min-h-[540px] w-full"
          slides={slides}
        />
        <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex flex-col items-center gap-2 px-4 sm:top-10">
          <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {home.heroTitle}
          </p>
          <p className="grix-eyebrow text-[10px] font-semibold uppercase tracking-[0.36em] text-white/90 sm:text-[11px]">
            {home.heroEyebrow}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-3 px-4 sm:bottom-8 sm:flex-row sm:justify-center">
          <Link
            href="/#locations"
            className="min-h-[44px] rounded-full bg-white/95 px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-950/10 backdrop-blur transition hover:bg-white sm:min-h-0"
          >
            {home.heroCtaExplore}
          </Link>
          <Link
            href="/segments"
            className="min-h-[44px] rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25 shadow-lg shadow-slate-950/10 backdrop-blur transition hover:bg-white/15 sm:min-h-0"
          >
            {home.heroCtaPropertyType}
          </Link>
        </div>
      </section>

      <section id="locations" className="scroll-mt-24 flex flex-col gap-6 sm:scroll-mt-28 sm:gap-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between sm:pb-6">
          <div className="min-w-0 flex-1">
            <div className="mt-4 w-full">
              <InvestmentQuotesTicker quotes={home.tickerQuotes} />
            </div>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-lg shadow-slate-200/45 ring-1 ring-slate-900/[0.04] backdrop-blur">
              <div className="h-12 w-full max-w-xl animate-pulse rounded-2xl bg-slate-100" />
              <div className="mt-3 h-4 w-48 animate-pulse rounded bg-slate-100" />
            </div>
          }
        >
          <LocationExplorerFromUrl locations={previews} />
        </Suspense>
      </section>

      <TrendingPulseSection locations={locations} projects={projects} />
      <VideoReviewsCarousel />
      <LeadershipSection />
      <AwardsAndCultureSection />
    </div>
  );
}
