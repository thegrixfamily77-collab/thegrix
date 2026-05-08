"use client";

import {
  submitEnquiry,
  EnquirySubmissionError,
  type PropertyCategoryValue,
  type PropertyNatureValue,
} from "@/lib/emanager-bridge";
import { formatResearchContextLine } from "@/lib/research-enquiry";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const PROPERTY_CATEGORIES: ReadonlyArray<{ value: PropertyCategoryValue; label: string }> = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "land", label: "Land" },
] as const;

const NATURE_BY_CATEGORY: Record<
  PropertyCategoryValue,
  ReadonlyArray<{ value: PropertyNatureValue; label: string }>
> = {
  residential: [
    { value: "under_construction", label: "Under construction" },
    { value: "resale", label: "Resale" },
    { value: "rental", label: "Rental" },
  ],
  commercial: [
    { value: "under_construction", label: "Under construction" },
    { value: "resale", label: "Resale" },
    { value: "rental", label: "Rental" },
  ],
  industrial: [
    { value: "under_construction", label: "Under construction" },
    { value: "resale", label: "Resale" },
    { value: "rental", label: "Rental" },
  ],
  land: [
    { value: "agricultural", label: "Agricultural" },
    { value: "na_plot", label: "NA plot" },
  ],
};

export function EnquirePageContent() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const slug = searchParams.get("slug");
  const title = searchParams.get("title");
  const detail = searchParams.get("detail");

  const contextLine = useMemo(
    () => formatResearchContextLine({ step, slug, title, detail }),
    [step, slug, title, detail],
  );
  const hasContext = Boolean(step || slug || title);

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [propertyCategory, setPropertyCategory] = useState<PropertyCategoryValue | "">("");
  const [propertyNature, setPropertyNature] = useState<PropertyNatureValue | "">("");

  const natureOptions = propertyCategory ? NATURE_BY_CATEGORY[propertyCategory] : [];

  function onCategoryChange(value: string) {
    const next = value as PropertyCategoryValue | "";
    setPropertyCategory(next);
    setPropertyNature("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("full_name") ?? "").trim(),
      budget: String(fd.get("budget") ?? "").trim(),
      timeline: String(fd.get("timeline") ?? "").trim(),
      currentLocation: String(fd.get("current_location") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      preferredCallbackTime: String(fd.get("preferred_time") ?? "").trim(),
      propertyCategory,
      propertyNature,
      researchStep: step,
      researchSlug: slug,
      researchTitle: title,
      researchDetail: detail,
    };

    setSubmitting(true);
    setErrorMsg(null);
    try {
      await submitEnquiry(payload);
      setSent(true);
    } catch (err) {
      const detailMsg =
        err instanceof EnquirySubmissionError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Could not reach the team right now.";
      setErrorMsg(
        `${detailMsg} — please try again in a moment, or call us if it persists.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 pt-10 pb-12">
      <div>
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 hover:text-teal-800">
          ← Back home
        </Link>
        <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          ENQUIRE NOW
        </h1>
        <p className="mt-3 text-slate-600">
          Share a few details—our dedicated team will connect with you soon.
        </p>
        {hasContext ? (
          <p className="mt-4 rounded-xl border border-teal-100 bg-teal-50/60 px-4 py-3 text-[12px] leading-relaxed text-teal-900">
            <span className="font-semibold uppercase tracking-[0.18em] text-teal-800">
              Context
            </span>
            <br />
            {contextLine}
          </p>
        ) : null}
      </div>

      {sent ? (
        <div className="rounded-2xl border border-teal-200 bg-teal-50/80 p-6 text-slate-800 shadow-sm">
          <p className="font-semibold text-teal-900">Thank you!</p>
          <p className="mt-2 text-sm text-slate-700">
            Your enquiry has been submitted successfully. Our dedicated team will connect you soon.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-teal-800 underline-offset-4 hover:underline">
            Back to home
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 ring-1 ring-slate-900/[0.04]"
        >
          <input type="hidden" name="research_step" value={step ?? ""} readOnly />
          <input type="hidden" name="research_slug" value={slug ?? ""} readOnly />
          <input type="hidden" name="research_title" value={title ?? ""} readOnly />
          <input type="hidden" name="research_detail" value={detail ?? ""} readOnly />

          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
            Full name
            <input
              required
              name="full_name"
              type="text"
              autoComplete="name"
              className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              placeholder="Your full name"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
              Looking for
              <select
                required
                name="property_category"
                value={propertyCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="" disabled>
                  Select category
                </option>
                {PROPERTY_CATEGORIES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
              Property type
              <select
                required
                name="property_nature"
                value={propertyNature}
                onChange={(e) => setPropertyNature(e.target.value as PropertyNatureValue | "")}
                disabled={!propertyCategory}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="" disabled>
                  {propertyCategory ? "Select type" : "Select category first"}
                </option>
                {natureOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
            Budget
            <input
              required
              name="budget"
              type="text"
              className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              placeholder="e.g., ₹80L – ₹1.2Cr"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
            Timeline to purchase
            <input
              required
              name="timeline"
              type="text"
              className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              placeholder="e.g., 0–3 months"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
            Current location
            <input
              required
              name="current_location"
              type="text"
              className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              placeholder="e.g., Navi Mumbai / Mumbai / Pune"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
            Phone
            <input
              required
              name="phone"
              type="tel"
              autoComplete="tel"
              className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              placeholder="Your phone number"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
            Email
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
            Preferred callback time
            <input
              name="preferred_time"
              type="text"
              className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              placeholder="e.g., Today 4–6pm"
            />
          </label>
          {errorMsg ? (
            <p
              role="alert"
              className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800"
            >
              {errorMsg}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 min-h-[44px] rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
