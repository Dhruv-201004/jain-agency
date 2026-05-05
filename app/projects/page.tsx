import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { getAllProjects } from "@/lib/data";
import { absoluteUrl, jsonLdScript, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Website Development Portfolio and Case Studies",
  description:
    "Explore The Jain Agency's website development portfolio for schools, hospitals, manufacturers, industrial companies, and private businesses across India.",
  keywords: [
    "website development portfolio India",
    "website case studies India",
    "website development for schools in India",
    "hospital website design India",
    "industrial website developer",
    "manufacturer business website design",
  ],
  authors: [{ name: "The Jain Agency" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Website Development Portfolio | The Jain Agency",
    description:
      "Case studies for school, hospital, manufacturing, industrial, and business websites built by The Jain Agency.",
    url: "/projects",
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "The Jain Agency website development portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Portfolio | The Jain Agency",
    description:
      "Case studies for school, hospital, manufacturing, industrial, and business websites built by The Jain Agency.",
    images: [siteConfig.ogImage],
  },
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/projects#portfolio"),
    url: absoluteUrl("/projects"),
    name: "Website Development Portfolio",
    description: metadata.description,
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/projects/${project.slug || project.id}`),
        name: project.title,
      })),
    },
  };

  return (
    <section className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(collectionJsonLd)}
      />
      <div className="reveal grid gap-5 lg:grid-cols-10">
        <div className="lg:col-span-7">
          <p className="eyebrow">Case studies</p>
          <h1 className="section-title mt-4 text-4xl sm:text-5xl">Our Work</h1>
          <p className="section-copy mt-3 max-w-3xl text-lg">
            A curated mix of school, hospital, manufacturing, and industrial
            projects built to improve credibility, speed up inquiry cycles, and
            support business growth.
          </p>
        </div>
        <div className="surface rounded-2xl p-4 lg:col-span-3">
          <p className="text-sm font-semibold text-slate-800">Categories</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((category) => (
              <span
                key={category}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="surface rounded-3xl border-dashed p-10 text-center text-slate-500">
          Projects will appear here after you add them from admin.
        </div>
      ) : (
        <div className="reveal-delay grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
