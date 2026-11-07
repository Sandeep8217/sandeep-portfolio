
import { useEffect, useState } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    X,
    FolderCode,
    RefreshCw,
    Eye,
    EyeOff,
    Star,
} from "lucide-react";

type Project = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    technologies: string[];
    github_url: string;
    demo_url: string | null;
    image_url: string | null;
    featured: boolean;
    display_order: number;
    is_published: boolean;
};

type ProjectForm = {
    title: string;
    subtitle: string;
    description: string;
    technologies: string;
    github_url: string;
    demo_url: string;
    image_url: string;
    featured: boolean;
    display_order: number;
    is_published: boolean;
};

const emptyForm: ProjectForm = {
    title: "",
    subtitle: "",
    description: "",
    technologies: "",
    github_url: "",
    demo_url: "",
    image_url: "",
    featured: false,
    display_order: 1,
    is_published: true,
};

export default function ProjectsManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<ProjectForm>(emptyForm);

    const loadProjects = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/projects", {
                headers: { Accept: "application/json" },
                cache: "no-store",
            });

            const result: unknown = await response.json();

            if (
                !response.ok ||
                !result ||
                typeof result !== "object" ||
                !("success" in result) ||
                result.success !== true ||
                !("projects" in result) ||
                !Array.isArray(result.projects)
            ) {
                throw new Error("Unable to retrieve projects.");
            }

            setProjects(result.projects as Project[]);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadProjects();
    }, []);

    const updateField = <K extends keyof ProjectForm>(
        field: K,
        value: ProjectForm[K]
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const openAddForm = () => {
        setEditingId(null);
        setForm({
            ...emptyForm,
            display_order: projects.length + 1,
        });
        setError("");
        setSuccess("");
        setShowForm(true);
    };

    const openEditForm = (project: Project) => {
        setEditingId(project.id);

        setForm({
            title: project.title,
            subtitle: project.subtitle,
            description: project.description,
            technologies: project.technologies.join(", "),
            github_url: project.github_url,
            demo_url: project.demo_url ?? "",
            image_url: project.image_url ?? "",
            featured: project.featured,
            display_order: project.display_order,
            is_published: project.is_published,
        });

        setError("");
        setSuccess("");
        setShowForm(true);
    };

    const closeForm = () => {
        if (saving) return;

        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
    };

    const saveProject = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        const technologies = form.technologies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        const payload = {
            title: form.title.trim(),
            subtitle: form.subtitle.trim(),
            description: form.description.trim(),
            technologies,
            github_url: form.github_url.trim(),
            demo_url: form.demo_url.trim(),
            image_url: form.image_url.trim(),
            featured: form.featured,
            display_order: Number(form.display_order),
            is_published: form.is_published,
        };

        try {
            const response = await fetch(
                editingId
                    ? `/api/admin/projects/${encodeURIComponent(editingId)}`
                    : "/api/admin/projects",
                {
                    method: editingId ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result: unknown = await response.json();

            if (
                !response.ok ||
                !result ||
                typeof result !== "object" ||
                !("success" in result) ||
                result.success !== true
            ) {
                const message =
                    result &&
                    typeof result === "object" &&
                    "message" in result &&
                    typeof result.message === "string"
                        ? result.message
                        : "Unable to save project.";

                throw new Error(message);
            }

            setShowForm(false);
            setEditingId(null);
            setForm(emptyForm);
            setSuccess(
                editingId
                    ? "Project updated successfully."
                    : "Project added successfully."
            );

            await loadProjects();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to save project."
            );
        } finally {
            setSaving(false);
        }
    };

    const deleteProject = async (project: Project) => {
        const confirmed = window.confirm(
            `Permanently delete "${project.title}"?`
        );

        if (!confirmed) return;

        setError("");
        setSuccess("");

        try {
            const response = await fetch(
                `/api/admin/projects/${encodeURIComponent(project.id)}`,
                { method: "DELETE" }
            );

            const result: unknown = await response.json();

            if (
                !response.ok ||
                !result ||
                typeof result !== "object" ||
                !("success" in result) ||
                result.success !== true
            ) {
                throw new Error("Unable to delete project.");
            }

            setSuccess("Project deleted successfully.");
            await loadProjects();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to delete project."
            );
        }
    };

    return (
        <section>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-violet-400">
                        PORTFOLIO MANAGEMENT
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                        Projects
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Add, edit and manage your portfolio projects.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => void loadProjects()}
                        disabled={loading}
                        className="rounded-xl border border-white/10 p-3 text-gray-400 hover:text-white disabled:opacity-50"
                        aria-label="Refresh projects"
                    >
                        <RefreshCw
                            size={18}
                            className={loading ? "animate-spin" : ""}
                        />
                    </button>

                    <button
                        type="button"
                        onClick={openAddForm}
                        className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                    >
                        <Plus size={18} />
                        Add Project
                    </button>
                </div>
            </div>

            {error && (
                <div
                    role="alert"
                    className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
                >
                    {error}
                </div>
            )}

            {success && (
                <div
                    role="status"
                    className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-300"
                >
                    {success}
                </div>
            )}

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {[
                    {
                        label: "Total Projects",
                        value: projects.length,
                    },
                    {
                        label: "Published",
                        value: projects.filter((p) => p.is_published).length,
                    },
                    {
                        label: "Featured",
                        value: projects.filter((p) => p.featured).length,
                    },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl border border-white/10 bg-[#10121e] p-5"
                    >
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className="mt-3 text-3xl font-bold">
                            {loading ? "..." : stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {loading ? (
                <p className="py-16 text-center text-sm text-gray-400">
                    Loading projects...
                </p>
            ) : projects.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#10121e] py-16 text-center">
                    <FolderCode
                        size={40}
                        className="mx-auto text-gray-500"
                    />
                    <p className="mt-4 font-semibold">
                        No projects found
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        Add your first portfolio project.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#10121e]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left">
                            <thead className="bg-white/[0.03]">
                            <tr className="text-xs uppercase tracking-wider text-gray-500">
                                <th className="px-5 py-4">Project</th>
                                <th className="px-5 py-4">Order</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Featured</th>
                                <th className="px-5 py-4">Actions</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-white/5">
                            {projects.map((project) => (
                                <tr
                                    key={project.id}
                                    className="hover:bg-white/[0.02]"
                                >
                                    <td className="px-5 py-5">
                                        <p className="font-semibold">
                                            {project.title}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {project.subtitle}
                                        </p>
                                    </td>

                                    <td className="px-5 py-5 text-sm text-gray-300">
                                        {project.display_order}
                                    </td>

                                    <td className="px-5 py-5">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    project.is_published
                                                        ? "bg-emerald-400/10 text-emerald-300"
                                                        : "bg-gray-400/10 text-gray-400"
                                                }`}
                                            >
                                                {project.is_published
                                                    ? "Published"
                                                    : "Draft"}
                                            </span>
                                    </td>

                                    <td className="px-5 py-5">
                                        {project.featured ? (
                                            <span className="flex items-center gap-2 text-sm text-amber-300">
                                                    <Star size={15} />
                                                    Yes
                                                </span>
                                        ) : (
                                            <span className="text-sm text-gray-500">
                                                    No
                                                </span>
                                        )}
                                    </td>

                                    <td className="px-5 py-5">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openEditForm(project)}
                                                title="Edit project"
                                                className="rounded-lg border border-white/10 p-2 text-gray-400 hover:border-violet-400/40 hover:text-violet-300"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => void deleteProject(project)}
                                                title="Delete project"
                                                className="rounded-lg border border-white/10 p-2 text-gray-400 hover:border-red-400/40 hover:text-red-300"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <form
                        onSubmit={saveProject}
                        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#10121e] p-6 shadow-2xl sm:p-8"
                    >
                        <div className="mb-7 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                                    Project management
                                </p>
                                <h3 className="mt-2 text-2xl font-bold">
                                    {editingId ? "Edit Project" : "Add Project"}
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                disabled={saving}
                                aria-label="Close form"
                                className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="sm:col-span-2">
                                <span className="mb-2 block text-sm text-gray-300">
                                    Project title *
                                </span>
                                <input
                                    required
                                    maxLength={120}
                                    value={form.title}
                                    onChange={(e) => updateField("title", e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violet-400"
                                    placeholder="Financial Habit Builder"
                                />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="mb-2 block text-sm text-gray-300">
                                    Subtitle *
                                </span>
                                <input
                                    required
                                    maxLength={160}
                                    value={form.subtitle}
                                    onChange={(e) => updateField("subtitle", e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violet-400"
                                    placeholder="Personal Finance & Wealth Tracking"
                                />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="mb-2 block text-sm text-gray-300">
                                    Description *
                                </span>
                                <textarea
                                    required
                                    maxLength={2000}
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) => updateField("description", e.target.value)}
                                    className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violet-400"
                                    placeholder="Describe what your project does..."
                                />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="mb-2 block text-sm text-gray-300">
                                    Technologies *
                                </span>
                                <input
                                    required
                                    value={form.technologies}
                                    onChange={(e) => updateField("technologies", e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violet-400"
                                    placeholder="Java, Spring Boot, React, PostgreSQL"
                                />
                                <span className="mt-2 block text-xs text-gray-500">
                                    Separate technologies using commas.
                                </span>
                            </label>

                            <label className="sm:col-span-2">
                                <span className="mb-2 block text-sm text-gray-300">
                                    GitHub repository URL *
                                </span>
                                <input
                                    required
                                    type="url"
                                    value={form.github_url}
                                    onChange={(e) => updateField("github_url", e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violet-400"
                                    placeholder="https://github.com/username/project"
                                />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="mb-2 block text-sm text-gray-300">
                                    Live demo URL
                                </span>
                                <input
                                    type="url"
                                    value={form.demo_url}
                                    onChange={(e) => updateField("demo_url", e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violet-400"
                                    placeholder="https://example.com"
                                />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="mb-2 block text-sm text-gray-300">
                                    Project image URL
                                </span>
                                <input
                                    type="url"
                                    value={form.image_url}
                                    onChange={(e) => updateField("image_url", e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violet-400"
                                    placeholder="https://example.com/project-image.png"
                                />
                            </label>

                            <label>
                                <span className="mb-2 block text-sm text-gray-300">
                                    Display order
                                </span>
                                <input
                                    type="number"
                                    min={1}
                                    step={1}
                                    required
                                    value={form.display_order}
                                    onChange={(e) => updateField("display_order", Number(e.target.value))}
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violet-400"
                                />
                            </label>

                            <div className="flex flex-col justify-center gap-4">
                                <label className="flex items-center gap-3 text-sm text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={form.featured}
                                        onChange={(e) => updateField("featured", e.target.checked)}
                                        className="h-4 w-4 accent-violet-500"
                                    />
                                    Featured project
                                </label>

                                <label className="flex items-center gap-3 text-sm text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={form.is_published}
                                        onChange={(e) => updateField("is_published", e.target.checked)}
                                        className="h-4 w-4 accent-violet-500"
                                    />
                                    Published on portfolio
                                </label>
                            </div>
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="mt-5 rounded-xl bg-red-400/10 p-3 text-sm text-red-300"
                            >
                                {error}
                            </p>
                        )}

                        <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-white/10 pt-6">
                            <button
                                type="button"
                                onClick={closeForm}
                                disabled={saving}
                                className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Save Changes"
                                        : "Create Project"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
}
