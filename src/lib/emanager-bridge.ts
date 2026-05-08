/**
 * Connects the public storefront ("The Grix") to the eManager 360
 * operations portal. Enquiry submissions are POST'd here so they appear
 * directly inside the leads workspace.
 */

export type PropertyCategoryValue =
  | "residential"
  | "commercial"
  | "industrial"
  | "land";

export type PropertyNatureValue =
  | "under_construction"
  | "resale"
  | "rental"
  | "agricultural"
  | "na_plot";

export interface EnquirySubmission {
  fullName: string;
  email: string;
  phone: string;
  budget?: string;
  timeline?: string;
  currentLocation?: string;
  preferredCallbackTime?: string;
  /** Top-level intent (residential / commercial / industrial / land). */
  propertyCategory?: PropertyCategoryValue | "";
  /** Sub-classification within the category. */
  propertyNature?: PropertyNatureValue | "";
  researchStep?: string | null;
  researchSlug?: string | null;
  researchTitle?: string | null;
  researchDetail?: string | null;
}

export interface EnquiryAck {
  ok: true;
  id: string;
  createdAt: string;
}

export class EnquirySubmissionError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "EnquirySubmissionError";
  }
}

export function emanagerOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_EMANAGER_ORIGIN?.replace(/\/$/, "") ?? "http://localhost:3001"
  );
}

function normalize(payload: EnquirySubmission): Record<string, string> {
  const out: Record<string, string> = {};
  const set = (key: string, value: string | null | undefined) => {
    const v = (value ?? "").toString().trim();
    if (v) out[key] = v;
  };
  set("fullName", payload.fullName);
  set("email", payload.email);
  set("phone", payload.phone);
  set("budget", payload.budget);
  set("timeline", payload.timeline);
  set("currentLocation", payload.currentLocation);
  set("preferredCallbackTime", payload.preferredCallbackTime);
  set("propertyCategory", payload.propertyCategory ?? "");
  set("propertyNature", payload.propertyNature ?? "");
  set("researchStep", payload.researchStep ?? "");
  set("researchSlug", payload.researchSlug ?? "");
  set("researchTitle", payload.researchTitle ?? "");
  set("researchDetail", payload.researchDetail ?? "");
  return out;
}

export async function submitEnquiry(payload: EnquirySubmission): Promise<EnquiryAck> {
  const url = `${emanagerOrigin()}/api/inbound-leads`;
  const body = normalize(payload);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new EnquirySubmissionError(
      err instanceof Error ? err.message : "Network error",
      0,
    );
  }

  let json: { ok?: boolean; id?: string; createdAt?: string; error?: string } = {};
  try {
    json = await res.json();
  } catch {
    /* ignore */
  }

  if (!res.ok || !json.ok || !json.id) {
    throw new EnquirySubmissionError(
      json.error ?? `Server returned ${res.status}`,
      res.status,
    );
  }

  return { ok: true, id: json.id, createdAt: json.createdAt ?? new Date().toISOString() };
}
