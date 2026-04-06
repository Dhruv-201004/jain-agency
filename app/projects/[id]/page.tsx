import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-10">
      <header className="reveal grid gap-6 lg:grid-cols-9">
        <div className="space-y-4 lg:col-span-6">
          <p className="eyebrow">{project.category}</p>
          <h1 className="section-title text-4xl sm:text-5xl">
            {project.title}
          </h1>
          <p className="section-copy max-w-3xl text-lg leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="surface rounded-2xl p-5 lg:col-span-3">
          <p className="text-sm text-slate-500">Client Type</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {project.category}
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Strategic design and development tailored to category-specific
            users.
          </p>
          {project.websiteUrl ? (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-600"
            >
              Visit website ↗
            </a>
          ) : null}
        </div>
      </header>

      <section className="reveal-delay grid gap-4 md:grid-cols-2">
        {(project.images.length ? project.images : ["", ""]).map(
          (image, index) => (
            <div
              key={`${image}-${index}`}
              className={`surface overflow-hidden rounded-3xl p-2 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100">
                {image ? (
                  project.websiteUrl ? (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} website`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={`${project.title} image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </a>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={`${project.title} image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  )
                ) : null}
              </div>
            </div>
          ),
        )}
      </section>
    </article>
  );
}
