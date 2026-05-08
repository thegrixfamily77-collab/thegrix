"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const VID_KEY = "grix_vid_v1";

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(VID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `v_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      window.localStorage.setItem(VID_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

async function sendBeacon(kind: "pageview" | "ping") {
  const visitorId = getVisitorId();
  if (!visitorId) return;
  try {
    await fetch("/api/analytics/beacon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId, kind }),
      keepalive: true,
    });
  } catch {
    /* ignore */
  }
}

/**
 * Public-site only: counts page views + unique visitors, and periodic pings for “active now”.
 */
export function SiteAnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    void sendBeacon("pageview");
  }, [pathname]);

  useEffect(() => {
    const t = window.setInterval(() => void sendBeacon("ping"), 90_000);
    return () => window.clearInterval(t);
  }, []);

  return null;
}
