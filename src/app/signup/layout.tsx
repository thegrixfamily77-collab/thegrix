import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a The Grix account for saved research and preferences.",
  robots: { index: false, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
