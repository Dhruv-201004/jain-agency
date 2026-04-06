export const PROJECT_CATEGORIES = [
  "Schools",
  "Hospitals",
  "Private Businesses",
  "Manufacturers",
  "Industrial",
  "Corporate",
  "E-commerce",
  "Healthcare",
  "Real Estate",
  "Education",
  "Other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
