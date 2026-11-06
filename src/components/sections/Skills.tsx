
import {
    Code2,
    Server,
    Database,
    Globe,
    Cloud,
    Wrench,
    Terminal,
} from "lucide-react";

const skillGroups = [
    {
        title: "Programming Languages",
        description: "Languages I use to solve engineering problems.",
        icon: Code2,
        skills: ["Java", "JavaScript", "Python", "C++"],
    },
    {
        title: "Backend Development",
        description: "Building APIs, services and application architecture.",
        icon: Server,
        skills: [
            "Spring Boot",
            "Spring Security",
            "Hibernate",
            "JPA",
            "Node.js",
            "Express.js",
            "Microservices",
            "REST APIs",
        ],
    },
    {
        title: "Frontend Development",
        description: "Creating responsive and interactive web experiences.",
        icon: Globe,
        skills: ["React", "HTML", "CSS", "Tailwind CSS"],
    },
    {
        title: "Databases",
        description: "Working with relational and NoSQL data systems.",
        icon: Database,
        skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    },
    {
        title: "Cloud & Data",
        description: "Exploring cloud infrastructure and data platforms.",
        icon: Cloud,
        skills: ["AWS", "Snowflake", "dbt", "Docker"],
    },
    {
        title: "Developer Tools",
        description: "Tools that support development and delivery.",
        icon: Wrench,
        skills: [
            "Git",
            "GitHub",
            "Maven",
            "Postman",
            "Jenkins",
            "Swagger / OpenAPI",
            "SonarQube",
        ],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="section-padding relative">
            <div className="container-custom">
                <div className="mb-14 max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                        Technical expertise
                    </p>

                    <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                        My engineering
                        <span className="gradient-text"> toolkit.</span>
                    </h2>

                    <p className="mt-6 leading-8 text-gray-400">
                        Technologies and tools I work with across backend engineering,
                        full-stack development, databases and cloud platforms.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {skillGroups.map((group) => {
                        const Icon = group.icon;

                        return (
                            <article
                                key={group.title}
                                className="glass-panel group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-colors group-hover:bg-violet-500/20">
                                        <Icon size={23} />
                                    </div>

                                    <Terminal
                                        size={18}
                                        className="text-gray-600 transition-colors group-hover:text-violet-400"
                                    />
                                </div>

                                <h3 className="font-heading text-lg font-semibold text-white">
                                    {group.title}
                                </h3>

                                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-400">
                                    {group.description}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:border-violet-400/30 hover:text-violet-200"
                                        >
                      {skill}
                    </span>
                                    ))}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
