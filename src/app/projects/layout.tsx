import type { Metadata } from "next";

const description =
  "Browse illustrative Navi Mumbai inventory by execution posture—under construction versus resale—and cross-link to location dossiers and sector theses.";

export const metadata: Metadata = {
  title: "Properties shelf",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Properties shelf · The Grix",
    description,
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Properties shelf · The Grix",
    description,
    images: ["/opengraph-image"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
