
import {
    FileText,
    Download,
    ArrowUpRight,
    BriefcaseBusiness,
    Code2,
    GraduationCap,
} from "lucide-react";

const highlights = [
    {
        icon: BriefcaseBusiness,
        text: "Professional software engineering experience",
    },
    {
        icon: Code2,
        text: "Java backend and full-stack projects",
    },
    {
        icon: GraduationCap,
        text: "B.Tech in Computer Science and Engineering",
    },
];

export default function Resume() {
    return (
        <section id="resume" className="section-padding relative">
            <div className="container-custom">
                <div className="glass-panel relative overflow-hidden rounded-3xl p-7 sm:p-12">
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

                    <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                        {/* Resume information */}
                        <div>
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                                Professional profile
                            </p>

                            <h2 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
                                Let's take a look at
                                <span className="gradient-text"> my resume.</span>
                            </h2>

                            <p className="mt-6 max-w-xl leading-8 text-gray-400">
                                Explore my professional experience, technical skills,
                                education and engineering projects in one place.
                            </p>

                            <div className="mt-8 space-y-4">
                                {highlights.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div key={item.text} className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                                                <Icon size={17} />
                                            </div>

                                            <p className="text-sm text-gray-300">
                                                {item.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <a
                                href="/resume.pdf"
                                download
                                className="mt-9 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-1 hover:shadow-violet-500/40"
                            >
                                <Download size={18} />
                                Download Resume
                                <ArrowUpRight size={16} />
                            </a>
                        </div>

                        {/* Resume preview illustration */}
                        <div className="flex justify-center">
                            <div className="relative w-full max-w-sm">
                                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-2xl" />

                                <div className="relative rotate-2 rounded-2xl border border-white/15 bg-[#111421] p-6 shadow-2xl transition-transform duration-500 hover:rotate-0 sm:p-8">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                        <div>
                                            <p className="font-heading text-xl font-bold text-white">
                                                SANDEEP KARNE
                                            </p>
                                            <p className="mt-1 text-xs text-violet-300">
                                                Software Development Engineer
                                            </p>
                                        </div>

                                        <FileText size={28} className="text-violet-300" />
                                    </div>

                                    <div className="mt-6 space-y-5">
                                        {["Professional Summary", "Technical Skills", "Experience", "Projects", "Education"].map((heading) => (
                                            <div key={heading}>
                                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                                                    {heading}
                                                </p>

                                                <div className="space-y-2">
                                                    <div className="h-1.5 w-full rounded-full bg-white/10" />
                                                    <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-[10px] text-gray-500">
                      PROFESSIONAL RESUME
                    </span>

                                        <span className="text-[10px] font-semibold text-violet-300">
                      PDF
                    </span>
                                    </div>
                                </div>

                                <div className="absolute -bottom-5 -right-3 flex items-center gap-2 rounded-xl border border-violet-400/20 bg-[#171525] px-4 py-3 shadow-xl">
                                    <FileText size={17} className="text-violet-300" />
                                    <span className="text-xs font-medium text-white">
                    Resume Preview
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
