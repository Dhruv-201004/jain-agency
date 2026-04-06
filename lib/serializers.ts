import { type IProject } from "@/models/Project";
import { type IMessage } from "@/models/Message";

export type ProjectDTO = {
  id: string;
  title: string;
  description: string;
  category: string;
  websiteUrl: string;
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
  return {
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    category: project.category,
    websiteUrl: project.websiteUrl || "",
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
