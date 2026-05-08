import { requireAdminSession } from "@/lib/admin/auth";
import type { HomepageContent } from "@/data/homepage";
import { readContent, writeContent } from "@/lib/content/store";
import { mergeHomepageContent } from "@/lib/content/validators";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function loadHomepage(): Promise<HomepageContent> {
  const stored = await readContent<unknown>("homepage");
  return mergeHomepageContent(stored ?? null);
}

export async function GET() {
  try {
    await requireAdminSession();
    const homepage = await loadHomepage();
    return NextResponse.json({ ok: true, homepage });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as { status?: number }).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdminSession();
    const json = (await req.json()) as { homepage?: unknown };
    if (!json.homepage || typeof json.homepage !== "object") {
      return NextResponse.json({ ok: false, error: "Expected { homepage: HomepageContent }" }, { status: 400 });
    }
    const homepage = mergeHomepageContent(json.homepage);
    await writeContent("homepage", homepage);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as { status?: number }).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}
