import "server-only";

import type { HomepageContent } from "@/data/homepage";
import { NAVI_MUMBAI_LOCATIONS } from "@/data/locations";
import { PROJECTS } from "@/data/projects";
import { SEGMENTS } from "@/data/segments";
import { readContent } from "@/lib/content/store";
import {
  isLocationInsight,
  isProjectCard,
  isSegmentProfile,
  mergeHomepageContent,
} from "@/lib/content/validators";
import type { LocationInsight } from "@/data/locations";
import type { ProjectCard } from "@/data/projects";
import type { SegmentProfile } from "@/data/segments";

export async function getProjectsLive(): Promise<ProjectCard[]> {
  const stored = await readContent<ProjectCard[]>("projects");
  if (stored && Array.isArray(stored)) {
    const list = stored.filter(isProjectCard);
    if (list.length) return list;
  }
  return PROJECTS;
}

export async function getLocationsLive(): Promise<LocationInsight[]> {
  const stored = await readContent<LocationInsight[]>("locations");
  if (stored && Array.isArray(stored)) {
    const list = stored.filter(isLocationInsight);
    if (list.length) return list;
  }
  return NAVI_MUMBAI_LOCATIONS;
}

export async function getLocationLive(slug: string): Promise<LocationInsight | undefined> {
  const locations = await getLocationsLive();
  return locations.find((l) => l.slug === slug);
}

export async function getSegmentsLive(): Promise<SegmentProfile[]> {
  const stored = await readContent<SegmentProfile[]>("segments");
  if (stored && Array.isArray(stored)) {
    const list = stored.filter(isSegmentProfile);
    if (list.length) return list;
  }
  return SEGMENTS;
}

export async function getSegmentLive(slug: string): Promise<SegmentProfile | undefined> {
  const segments = await getSegmentsLive();
  return segments.find((s) => s.slug === slug);
}

export async function getHomepageLive(): Promise<HomepageContent> {
  const stored = await readContent<unknown>("homepage");
  return mergeHomepageContent(stored ?? null);
}
