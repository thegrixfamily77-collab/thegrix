import { requireAdminToken } from "@/lib/admin/auth";
import { readContent, writeContent } from "@/lib/content/store";
import { SEGMENTS, type SegmentProfile } from "@/data/segments";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isSegmentProfile(value: unknown): value is SegmentProfile {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.slug === "string" &&
    typeof v.title === "string" &&
    typeof v.summary === "string" &&
    typeof v.pastPerformance === "string" &&
    typeof v.presentPerformance === "string" &&
    Array.isArray(v.strengths) &&
    Array.isArray(v.weaknesses)
  );
}

async function loadSegments(): Promise<SegmentProfile[]> {
  const stored = await readContent<SegmentProfile[]>("segments");
  if (stored && Array.isArray(stored)) return stored.filter(isSegmentProfile);
  return SEGMENTS;
}

export async function GET() {
  try {
    await requireAdminToken();
    const segments = await loadSegments();
    return NextResponse.json({ ok: true, segments });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as any).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdminToken();
    const json = (await req.json()) as { segments?: unknown };
    if (!json.segments || !Array.isArray(json.segments)) {
      return NextResponse.json({ ok: false, error: "Expected { segments: SegmentProfile[] }" }, { status: 400 });
    }
    const segments = json.segments.filter(isSegmentProfile);
    await writeContent("segments", segments);
    return NextResponse.json({ ok: true, count: segments.length });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as any).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}

