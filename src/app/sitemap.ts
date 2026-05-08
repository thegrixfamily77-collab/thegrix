import { NAVI_MUMBAI_LOCATIONS } from "@/data/locations";
import { SEGMENTS } from "@/data/segments";
import { getSiteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const ts = new Date();

  const staticPaths = ["", "/segments", "/projects"] as const;

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: ts,
    changeFrequency: path === "" ? "weekly" : "weekly",
    priority: path === "" ? 1 : 0.85,
  }));

  const locationEntries: MetadataRoute.Sitemap = NAVI_MUMBAI_LOCATIONS.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: ts,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const segmentEntries: MetadataRoute.Sitemap = SEGMENTS.map((s) => ({
    url: `${base}/segments/${s.slug}`,
    lastModified: ts,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...locationEntries, ...segmentEntries];
}
