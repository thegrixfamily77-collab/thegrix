"use client";

import { GrixShell } from "@/components/grix/GrixShell";
import { SiteAnalyticsBeacon } from "@/components/SiteAnalyticsBeacon";
import { usePathname } from "next/navigation";

export function ShellRouter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-dvh">{children}</div>;
  }

  return (
    <GrixShell>
      <SiteAnalyticsBeacon />
      {children}
    </GrixShell>
  );
}

