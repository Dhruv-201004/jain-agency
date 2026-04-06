import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="surface space-y-4 rounded-3xl border-dashed p-10 text-center">
      <h1 className="section-title text-3xl">Project Not Found</h1>
      <p className="section-copy">
        The project you are looking for does not exist.
      </p>
      <Link
        href="/projects"
        className="btn-outline inline-flex px-4 py-2 text-sm"
      >
        Back to Projects
      </Link>
    </div>
  );
}
