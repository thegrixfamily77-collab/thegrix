import { ProjectsPageClient } from "@/components/grix/ProjectsPageClient";
import { getProjectsLive } from "@/lib/content/live-data";

export default async function ProjectsPage() {
  const projects = await getProjectsLive();
  return <ProjectsPageClient projects={projects} />;
}
