import { buildEnquiryHref, type ResearchStepId } from "@/lib/research-enquiry";
import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";

const variants: Record<
  Variant,
  string
> = {
  primary:
    "inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-md shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700 sm:min-h-0 sm:px-5",
  outline:
    "inline-flex min-h-[44px] items-center justify-center rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-900 shadow-sm transition hover:border-teal-400 hover:bg-teal-50 sm:min-h-0 sm:px-5",
  ghost:
    "inline-flex min-h-[44px] items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-teal-800 underline-offset-4 transition hover:bg-teal-50 hover:underline sm:min-h-0",
};

export function EnquireStepLink({
  step,
  slug,
  title,
  detail,
  variant = "outline",
  className = "",
  children = "Enquire now",
}: {
  step: ResearchStepId | string;
  slug?: string;
  title?: string;
  detail?: string;
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  const href = buildEnquiryHref({ step, slug, title, detail });
  return (
    <Link href={href} className={`${variants[variant]} ${className}`.trim()}>
      {children}
    </Link>
  );
}
