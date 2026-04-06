import { connectDB } from "@/lib/db";
import { toProjectDTO, type ProjectDTO } from "@/lib/serializers";
import { Project } from "@/models/Project";

export async function getAllProjects(): Promise<ProjectDTO[]> {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return projects.map((item) => toProjectDTO(item));
  } catch {
    return [];
  }
}

export async function getProjectById(id: string): Promise<ProjectDTO | null> {
  try {
    await connectDB();
    const project = await Project.findById(id);
    if (!project) {
      return null;
    }
    return toProjectDTO(project);
  } catch {
    return null;
  }
}
