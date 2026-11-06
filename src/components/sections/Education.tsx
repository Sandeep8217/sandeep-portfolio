
import { GraduationCap, MapPin, Award } from "lucide-react";

export default function Education() {
    return (
        <section id="education" className="section-padding relative">
            <div className="container-custom">
                <div className="mb-12">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                        Academic background
                    </p>

                    <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                        Education &
                        <span className="gradient-text"> learning.</span>
                    </h2>

                    <p className="mt-6 max-w-2xl leading-8 text-gray-400">
                        The academic foundation behind my journey in software
                        engineering and technology.
                    </p>
                </div>

                <div className="glass-panel relative overflow-hidden rounded-3xl p-7 sm:p-10">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

                    <div className="relative flex flex-col gap-7 sm:flex-row sm:items-start">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                            <GraduationCap size={32} />
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Graduated · 2025
                </span>

                                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin size={14} />
                  Dharwad, Karnataka, India
                </span>
                            </div>

                            <h3 className="mt-5 font-heading text-2xl font-bold text-white sm:text-3xl">
                                B.Tech – Computer Science and Engineering
                            </h3>

                            <p className="mt-3 text-lg font-semibold text-violet-300">
                                SDM College of Engineering and Technology
                            </p>

                            <div className="mt-7 flex flex-wrap gap-4">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Award size={17} className="text-violet-300" />
                                        <span className="text-xs uppercase tracking-wider">
                      Academic performance
                    </span>
                                    </div>

                                    <p className="mt-2 font-heading text-2xl font-bold text-white">
                                        9.2 <span className="text-sm font-medium text-gray-400">CGPA</span>
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                                    <p className="text-xs uppercase tracking-wider text-gray-400">
                                        Qualification
                                    </p>

                                    <p className="mt-2 font-heading text-lg font-bold text-white">
                                        Undergraduate
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
