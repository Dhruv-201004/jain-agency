import { Project } from "@/models/Project";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export async function generateUniqueProjectSlug(
  title: string,
  excludeId?: string,
) {
  const baseSlug = slugify(title) || "project";
  let candidate = baseSlug;
  let suffix = 2;

  while (
    await Project.findOne(
      excludeId
        ? { slug: candidate, _id: { $ne: excludeId } }
        : { slug: candidate },
    ).lean()
  ) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}
