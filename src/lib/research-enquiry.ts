/** Stable IDs for analytics / CRM — pass as `step` query param to /enquire */
export const ResearchStep = {
  HEADER_NAV: "header_nav",
  HEADER_CONTACT: "header_contact",
  HOME_INTRO: "home_intro",
  HOME_LOCATIONS: "home_locations",
  HOME_DEPTH: "home_depth",
  LOCATIONS_ATLAS: "locations_atlas",
  LOCATION_DOSSIER: "location_dossier",
  SECTORS_ATLAS: "sectors_atlas",
  SECTOR_DOSSIER: "sector_dossier",
  PROPERTIES_SHELF: "properties_shelf",
  PROPERTY_DETAIL: "property_detail",
} as const;

export type ResearchStepId = (typeof ResearchStep)[keyof typeof ResearchStep];

const STEP_LABELS: Record<string, string> = {
  [ResearchStep.HEADER_NAV]: "Site header · Enquire shortcut",
  [ResearchStep.HEADER_CONTACT]: "Site header · Contact us",
  [ResearchStep.HOME_INTRO]: "Home · Introduction & hero",
  [ResearchStep.HOME_LOCATIONS]: "Home · Locations atlas section",
  [ResearchStep.HOME_DEPTH]: "Home · Deep dive (sectors / properties CTA)",
  [ResearchStep.LOCATIONS_ATLAS]: "Locations · Atlas & search",
  [ResearchStep.LOCATION_DOSSIER]: "Location · Micro-market dossier",
  [ResearchStep.SECTORS_ATLAS]: "Sectors · Atlas index",
  [ResearchStep.SECTOR_DOSSIER]: "Sector · Classification dossier",
  [ResearchStep.PROPERTIES_SHELF]: "Properties · Inventory shelf",
  [ResearchStep.PROPERTY_DETAIL]: "Property · Detail page",
};

export function buildEnquiryHref(opts: {
  step: ResearchStepId | string;
  slug?: string;
  title?: string;
  detail?: string;
}): string {
  const q = new URLSearchParams();
  q.set("step", opts.step);
  if (opts.slug) q.set("slug", opts.slug);
  if (opts.title) q.set("title", opts.title);
  if (opts.detail) q.set("detail", opts.detail.slice(0, 600));
  return `/enquire?${q.toString()}`;
}

export function formatResearchContextLine(opts: {
  step: string | null;
  slug?: string | null;
  title?: string | null;
  detail?: string | null;
}): string {
  const step = opts.step ?? "unknown_step";
  const base = STEP_LABELS[step] ?? `Research step · ${step}`;
  const parts = [base];
  if (opts.title?.trim()) parts.push(`Subject: ${opts.title.trim()}`);
  if (opts.slug?.trim()) parts.push(`Slug: ${opts.slug.trim()}`);
  if (opts.detail?.trim()) parts.push(opts.detail.trim());
  return parts.join(" · ");
}
