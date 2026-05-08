import { incrementSignups } from "@/lib/analytics/stats-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  try {
    await incrementSignups();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Error" },
      { status: 500 },
    );
  }
}
