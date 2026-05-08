import { requireAdminSession } from "@/lib/admin/auth";
import { readContent, writeContent } from "@/lib/content/store";
import { isLocationInsight } from "@/lib/content/validators";
import { NAVI_MUMBAI_LOCATIONS, type LocationInsight } from "@/data/locations";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function loadLocations(): Promise<LocationInsight[]> {
  const stored = await readContent<LocationInsight[]>("locations");
  if (stored && Array.isArray(stored)) return stored.filter(isLocationInsight);
  return NAVI_MUMBAI_LOCATIONS;
}

export async function GET() {
  try {
    await requireAdminSession();
    const locations = await loadLocations();
    return NextResponse.json({ ok: true, locations });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as { status?: number }).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdminSession();
    const json = (await req.json()) as { locations?: unknown };
    if (!json.locations || !Array.isArray(json.locations)) {
      return NextResponse.json({ ok: false, error: "Expected { locations: LocationInsight[] }" }, { status: 400 });
    }
    const locations = json.locations.filter(isLocationInsight);
    await writeContent("locations", locations);
    return NextResponse.json({ ok: true, count: locations.length });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as { status?: number }).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}
