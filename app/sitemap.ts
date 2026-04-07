import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import { getProjectSlug } from "@/lib/data";
import { Project } from "@/models/Project";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://jain-agency.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });

    const projectUrls = projects.map((project) => ({
      url: `${siteUrl}/projects/${getProjectSlug(project)}`,
      lastModified: project.createdAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...baseUrls, ...projectUrls];
  } catch {
    return baseUrls;
  }
}
