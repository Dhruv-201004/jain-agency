import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";
import { normalizeImageSrc } from "@/lib/image";
import { slugify } from "@/lib/slug";

type Props = {
  params: Promise<{ id: string }>;
};

const categoryKeywords: Record<string, string[]> = {
  Schools: [
    "school website development",
    "education website",
    "admission website",
  ],
  Hospitals: [
    "hospital website design",
    "healthcare website",
    "medical website",
  ],
  "Private Businesses": [
    "business website design",
    "corporate website",
    "service website",
  ],
  Manufacturers: [
    "manufacturer website design",
    "industrial business website",
    "product showcase website",
  ],
  Industrial: [
    "industrial website developer",
    "factory website design",
    "B2B website",
  ],
  Corporate: [
    "corporate website design",
    "company website",
    "business portfolio website",
  ],
  "E-commerce": [
    "ecommerce website design",
    "online store website",
    "shopping website",
  ],
  Healthcare: [
    "healthcare website design",
    "medical practice website",
    "clinic website",
  ],
  "Real Estate": [
    "real estate website design",
    "property website",
    "agent website",
  ],
  Education: [
    "education website design",
    "school website development",
    "learning website",
  ],
  Other: ["custom website development", "business website design India"],
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const projectSlug = project.slug || slugify(project.title) || id;
  const keywords = [
    project.title,
    project.category,
    ...(categoryKeywords[project.category] || []),
    "Jain Agency",
  ];

  return {
    title: `${project.title} | ${project.category} Website Project`,
    description: project.description,
    keywords,
    authors: [{ name: "Jain Agency" }],
    robots: { index: true, follow: true },
    alternates: { canonical: `/projects/${projectSlug}` },
    openGraph: {
      title: `${project.title} | Jain Agency`,
      description: project.description,
      url: `/projects/${projectSlug}`,
      siteName: "Jain Agency",
      type: "article",
      images: project.images[0]
        ? [
            {
              url: normalizeImageSrc(project.images[0]),
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
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
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-linear-to-br from-blue-100 via-white to-orange-100">
                {image ? (
                  project.websiteUrl ? (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} website`}
                      className="block h-full w-full"
                    >
                      <Image
                        src={normalizeImageSrc(image)}
                        alt={`${project.title} image ${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </a>
                  ) : (
                    <Image
                      src={normalizeImageSrc(image)}
                      alt={`${project.title} image ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
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
