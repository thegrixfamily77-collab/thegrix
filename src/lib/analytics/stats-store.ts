import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "content", "analytics.json");
const VERSION = 1 as const;

/** Considered “active” if ping within this window. */
export const ACTIVE_WINDOW_MS = 5 * 60 * 1000;

const MAX_VISITOR_KEYS_PER_DAY = 5000;

export type AnalyticsStore = {
  version: typeof VERSION;
  /** YYYY-MM-DD (UTC) */
  days: Record<
    string,
    {
      pageViews: number;
      uniqueVisitors: number;
      enquiries: number;
      signups: number;
      seenVisitors: Record<string, boolean>;
    }
  >;
  /** visitorId → last ping unix ms */
  lastPingMs: Record<string, number>;
};

let writeChain: Promise<void> = Promise.resolve();

function utcDayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function emptyDay() {
  return {
    pageViews: 0,
    uniqueVisitors: 0,
    enquiries: 0,
    signups: 0,
    seenVisitors: {} as Record<string, boolean>,
  };
}

async function readStore(): Promise<AnalyticsStore> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as AnalyticsStore;
    if (parsed.version !== VERSION || typeof parsed.days !== "object") {
      return { version: VERSION, days: {}, lastPingMs: {} };
    }
    if (!parsed.lastPingMs || typeof parsed.lastPingMs !== "object") {
      return { ...parsed, lastPingMs: {} };
    }
    return parsed;
  } catch {
    return { version: VERSION, days: {}, lastPingMs: {} };
  }
}

async function writeStore(store: AnalyticsStore): Promise<void> {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(store, null, 2) + "\n", "utf8");
}

function enqueueWrite(fn: (store: AnalyticsStore) => void): Promise<void> {
  const run = async () => {
    const store = await readStore();
    fn(store);
    await writeStore(store);
  };
  const p = writeChain.then(run, run);
  writeChain = p.then(
    () => undefined,
    () => undefined,
  );
  return p;
}

export function countActiveNow(store: AnalyticsStore, now = Date.now()): number {
  const cutoff = now - ACTIVE_WINDOW_MS;
  return Object.values(store.lastPingMs).filter((t) => t >= cutoff).length;
}

export async function recordBeacon(visitorId: string, kind: "pageview" | "ping"): Promise<void> {
  const vid = visitorId.trim();
  if (!vid || vid.length > 128) return;

  const now = Date.now();
  const day = utcDayKey(new Date(now));

  await enqueueWrite((store) => {
    store.lastPingMs[vid] = now;

    if (kind === "pageview") {
      const bucket = store.days[day] ?? emptyDay();
      store.days[day] = bucket;

      bucket.pageViews += 1;

      const keys = Object.keys(bucket.seenVisitors);
      if (!bucket.seenVisitors[vid] && keys.length < MAX_VISITOR_KEYS_PER_DAY) {
        bucket.seenVisitors[vid] = true;
        bucket.uniqueVisitors += 1;
      }
    }

    /* Drop stale pings so lastPingMs stays bounded */
    const pingCutoff = now - ACTIVE_WINDOW_MS * 3;
    for (const [id, ts] of Object.entries(store.lastPingMs)) {
      if (ts < pingCutoff) delete store.lastPingMs[id];
    }
  });
}

export async function incrementEnquiries(): Promise<void> {
  const day = utcDayKey();
  await enqueueWrite((store) => {
    const bucket = store.days[day] ?? emptyDay();
    bucket.enquiries += 1;
    store.days[day] = bucket;
  });
}

export async function incrementSignups(): Promise<void> {
  const day = utcDayKey();
  await enqueueWrite((store) => {
    const bucket = store.days[day] ?? emptyDay();
    bucket.signups += 1;
    store.days[day] = bucket;
  });
}

export async function getAdminSnapshot(): Promise<{
  dayKey: string;
  activeNow: number;
  visitedToday: number;
  pageViewsToday: number;
  signupsToday: number;
  enquiriesToday: number;
}> {
  const store = await readStore();
  const dayKey = utcDayKey();
  const bucket = store.days[dayKey] ?? emptyDay();
  const now = Date.now();

  return {
    dayKey,
    activeNow: countActiveNow(store, now),
    visitedToday: bucket.uniqueVisitors,
    pageViewsToday: bucket.pageViews,
    signupsToday: bucket.signups,
    enquiriesToday: bucket.enquiries,
  };
}
