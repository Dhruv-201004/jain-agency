"use client";

import { FormEvent, useMemo, useState } from "react";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { type ProjectDTO } from "@/lib/serializers";
import { toast } from "sonner";

type Props = {
  initialProjects: ProjectDTO[];
};

type FormState = {
  id?: string;
  title: string;
  description: string;
  category: string;
  websiteUrl: string;
  featured: boolean;
  imagesText: string;
};

const initialForm: FormState = {
  title: "",
  description: "",
  category: PROJECT_CATEGORIES[0],
  websiteUrl: "",
  featured: false,
  imagesText: "",
};

function formToPayload(form: FormState) {
  return {
    title: form.title,
    description: form.description,
    category: form.category,
    websiteUrl: form.websiteUrl,
    featured: form.featured,
    images: form.imagesText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
  };
}

function projectToPayload(project: ProjectDTO, featured: boolean) {
  return {
    title: project.title,
    description: project.description,
    category: project.category,
    websiteUrl: project.websiteUrl,
    featured,
    images: project.images,
  };
}

export function ProjectManager({ initialProjects }: Props) {
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  const isEditMode = useMemo(() => Boolean(form.id), [form.id]);

  function startEdit(project: ProjectDTO) {
    setForm({
      id: project.id,
      title: project.title,
      description: project.description,
      category: project.category,
      websiteUrl: project.websiteUrl || "",
      featured: project.featured || false,
      imagesText: project.images.join("\n"),
    });
  }

  function resetForm() {
    setForm(initialForm);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    const payload = formToPayload(form);
    const isEditing = Boolean(form.id);
    const endpoint = isEditing ? `/api/projects/${form.id}` : "/api/projects";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save project.");
        return;
      }

      const savedProject = data.project as ProjectDTO;
      setProjects((prev) =>
        isEditing
          ? prev.map((project) =>
              project.id === savedProject.id ? savedProject : project,
            )
          : [savedProject, ...prev],
      );
      toast.success(isEditing ? "Project updated." : "Project created.");
      resetForm();
    } catch {
      toast.error("Unable to save project.");
    } finally {
      setIsSaving(false);
    }
  }

  async function onDelete(id: string) {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) {
      return;
    }

    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Delete failed.");
      return;
    }

    setProjects((prev) => prev.filter((project) => project.id !== id));
    if (form.id === id) {
      resetForm();
    }
    toast.success("Project deleted.");
  }

  async function toggleFeatured(project: ProjectDTO, featured: boolean) {
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectToPayload(project, featured)),
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to update featured status.");
      return;
    }

    const updatedProject = data.project as ProjectDTO;
    setProjects((prev) =>
      prev.map((item) =>
        item.id === updatedProject.id ? updatedProject : item,
      ),
    );
    toast.success(
      featured
        ? "Added to featured projects."
        : "Removed from featured projects.",
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <form onSubmit={onSubmit} className="surface space-y-4 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          {isEditMode ? "Edit Project" : "Add Project"}
        </h2>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Title</span>
          <input
            required
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Description
          </span>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          >
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Website Link
          </span>
          <input
            type="url"
            placeholder="https://example.com"
            value={form.websiteUrl}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, websiteUrl: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          />
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, featured: e.target.checked }))
            }
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Show in Featured Projects on the homepage</span>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Images (one URL per line)
          </span>
          <textarea
            rows={4}
            value={form.imagesText}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, imagesText: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          />
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving
              ? "Saving..."
              : isEditMode
                ? "Update Project"
                : "Create Project"}
          </button>
          {isEditMode ? (
            <button
              type="button"
              onClick={resetForm}
              className="btn-outline px-4 py-2.5 text-sm"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Existing Projects
        </h2>
        {projects.length === 0 ? (
          <p className="surface rounded-xl border-dashed p-4 text-slate-500">
            No projects found.
          </p>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="surface rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {project.title}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <p className="text-xs text-blue-700">
                        {project.category}
                      </p>
                      {project.featured ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                          Featured
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <label className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) =>
                          toggleFeatured(project, e.target.checked)
                        }
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      Featured
                    </label>
                    <button
                      type="button"
                      onClick={() => startEdit(project)}
                      className="btn-outline px-3 py-1.5 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(project.id)}
                      className="rounded-md border border-rose-700 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`/projects/${project.slug || project.id}`}
                    className="inline-flex text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    View page ↗
                  </a>
                  {project.websiteUrl ? (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-xs font-semibold text-blue-700 hover:text-blue-600"
                    >
                      Open website ↗
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
