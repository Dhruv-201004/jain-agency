import Link from "next/link";
import { type ProjectDTO } from "@/lib/serializers";

type Props = {
  project: ProjectDTO;
};

export function ProjectCard({ project }: Props) {
  const imageContent = (
    <>
      {project.images[0] ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.images[0]}
          alt={project.title}
          className="h-full w-full object-cover brightness-110 transition duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-blue-100 via-white to-indigo-100" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-white/16 via-transparent to-white/8" />
    </>
  );

  return (
    <article className="group surface overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-28px_rgba(10,100,210,0.45)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {project.websiteUrl ? (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} website`}
            className="block h-full w-full"
          >
            {imageContent}
          </a>
        ) : (
          imageContent
        )}
      </div>
      <div className="space-y-3 p-6">
        <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {project.category}
        </p>
        <h3 className="text-xl font-semibold text-slate-900">
          {project.title}
        </h3>
        <p className="line-clamp-3 text-sm text-slate-600">
          {project.description}
        </p>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition hover:gap-2"
        >
          View details <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
