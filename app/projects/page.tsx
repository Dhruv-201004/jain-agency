import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { getAllProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio of Website Projects",
  description:
    "Explore Jain Agency’s previous work for schools, manufacturers, and industrial businesses across India.",
  keywords: [
    "portfolio website projects",
    "previous work",
    "website development for schools in India",
    "industrial website developer",
    "manufacturer business website design",
  ],
  authors: [{ name: "Jain Agency" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/projects" },
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="space-y-10">
      <div className="reveal grid gap-5 lg:grid-cols-10">
        <div className="lg:col-span-7">
          <p className="eyebrow">Case studies</p>
          <h1 className="section-title mt-4 text-4xl sm:text-5xl">Our Work</h1>
          <p className="section-copy mt-3 max-w-3xl text-lg">
            A curated mix of school, manufacturing, and industrial projects
            built to improve credibility, speed up inquiry cycles, and support
            business growth.
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
