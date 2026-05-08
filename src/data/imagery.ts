/**
 * Royalty-free photos via Unsplash (https://unsplash.com/license) — free to use, illustrative context only.
 * Not depicting specific marketed properties.
 */

import { NAVI_MUMBAI_LOCATIONS } from "./locations";

export const IMAGE_ATTRIBUTION = "Imagery: Unsplash (free license)";

export function heroImageUrl(): string {
  return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85";
}

/** Hero carousel timing (ms). */
export const HERO_SLIDE_INTERVAL_MS = 3000;

function hqUnsplash(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("w", "1920");
    u.searchParams.set("q", "85");
    return u.toString();
  } catch {
    return url;
  }
}

/** Home hero: every atlas location, A→Z, high-res covers only. */
export function heroLocationSlides(): { slug: string; src: string; label: string }[] {
  const sorted = [...NAVI_MUMBAI_LOCATIONS].sort((a, b) => a.name.localeCompare(b.name));
  return sorted.map((l) => ({
    slug: l.slug,
    src: hqUnsplash(locationCoverUrl(l.slug)),
    label: l.name,
  }));
}

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80";

const LOCATION_COVERS: Record<string, string> = {
  airoli:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  belapur:
    "https://images.unsplash.com/photo-1467269204594-9667b56d8d8b?auto=format&fit=crop&w=900&q=80",
  dronagiri:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  ghansoli:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  juinagar:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
  kalamboli:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  kalwa:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
  kamothe:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  kharghar:
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80",
  koparkhairane:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  nerul:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  rabale:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
  sanpada:
    "https://images.unsplash.com/photo-1479839672679-a46483c0e7f8?auto=format&fit=crop&w=900&q=80",
  seawoods:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
  taloja:
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
  turbhe:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  ulwe:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
  vashi:
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80",
};

export function locationCoverUrl(slug: string): string {
  return LOCATION_COVERS[slug] ?? FALLBACK_COVER;
}

/** Three contextual tiles per dossier — cycles pool by slug for variety */
export function locationGalleryTiles(slug: string): string[] {
  const pool = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
  ];
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 1)) % pool.length;
  return [pool[h % pool.length], pool[(h + 2) % pool.length], pool[(h + 4) % pool.length]];
}

export function sectorFeatureImage(slug: string): string {
  const map: Record<string, string> = {
    residential:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    commercial:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    industrial:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    land:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  };
  return (
    map[slug] ??
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
  );
}

const PROPERTY_SHOTS = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80",
];

export function propertyCardImage(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i)) % PROPERTY_SHOTS.length;
  return PROPERTY_SHOTS[h];
}
