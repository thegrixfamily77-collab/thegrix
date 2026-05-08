import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquire",
  description: "Contact The Grix team—your research step is captured with your message.",
  robots: { index: false, follow: true },
};

export default function EnquireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
