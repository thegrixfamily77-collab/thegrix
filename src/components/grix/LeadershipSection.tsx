"use client";

function ProfileCard({
  name,
  title,
  bio,
}: {
  name: string;
  title: string;
  bio: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/40 ring-1 ring-slate-900/[0.03]">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-teal-600/25 via-white to-indigo-600/20 shadow-sm">
          <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.55),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(79,70,229,0.45),transparent_50%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-lg font-semibold text-slate-900">{initials}</span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="font-display text-xl font-semibold tracking-tight text-slate-900">{name}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{title}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">{bio}</p>
    </article>
  );
}

export function LeadershipSection() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-lg shadow-slate-200/45 ring-1 ring-slate-900/[0.04] backdrop-blur sm:p-8">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.9rem]">
        Company leadership
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
        Replace these bios and initials cards with your real photos and details (we can wire images anytime).
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <ProfileCard
          name="Mr. Nikhil Pagare"
          title="Founder"
          bio="Focuses on research frameworks and clear decision support—building a calm atlas experience that reduces noise and improves diligence."
        />
        <ProfileCard
          name="Mr. Aman Rajbhar"
          title="Co‑Founder"
          bio="Leads product and operations—translating on-ground insights into structured dossiers, friction signals, and continuously improving comparisons."
        />
      </div>
    </section>
  );
}

