"use client";

import { HERO_SLIDE_INTERVAL_MS, heroLocationSlides } from "@/data/imagery";
import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = heroLocationSlides();

export function HeroLocationSlideshow({
  heightClassName,
  className = "",
}: {
  /** Override default aspect-ratio sizing (e.g. full viewport height). */
  heightClassName?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const current = SLIDES[active];

  const height = heightClassName ?? "aspect-[5/4] w-full sm:aspect-[16/11]";

  return (
    <div className={`relative mx-auto w-full max-w-xl lg:max-w-none ${className}`.trim()}>
      <div
        className="absolute -inset-3 rounded-[1.25rem] opacity-70 blur-2xl sm:-inset-5 sm:rounded-[2rem]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(13,148,136,0.14), transparent 52%), radial-gradient(circle at 70% 60%, rgba(79,70,229,0.1), transparent 48%)",
        }}
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-[1.25rem] border border-slate-200/90 bg-white shadow-xl shadow-slate-300/35 ring-1 ring-slate-900/[0.04] sm:rounded-[1.75rem]">
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/92 via-slate-950/15 to-transparent sm:from-slate-950/88 sm:via-transparent sm:to-indigo-950/12" />

        <div className={`relative ${height}`}>
          {SLIDES.map((slide, i) => (
            <div
              key={slide.slug}
              className={`absolute inset-0 transition-opacity duration-[850ms] ease-in-out ${
                i === active ? "z-[2] opacity-100" : "z-[1] opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-slate-950 via-slate-950/78 to-transparent px-4 pb-4 pt-16 sm:px-6 sm:pb-5 sm:pt-24">
                <p className="font-display truncate text-center text-[1.35rem] font-semibold tracking-tight text-white sm:text-left sm:text-[1.75rem]">
                  {slide.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <span className="sr-only" aria-live="polite">
          Location spotlight: {current.label}
        </span>
      </div>
    </div>
  );
}
