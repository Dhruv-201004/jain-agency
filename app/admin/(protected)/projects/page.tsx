import { ProjectManager } from "@/components/admin/ProjectManager";
import { getAllProjects } from "@/lib/data";

export const metadata = {
  title: "Admin Projects",
};

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectManager initialProjects={projects} />;
}
