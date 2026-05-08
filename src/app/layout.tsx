import { GrixShell } from "@/components/grix/GrixShell";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { getSiteUrl } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontDisplay = Cormorant_Garamond({
  variable: "--font-grix-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-grix-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = getSiteUrl();

const description =
  "Structured research atlas for Navi Mumbai real estate—location dossiers, sector theses, property inventory signals, strengths & risks. Editorial clarity for serious browsing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Grix · Navi Mumbai Real Estate Research",
    template: "%s · The Grix",
  },
  description,
  keywords: [
    "Navi Mumbai real estate",
    "Navi Mumbai property research",
    "micro-market dossier",
    "Kharghar Vashi Nerul",
    "CIDCO nodes",
    "real estate sectors India",
    "property inventory research",
    "location intelligence",
  ],
  authors: [{ name: "The Grix" }],
  creator: "The Grix",
  publisher: "The Grix",
  category: "Real estate research",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The Grix",
    title: "The Grix · Navi Mumbai Real Estate Research",
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "The Grix research atlas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Grix · Navi Mumbai Real Estate Research",
    description,
    images: ["/opengraph-image"],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fafaf9" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${fontSans.variable} ${fontDisplay.variable} min-h-dvh scroll-smooth antialiased`}
    >
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <SiteJsonLd />
        <GrixShell>{children}</GrixShell>
      </body>
    </html>
  );
}
