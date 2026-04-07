import { PROJECT_CATEGORIES } from "@/lib/constants";

type ProjectPayload = {
  title: string;
  description: string;
  category: string;
  websiteUrl: string;
  featured: boolean;
  images: string[];
};

export function validateProjectPayload(payload: Partial<ProjectPayload>) {
  const title = (payload.title || "").trim();
  const description = (payload.description || "").trim();
  const category = (payload.category || "").trim();
  const websiteUrl = (payload.websiteUrl || "").trim();
  const featured = Boolean(payload.featured);
  const images = Array.isArray(payload.images)
    ? payload.images.map((item) => item.trim()).filter(Boolean)
    : [];

  if (!title || !description || !category) {
    return { error: "Title, description, and category are required." };
  }

  if (
    !PROJECT_CATEGORIES.includes(
      category as (typeof PROJECT_CATEGORIES)[number],
    )
  ) {
    return { error: "Invalid category selected." };
  }

  if (websiteUrl) {
    try {
      const parsed = new URL(websiteUrl);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return { error: "Website link must start with http:// or https://" };
      }
    } catch {
      return { error: "Please enter a valid website link." };
    }
  }

  return {
    data: {
      title,
      description,
      category,
      websiteUrl,
      featured,
      images,
    },
  };
}
