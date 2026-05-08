import type { LocationInsight } from "@/data/locations";
import type { ProjectCard } from "@/data/projects";
import type { SegmentProfile } from "@/data/segments";
import type { HomepageContent } from "@/data/homepage";
import { DEFAULT_HOMEPAGE_CONTENT } from "@/data/homepage";

export function isProjectCard(value: unknown): value is ProjectCard {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const landOk = v.landType === undefined || v.landType === "agricultural" || v.landType === "na_plot";
  const imageOk = v.imageUrl === undefined || typeof v.imageUrl === "string";
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.developer === "string" &&
    typeof v.locationSlug === "string" &&
    typeof v.segmentSlug === "string" &&
    (v.kind === "under_construction" || v.kind === "resale" || v.kind === "rental") &&
    imageOk &&
    typeof v.possessionLabel === "string" &&
    typeof v.brief === "string" &&
    Array.isArray(v.strengths) &&
    v.strengths.every((x) => typeof x === "string") &&
    Array.isArray(v.weaknesses) &&
    v.weaknesses.every((x) => typeof x === "string") &&
    Array.isArray(v.nearbyServices) &&
    v.nearbyServices.every((x) => typeof x === "string") &&
    landOk
  );
}

function isAreaDeveloper(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.name === "string" && typeof v.notableProjects === "string";
}

export function isLocationInsight(value: unknown): value is LocationInsight {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const coverOk = v.coverImageUrl === undefined || typeof v.coverImageUrl === "string";
  const galleryOk =
    v.galleryImageUrls === undefined ||
    (Array.isArray(v.galleryImageUrls) && v.galleryImageUrls.every((x) => typeof x === "string"));
  return (
    typeof v.slug === "string" &&
    typeof v.name === "string" &&
    typeof v.summary === "string" &&
    typeof v.lifestyle === "string" &&
    typeof v.connectivity === "string" &&
    coverOk &&
    galleryOk &&
    typeof v.futureGrowth === "string" &&
    typeof v.pastPerformance === "string" &&
    Array.isArray(v.strengths) &&
    v.strengths.every((x) => typeof x === "string") &&
    Array.isArray(v.weaknesses) &&
    v.weaknesses.every((x) => typeof x === "string") &&
    Array.isArray(v.imageHints) &&
    v.imageHints.every((x) => typeof x === "string") &&
    Array.isArray(v.topDevelopers) &&
    v.topDevelopers.every(isAreaDeveloper)
  );
}

export function isSegmentProfile(value: unknown): value is SegmentProfile {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const featureOk = v.featureImageUrl === undefined || typeof v.featureImageUrl === "string";
  return (
    typeof v.slug === "string" &&
    typeof v.title === "string" &&
    typeof v.summary === "string" &&
    featureOk &&
    typeof v.pastPerformance === "string" &&
    typeof v.presentPerformance === "string" &&
    Array.isArray(v.strengths) &&
    v.strengths.every((x) => typeof x === "string") &&
    Array.isArray(v.weaknesses) &&
    v.weaknesses.every((x) => typeof x === "string")
  );
}

export function mergeHomepageContent(stored: unknown): HomepageContent {
  if (!stored || typeof stored !== "object") return { ...DEFAULT_HOMEPAGE_CONTENT };
  const s = stored as Partial<HomepageContent>;
  const quotes = Array.isArray(s.tickerQuotes)
    ? s.tickerQuotes
        .filter((q): q is { text: string } => Boolean(q) && typeof (q as { text?: string }).text === "string")
        .map((q) => ({ text: q.text.trim() }))
        .filter((q) => q.text.length > 0)
    : DEFAULT_HOMEPAGE_CONTENT.tickerQuotes;
  return {
    metaDescription:
      typeof s.metaDescription === "string" && s.metaDescription.trim()
        ? s.metaDescription.trim()
        : DEFAULT_HOMEPAGE_CONTENT.metaDescription,
    heroTitle:
      typeof s.heroTitle === "string" && s.heroTitle.trim()
        ? s.heroTitle.trim()
        : DEFAULT_HOMEPAGE_CONTENT.heroTitle,
    heroEyebrow:
      typeof s.heroEyebrow === "string" && s.heroEyebrow.trim()
        ? s.heroEyebrow.trim()
        : DEFAULT_HOMEPAGE_CONTENT.heroEyebrow,
    heroCtaExplore:
      typeof s.heroCtaExplore === "string" && s.heroCtaExplore.trim()
        ? s.heroCtaExplore.trim()
        : DEFAULT_HOMEPAGE_CONTENT.heroCtaExplore,
    heroCtaPropertyType:
      typeof s.heroCtaPropertyType === "string" && s.heroCtaPropertyType.trim()
        ? s.heroCtaPropertyType.trim()
        : DEFAULT_HOMEPAGE_CONTENT.heroCtaPropertyType,
    tickerQuotes: quotes.length ? quotes : DEFAULT_HOMEPAGE_CONTENT.tickerQuotes,
  };
}
