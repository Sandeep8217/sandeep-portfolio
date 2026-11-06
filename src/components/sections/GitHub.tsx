
// @ts-ignore
// @ts-ignore
import {
    Code2,
    GitBranch,
    Star,
    Users,
    ExternalLink,
    Activity,
} from "lucide-react";

const metrics = [
    { label: "Public Repositories", value: "—", icon: GitBranch },
    { label: "Followers", value: "—", icon: Users },
    { label: "Total Stars", value: "—", icon: Star },
    { label: "Contributions", value: "—", icon: Activity },
];

const languages = [
    "Java",
    "JavaScript",
    "TypeScript",
    "Python",
    "HTML",
    "CSS",
];

export default function GitHub() {
    return (
        <section id="github" className="section-padding relative">
            <div className="container-custom">
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-3xl">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                            Open source & development
                        </p>

                        <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                            My work on
                            <span className="gradient-text"> GitHub.</span>
                        </h2>

                        <p className="mt-6 leading-8 text-gray-400">
                            Explore my repositories, programming languages and
                            development activity across personal projects.
                        </p>
                    </div>

                    <a
                        href="https://github.com/Sandeep8217"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-violet-400/30 hover:text-violet-300"
                    >
                        Visit GitHub
                        <ExternalLink size={16} />
                    </a>
                </div>

                <div className="glass-panel rounded-3xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
                                <Code2 size={23} />
                            </div>

                            <div>
                                <h3 className="font-heading text-lg font-bold text-white">
                                    Sandeep Karne
                                </h3>
                                <p className="text-sm text-gray-500">
                                    @Sandeep8217
                                </p>
                            </div>
                        </div>

                        <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-400">
              Awaiting live data
            </span>
                    </div>

                    {/* Profile metrics */}
                    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {metrics.map((metric) => {
                            const Icon = metric.icon;

                            return (
                                <div
                                    key={metric.label}
                                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">
                                            {metric.label}
                                        </p>
                                        <Icon size={18} className="text-violet-300" />
                                    </div>

                                    <p className="mt-5 font-heading text-3xl font-bold text-white">
                                        {metric.value}
                                    </p>

                                    <p className="mt-2 text-xs text-gray-500">
                                        Profile statistics
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Languages */}
                    <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                        <h4 className="font-semibold text-white">
                            Technologies across my work
                        </h4>

                        <p className="mt-2 text-sm text-gray-500">
                            Languages will be ranked using actual repository data.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            {languages.map((language) => (
                                <span
                                    key={language}
                                    className="rounded-xl border border-violet-400/15 bg-violet-500/[0.06] px-4 py-2 text-sm text-gray-300"
                                >
                  {language}
                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contribution placeholder */}
                    <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                        <div className="flex items-center gap-3">
                            <Code2 size={20} className="text-violet-300" />
                            <h4 className="font-semibold text-white">
                                Contribution activity
                            </h4>
                        </div>

                        <div className="mt-6 flex min-h-28 items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/10">
                            <p className="text-sm text-gray-500">
                                Contribution calendar will appear after GitHub integration.
                            </p>
                        </div>
                    </div>

                    {/* Recent repositories placeholder */}
                    <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <h4 className="font-semibold text-white">
                                Recent repositories
                            </h4>
                            <GitBranch size={19} className="text-violet-300" />
                        </div>

                        <div className="flex min-h-20 items-center justify-center rounded-xl border border-dashed border-white/10">
                            <p className="text-sm text-gray-500">
                                Your repositories will load here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
