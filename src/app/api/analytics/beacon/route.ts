import { recordBeacon } from "@/lib/analytics/stats-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let json: { visitorId?: string; kind?: string } = {};
  try {
    json = (await req.json()) as typeof json;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const visitorId = typeof json.visitorId === "string" ? json.visitorId : "";
  const kind = json.kind === "pageview" ? "pageview" : json.kind === "ping" ? "ping" : null;
  if (!kind) {
    return NextResponse.json({ ok: false, error: 'Expected kind "pageview" or "ping"' }, { status: 400 });
  }

  try {
    await recordBeacon(visitorId, kind);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Error" },
      { status: 500 },
    );
  }
}
