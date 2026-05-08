import { getLocationsLive, getProjectsLive, getSegmentsLive } from "@/lib/content/live-data";
import { getSiteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const ts = new Date();

  const [locations, segments, projects] = await Promise.all([
    getLocationsLive(),
    getSegmentsLive(),
    getProjectsLive(),
  ]);

  const staticPaths = ["", "/segments", "/projects"] as const;

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: ts,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.85,
  }));

  const locationEntries: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: ts,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const segmentEntries: MetadataRoute.Sitemap = segments.map((s) => ({
    url: `${base}/segments/${s.slug}`,
    lastModified: ts,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const propertyEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/properties/${p.id}`,
    lastModified: ts,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticEntries, ...locationEntries, ...segmentEntries, ...propertyEntries];
}
