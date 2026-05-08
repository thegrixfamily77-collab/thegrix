"use client";

import { useMemo, useState } from "react";

type Review = {
  name: string;
  role: string;
  headline: string;
  note: string;
  rating?: number;
  videoName?: string | null;
};

const REVIEWS: Review[] = [
  {
    name: "A. Mehta",
    role: "First-time investor",
    headline: "Helped me compare nodes calmly",
    note: "The locations grid + dossiers made trade-offs obvious. I could shortlist without hype.",
    rating: 5,
    videoName: null,
  },
  {
    name: "S. Khan",
    role: "End-user buyer",
    headline: "Clarity on risks vs price",
    note: "Weaknesses and trajectory notes saved me from overpaying for a story.",
    rating: 5,
    videoName: null,
  },
  {
    name: "R. Iyer",
    role: "Working professional",
    headline: "Search + sectors feel like a workflow",
    note: "I jump between location and sector fast—feels like a research tool, not a listing site.",
    rating: 5,
    videoName: null,
  },
  {
    name: "P. Desai",
    role: "NRI buyer",
    headline: "Useful for long-distance diligence",
    note: "I can revisit the same threads without losing context. Very practical.",
    rating: 5,
    videoName: null,
  },
];

export function VideoReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState(false);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);

  const stars = useMemo(() => [1, 2, 3, 4, 5] as const, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const role = String(fd.get("role") ?? "").trim();
    const text = String(fd.get("review") ?? "").trim();
    const file = fd.get("video") as File | null;
    const r = Number(fd.get("rating") ?? rating);

    setVideoName(file?.name ? file.name : null);
    setSubmittedSummary(
      `Recorded review for ${name || "(name not set)"}${role ? ` · ${role}` : ""} · ${Number.isFinite(r) ? r : rating}/5 stars.\n\n${text}`,
    );

    const headline =
      text.split("\n").map((l) => l.trim()).filter(Boolean)[0]?.slice(0, 72) ||
      "Customer review";
    const nextReview: Review = {
      name: name || "Anonymous",
      role: role || "Customer",
      headline,
      note: text,
      rating: Number.isFinite(r) ? Math.max(1, Math.min(5, r)) : rating,
      videoName: file?.name ? file.name : null,
    };
    setReviews((prev) => [nextReview, ...prev]);

    setSubmitted(true);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-indigo-50/35 p-6 shadow-lg shadow-slate-200/45 ring-1 ring-slate-900/[0.04] sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.9rem]">
            Customer reviews
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Swipe to view. You can also upload a recorded video review below.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v);
            setSubmitted(false);
            setSubmittedSummary(null);
            setVideoName(null);
          }}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:min-h-0"
        >
          {showForm ? "Close" : "Add your review"}
        </button>
      </div>

      {showForm ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/45 ring-1 ring-slate-900/[0.03]">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
                  Name
                  <input
                    name="name"
                    type="text"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="Your name"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
                  Profile
                  <input
                    name="role"
                    type="text"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g., Investor / End-user"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-slate-800">Rating</p>
                <input type="hidden" name="rating" value={rating} readOnly />
                <div className="flex items-center gap-2">
                  {stars.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                        rating === s
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-indigo-300 hover:bg-indigo-50/40"
                      }`}
                      aria-label={`${s} star`}
                    >
                      {"★".repeat(s)}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
                Review
                <textarea
                  required
                  name="review"
                  rows={4}
                  className="resize-y rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Write your experience…"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800">
                Upload recorded video
                <input
                  name="video"
                  type="file"
                  accept="video/*"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white hover:file:bg-slate-800"
                />
                <span className="text-xs text-slate-500">
                  Demo only (not uploaded yet). We’ll wire storage/backend when ready.
                </span>
              </label>

              <button
                type="submit"
                className="mt-1 min-h-[44px] rounded-full bg-gradient-to-r from-indigo-700 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-700/20 transition hover:from-indigo-800 hover:to-indigo-700"
              >
                Submit review
              </button>
            </form>
          ) : (
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 text-slate-800">
              <p className="font-semibold text-indigo-900">Thanks—your review has been recorded (demo).</p>
              {videoName ? <p className="mt-2 text-sm text-slate-700">Video file: {videoName}</p> : null}
              {submittedSummary ? (
                <pre className="mt-4 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">
                  {submittedSummary}
                </pre>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSubmittedSummary(null);
                  setVideoName(null);
                }}
                className="mt-4 text-sm font-semibold text-indigo-800 underline-offset-4 hover:underline"
              >
                Submit another
              </button>
            </div>
          )}
        </div>
      ) : null}

      <div className="mt-6 -mx-6 px-6 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 snap-x snap-mandatory">
          {reviews.map((r) => (
            <article
              key={r.name + r.headline}
              className="snap-start w-[min(86vw,420px)] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/45 ring-1 ring-slate-900/[0.03]"
            >
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
                <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_25%_20%,rgba(13,148,136,0.35),transparent_52%),radial-gradient(circle_at_70%_65%,rgba(79,70,229,0.35),transparent_50%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white ring-1 ring-white/25 backdrop-blur">
                    {r.videoName ? "Video uploaded" : "Video placeholder"}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-semibold tracking-tight text-slate-900">{r.headline}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.note}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {r.name} · {r.role}
                  </p>
                  <span className="text-xs font-semibold text-indigo-700">
                    {r.rating ? `${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}` : "Swipe →"}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

