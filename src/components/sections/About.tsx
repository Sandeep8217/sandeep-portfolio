
import {
    ArrowUpRight,
    Code2,
    Database,
    Layers3,
    Rocket,
} from "lucide-react";

const highlights = [
    {
        icon: Code2,
        title: "Backend Engineering",
        description: "Building REST APIs, backend services and scalable application logic.",
    },
    {
        icon: Layers3,
        title: "Full Stack Development",
        description: "Connecting modern React interfaces with reliable backend systems.",
    },
    {
        icon: Database,
        title: "Database Engineering",
        description: "Designing data models and working with SQL and NoSQL databases.",
    },
    {
        icon: Rocket,
        title: "Continuous Growth",
        description: "Learning, experimenting and improving through practical engineering.",
    },
];

export default function About() {
    return (
        <section id="about" className="section-padding relative">
            <div className="container-custom">
                {/* Section heading */}
                <div className="mb-14 max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                        Get to know me
                    </p>

                    <h2 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
                        Engineering ideas into
                        <span className="gradient-text"> real solutions.</span>
                    </h2>

                    <p className="mt-6 max-w-2xl leading-8 text-gray-400">
                        I'm a Software Development Engineer focused on Java backend
                        development and full-stack engineering. I enjoy designing
                        reliable systems, solving complex problems and turning ideas
                        into practical applications.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
                    {/* Professional summary */}
                    <div className="glass-panel rounded-3xl p-7 sm:p-9">
                        <div className="mb-7 flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                                <Code2 size={24} />
                            </div>

                            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                Software Engineer
              </span>
                        </div>

                        <h3 className="font-heading text-2xl font-bold text-white">
                            My approach to engineering
                        </h3>

                        <p className="mt-5 leading-8 text-gray-400">
                            My work revolves around building maintainable backend
                            architectures, developing RESTful services and integrating
                            applications across the full stack.
                        </p>

                        <p className="mt-4 leading-8 text-gray-400">
                            I value clean code, thoughtful system design, performance
                            and continuous improvement. I believe strong engineering
                            comes from understanding the problem before choosing
                            the solution.
                        </p>

                        <a
                            href="#experience"
                            className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-300 transition-colors hover:text-violet-200"
                        >
                            Explore my experience
                            <ArrowUpRight size={17} />
                        </a>
                    </div>

                    {/* Engineering highlights */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        {highlights.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    key={item.title}
                                    className="glass-panel group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-500/[0.04]"
                                >
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-colors group-hover:bg-violet-500/20">
                                        <Icon size={23} />
                                    </div>

                                    <h3 className="font-heading text-lg font-semibold text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-gray-400">
                                        {item.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
