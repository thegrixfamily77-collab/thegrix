import { requireAdminSession } from "@/lib/admin/auth";
import { getAdminSnapshot } from "@/lib/analytics/stats-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdminSession();
    const snapshot = await getAdminSnapshot();
    return NextResponse.json({ ok: true, ...snapshot });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as { status?: number }).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}
