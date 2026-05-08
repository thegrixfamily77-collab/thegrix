import { requireAdminSession } from "@/lib/admin/auth";
import { readContent, writeContent } from "@/lib/content/store";
import { isProjectCard } from "@/lib/content/validators";
import { PROJECTS, type ProjectCard } from "@/data/projects";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function loadProjects(): Promise<ProjectCard[]> {
  const stored = await readContent<ProjectCard[]>("projects");
  if (stored && Array.isArray(stored)) return stored.filter(isProjectCard);
  return PROJECTS;
}

export async function GET() {
  try {
    await requireAdminSession();
    const projects = await loadProjects();
    return NextResponse.json({ ok: true, projects });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as { status?: number }).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdminSession();
    const json = (await req.json()) as { projects?: unknown };
    if (!json.projects || !Array.isArray(json.projects)) {
      return NextResponse.json({ ok: false, error: "Expected { projects: ProjectCard[] }" }, { status: 400 });
    }
    const projects = json.projects.filter(isProjectCard);
    await writeContent("projects", projects);
    return NextResponse.json({ ok: true, count: projects.length });
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as { status?: number }).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }
}
