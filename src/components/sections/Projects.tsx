
import {
    ArrowUpRight,
    Code2,
    ExternalLink,
    FolderCode,
} from "lucide-react";

const projects = [
    {
        number: "01",
        title: "Financial Habit Builder",
        subtitle: "Personal Finance & Wealth Tracking",
        description:
            "A full-stack platform for tracking expenses, managing savings goals, building financial habits and monitoring personal net worth.",
        technologies: ["Java", "Spring Boot", "React", "PostgreSQL"],
        github: "https://github.com/Sandeep8217/financial-habit-builder",
        demo: "https://wealthwise-frontend-ept5.onrender.com/",
        featured: true,
    },
    {
        number: "02",
        title: "ReWear",
        subtitle: "Clothing Exchange Marketplace",
        description:
            "A clothing exchange platform that enables users to list items, discover clothing and exchange one item for another.",
        technologies: ["Spring Boot", "React", "MongoDB", "JWT"],
        github: "https://github.com/Sandeep8217/Clothing-Exchange-Api",
        demo: "https://rewear-frontend-we7t.onrender.com/",
    },
    {
        number: "03",
        title: "E-commerce Microservices",
        subtitle: "Distributed Backend Architecture",
        description:
            "A modular e-commerce backend built around independent services and REST-based communication.",
        technologies: ["Java", "Spring Boot", "Microservices"],
        github: "https://github.com/Sandeep8217/Ecom-Application-MicroServices",
        demo: "",
    },
    {
        number: "04",
        title: "Banking Management API",
        subtitle: "Backend Banking Application",
        description:
            "A backend application implementing banking operations and REST APIs using Spring Boot.",
        technologies: ["Java", "Spring Boot", "Docker"],
        github: "https://github.com/Sandeep8217/banking-management-api",
        demo: "",
    },
    {
        number: "05",
        title: "Hospital Management System",
        subtitle: "Healthcare Application",
        description:
            "A role-based healthcare application for administrators, doctors and patients with appointment management.",
        technologies: ["MongoDB", "Express", "React", "Node.js"],
        github: "https://github.com/Sandeep8217/Hospital-Management-Systems",
        demo: "https://hospital-management-systems-1-hxez.onrender.com",
    },
    {
        number: "06",
        title: "AI Document Assistant",
        subtitle: "AI-powered Document Application",
        description:
            "An AI-powered application for interacting with and understanding documents.",
        technologies: ["React", "Node.js", "LangChain"],
        github: "https://github.com/Sandeep8217/AI-Document-Assistant",
        demo: "",
    },
];

export default function Projects() {
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
                            <span className="gradient-text"> solve problems.</span>
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

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <article
                            key={project.number}
                            className={`glass-panel group flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 ${
                                project.featured ? "md:col-span-2 lg:col-span-2" : ""
                            }`}
                        >
                            <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-cyan-500/10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_65%)]" />

                                <FolderCode
                                    size={project.featured ? 64 : 52}
                                    strokeWidth={1}
                                    className="relative text-violet-300/80 transition-transform duration-500 group-hover:scale-110"
                                />

                                <span className="absolute left-6 top-5 font-mono text-xs tracking-widest text-violet-300/70">
                  PROJECT_{project.number}
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
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-violet-300"
                                    >
                                        <Code2 size={17} />
                                        GitHub
                                        <ArrowUpRight size={14} />
                                    </a>

                                    {project.demo ? (
                                        <a
                                            href={project.demo}
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
            </div>
        </section>
    );
}
