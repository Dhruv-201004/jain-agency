import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/slug";
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

export async function getFeaturedProjects(): Promise<ProjectDTO[]> {
  try {
    await connectDB();
    const featuredProjects = await Project.find({ featured: true }).sort({
      createdAt: -1,
    });

    if (featuredProjects.length > 0) {
      return featuredProjects.map((item) => toProjectDTO(item));
    }

    const fallbackProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(3);
    return fallbackProjects.map((item) => toProjectDTO(item));
  } catch {
    return [];
  }
}

export async function getProjectById(id: string): Promise<ProjectDTO | null> {
  try {
    await connectDB();
    const project =
      (await Project.findOne({ slug: id })) || (await Project.findById(id));
    if (!project) {
      const allProjects = await Project.find().sort({ createdAt: -1 });
      const matched = allProjects.find((item) => {
        const normalizedSlug = getProjectSlug(item);
        return normalizedSlug === id;
      });

      return matched ? toProjectDTO(matched) : null;
    }
    return toProjectDTO(project);
  } catch {
    return null;
  }
}

export function getProjectSlug(project: {
  title: string;
  slug?: string;
  _id: { toString(): string };
}) {
  return project.slug || slugify(project.title) || project._id.toString();
}
