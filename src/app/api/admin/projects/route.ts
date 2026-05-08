import { requireAdminToken } from "@/lib/admin/auth";
import { readContent, writeContent } from "@/lib/content/store";
import { PROJECTS, type ProjectCard } from "@/data/projects";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isProjectCard(value: unknown): value is ProjectCard {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.developer === "string" &&
    typeof v.locationSlug === "string" &&
    typeof v.segmentSlug === "string" &&
    (v.kind === "under_construction" || v.kind === "resale" || v.kind === "rental") &&
    typeof v.possessionLabel === "string" &&
    typeof v.brief === "string" &&
    Array.isArray(v.strengths) &&
    Array.isArray(v.weaknesses) &&
    Array.isArray(v.nearbyServices)
  );
}

async function loadProjects(): Promise<ProjectCard[]> {
  const stored = await readContent<ProjectCard[]>("projects");
  if (stored && Array.isArray(stored)) return stored.filter(isProjectCard);
  return PROJECTS;
}

export async function GET() {
  try {
    await requireAdminToken();
    const projects = await loadProjects();
    return NextResponse.json({ ok: true, projects });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as any).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdminToken();
    const json = (await req.json()) as { projects?: unknown };
    if (!json.projects || !Array.isArray(json.projects)) {
      return NextResponse.json({ ok: false, error: "Expected { projects: ProjectCard[] }" }, { status: 400 });
    }
    const projects = json.projects.filter(isProjectCard);
    await writeContent("projects", projects);
    return NextResponse.json({ ok: true, count: projects.length });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as any).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}

