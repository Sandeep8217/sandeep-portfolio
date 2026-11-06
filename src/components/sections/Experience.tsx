
import { BriefcaseBusiness, MapPin, ArrowUpRight } from "lucide-react";

const experiences = [
    {
        company: "Virtusa",
        role: "Software Engineer",
        period: "December 2025 – Present",
        location: "Chennai, India",
        type: "Full-time",
        description:
            "Working on enterprise application development, backend services and full-stack engineering.",
        responsibilities: [
            "Developing backend services and REST APIs using Java and Spring Boot.",
            "Implementing authentication, authorization and application security using Spring Security and JWT.",
            "Working with Spring Data JPA, Hibernate and relational databases.",
            "Building business workflows, validations and centralized exception handling.",
            "Collaborating through code reviews, Git, Jenkins, SonarQube and Agile practices.",
        ],
        technologies: [
            "Java",
            "Spring Boot",
            "Spring Security",
            "JPA",
            "Hibernate",
            "SQL",
            "React",
            "Git",
        ],
    },
    {
        company: "NexusLogic Technologies",
        role: "Full Stack Developer Intern",
        period: "July 2024 – September 2024",
        location: "Remote · Gadag, India",
        type: "Internship",
        description:
            "Contributed to full-stack web application development using the MERN ecosystem.",
        responsibilities: [
            "Developed dynamic web interfaces using React and EJS.",
            "Worked with MongoDB and Express.js for backend and database integration.",
            "Built and integrated REST APIs with frontend applications.",
            "Gained practical experience in application development and deployment fundamentals.",
        ],
        technologies: [
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "EJS",
            "JavaScript",
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="section-padding relative">
            <div className="container-custom">
                <div className="mb-16 max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                        Career journey
                    </p>

                    <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                        Professional
                        <span className="gradient-text"> experience.</span>
                    </h2>

                    <p className="mt-6 leading-8 text-gray-400">
                        My journey through software engineering, from building
                        full-stack applications to developing enterprise backend
                        systems.
                    </p>
                </div>

                <div className="relative ml-2 space-y-12 border-l border-violet-400/20 pl-7 sm:ml-4 sm:pl-12">
                    {experiences.map((experience, index) => (
                        <article key={experience.company} className="relative">
                            {/* Timeline marker */}
                            <div className="absolute -left-[35px] top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-violet-400 bg-[#080910] shadow-[0_0_18px_rgba(139,92,246,0.55)] sm:-left-[57px]">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                            </div>

                            <div className="glass-panel rounded-3xl p-6 sm:p-9">
                                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                                    <div>
                                        <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                        {experience.type}
                      </span>

                                            {index === 0 && (
                                                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Current role
                        </span>
                                            )}
                                        </div>

                                        <h3 className="font-heading text-2xl font-bold text-white">
                                            {experience.role}
                                        </h3>

                                        <p className="mt-2 text-lg font-semibold text-violet-300">
                                            {experience.company}
                                        </p>
                                    </div>

                                    <div className="shrink-0 space-y-2 text-sm text-gray-400">
                                        <p className="flex items-center gap-2">
                                            <BriefcaseBusiness size={15} />
                                            {experience.period}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <MapPin size={15} />
                                            {experience.location}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-7 leading-7 text-gray-400">
                                    {experience.description}
                                </p>

                                <div className="mt-7">
                                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
                                        Key responsibilities
                                    </h4>

                                    <ul className="space-y-3">
                                        {experience.responsibilities.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-3 text-sm leading-7 text-gray-400"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8 border-t border-white/10 pt-6">
                                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
                                        Technologies
                                    </h4>

                                    <div className="flex flex-wrap gap-2">
                                        {experience.technologies.map((technology) => (
                                            <span
                                                key={technology}
                                                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300"
                                            >
                        {technology}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <a
                    href="#projects"
                    className="mt-10 inline-flex items-center gap-2 font-semibold text-violet-300 transition-colors hover:text-violet-200"
                >
                    Explore projects
                    <ArrowUpRight size={17} />
                </a>
            </div>
        </section>
    );
}
