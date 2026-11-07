
import { useEffect, useState } from "react";
import {
    ArrowUpRight,
    Code2,
    ExternalLink,
    FolderCode,
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
};

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetch("/api/projects", {
                    headers: {
                        Accept: "application/json",
                    },
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
                    throw new Error("Unable to load projects.");
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

        void loadProjects();
    }, []);

    return (
        <section id="projects" className="section-padding relative">
            <div className="container-custom">
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-3xl">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                            Selected work
                        </p>

                        <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                            Projects that
                            <span className="gradient-text">
                                {" "}solve problems.
                            </span>
                        </h2>

                        <p className="mt-6 leading-8 text-gray-400">
                            A collection of applications and engineering projects
                            demonstrating my approach to solving real-world problems.
                        </p>
                    </div>

                    <a
                        href="https://github.com/Sandeep8217"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 font-semibold text-violet-300 transition-colors hover:text-violet-200"
                    >
                        View GitHub profile
                        <ArrowUpRight size={17} />
                    </a>
                </div>

                {loading && (
                    <p className="py-16 text-center text-sm text-gray-400">
                        Loading projects...
                    </p>
                )}

                {!loading && error && (
                    <p
                        role="alert"
                        className="rounded-xl border border-red-400/20 bg-red-400/10 p-5 text-center text-sm text-red-300"
                    >
                        {error}
                    </p>
                )}

                {!loading && !error && projects.length === 0 && (
                    <p className="py-16 text-center text-sm text-gray-400">
                        No projects available right now.
                    </p>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, index) => (
                            <article
                                key={project.id}
                                className={`glass-panel group flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 ${
                                    project.featured
                                        ? "md:col-span-2 lg:col-span-2"
                                        : ""
                                }`}
                            >
                                <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-cyan-500/10">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_65%)]" />

                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <FolderCode
                                            size={project.featured ? 64 : 52}
                                            strokeWidth={1}
                                            className="relative text-violet-300/80 transition-transform duration-500 group-hover:scale-110"
                                        />
                                    )}

                                    <span className="absolute left-6 top-5 font-mono text-xs tracking-widest text-violet-300/70">
                                        PROJECT_{String(index + 1).padStart(2, "0")}
                                    </span>

                                    {project.featured && (
                                        <span className="absolute right-5 top-5 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-200">
                                            Featured project
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-6 sm:p-7">
                                    <p className="text-xs font-medium uppercase tracking-wider text-violet-300">
                                        {project.subtitle}
                                    </p>

                                    <h3 className="mt-3 font-heading text-xl font-bold text-white">
                                        {project.title}
                                    </h3>

                                    <p className="mt-4 flex-1 text-sm leading-7 text-gray-400">
                                        {project.description}
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {project.technologies.map((technology) => (
                                            <span
                                                key={technology}
                                                className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-gray-300"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-7 flex items-center gap-5 border-t border-white/10 pt-5">
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-violet-300"
                                            >
                                                <Code2 size={17} />
                                                GitHub
                                                <ArrowUpRight size={14} />
                                            </a>
                                        )}

                                        {project.demo_url ? (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-violet-300"
                                            >
                                                <ExternalLink size={16} />
                                                Live demo
                                            </a>
                                        ) : (
                                            <span className="text-xs text-gray-500">
                                                Demo coming soon
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
