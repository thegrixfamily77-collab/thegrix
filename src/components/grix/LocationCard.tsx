import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
  name: string;
  summary: string;
  imageSrc: string;
  /** Horizontal strip on small screens: image + title only */
  variant?: "full" | "strip";
}

export function LocationCard({ slug, name, summary, imageSrc, variant = "full" }: Props) {
  if (variant === "strip") {
    return (
      <Link
        href={`/locations/${slug}`}
        className="group relative aspect-[4/5] w-[min(78vw,260px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/60 ring-1 ring-slate-900/[0.04] transition hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/10 active:scale-[0.98] sm:w-[220px]"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="260px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
        <p className="font-display absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-12 text-center text-[1.125rem] font-semibold leading-snug tracking-tight text-white">
          {name}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={`/locations/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/50 ring-1 ring-slate-900/[0.03] transition hover:border-teal-300 hover:shadow-xl hover:shadow-slate-300/60"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-80 transition group-hover:opacity-90" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-700">Location node</p>
        <h3 className="font-display mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-[1.35rem]">{name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{summary}</p>
      </div>
    </Link>
  );
}
