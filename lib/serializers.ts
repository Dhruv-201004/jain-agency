import { type IProject } from "@/models/Project";
import { type IMessage } from "@/models/Message";
import { slugify } from "@/lib/slug";

export type ProjectDTO = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  websiteUrl: string;
  featured: boolean;
  images: string[];
  createdAt: string;
};

export type MessageDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

export function toProjectDTO(project: IProject): ProjectDTO {
  const slug = project.slug || slugify(project.title) || project._id.toString();

  return {
    id: project._id.toString(),
    slug,
    title: project.title,
    description: project.description,
    category: project.category,
    websiteUrl: project.websiteUrl || "",
    featured: project.featured || false,
    images: project.images,
    createdAt: project.createdAt.toISOString(),
  };
}

export function toMessageDTO(message: IMessage): MessageDTO {
  return {
    id: message._id.toString(),
    name: message.name,
    email: message.email,
    phone: message.phone,
    message: message.message,
    createdAt: message.createdAt.toISOString(),
  };
}
