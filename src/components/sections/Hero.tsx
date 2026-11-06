
import { useEffect, useState } from "react";
import {
    ArrowDown,
    ArrowUpRight,
    Download,
    Code2,
    Sparkles,
    ExternalLink,
} from "lucide-react";

const specializations = [
    "Java Backend Developer",
    "Full Stack Developer",
    "Problem Solver",
];

const technologies = ["Java", "Spring Boot", "React", "PostgreSQL"];

export default function Hero() {
    const [activeRole, setActiveRole] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveRole((current) => (current + 1) % specializations.length);
        }, 2800);

        return () => window.clearInterval(interval);
    }, []);

    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-32 md:px-10 lg:px-16"
        >
            {/* Background atmosphere */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[130px]" />

            <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">

                {/* LEFT CONTENT */}
                <div className="relative z-10">

                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <Sparkles size={15} />
                        Available for opportunities
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    </div>

                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                        Hello, I'm
                    </p>

                    <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                        Sandeep
                        <br />
                        <span className="gradient-text">Karne.</span>
                    </h1>

                    {/* Animated specialization */}
                    <div className="mt-7 flex min-h-10 items-center gap-3">
                        <span className="h-7 w-1 rounded-full bg-violet-500" />

                        <p
                            key={activeRole}
                            className="animate-[fadeIn_0.5s_ease] font-heading text-xl font-semibold text-gray-200 sm:text-2xl"
                        >
                            {specializations[activeRole]}
                        </p>
                    </div>

                    <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
                        I build scalable backend systems, modern full-stack applications
                        and solve challenging algorithmic problems. Focused on clean
                        architecture, performance and real-world impact.
                    </p>

                    {/* CTA BUTTONS */}
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                        <a
                            href="#projects"
                            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/40"
                        >
                            <Code2 size={19} />
                            Explore My Projects
                            <ArrowUpRight
                                size={17}
                                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                            />
                        </a>

                        <a
                            href="/resume.pdf"
                            download
                            className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/10"
                        >
                            <Download size={19} />
                            Download My Resume
                        </a>

                    </div>

                    {/* SOCIAL LINKS */}
                    <div className="mt-10 flex items-center gap-4">

                        <a
                            href="https://github.com/Sandeep8217"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub profile"
                            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-violet-400/40 hover:text-violet-300"
                        >
                            <ExternalLink size={21} />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/sandeepkarne/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn profile"
                            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-violet-400/40 hover:text-violet-300"
                        >
                            <ExternalLink size={21} />
                        </a>

                        <a
                            href="https://leetcode.com/u/Sandeep_karne/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LeetCode profile"
                            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-violet-400/40 hover:text-violet-300"
                        >
                            <Code2 size={21} />
                        </a>

                    </div>

                </div>

                {/* RIGHT VISUAL */}
                <div className="relative mx-auto flex aspect-square w-full max-w-[470px] items-center justify-center">

                    {/* Outer orbit */}
                    <div className="absolute inset-4 rounded-full border border-violet-400/10" />

                    <div className="absolute inset-10 rounded-full border border-dashed border-violet-400/20" />

                    {/* Glow */}
                    <div className="absolute h-[70%] w-[70%] rounded-full bg-violet-600/20 blur-[90px]" />

                    {/* Portrait placeholder */}
                    <div className="relative flex h-[72%] w-[72%] flex-col items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-gradient-to-br from-violet-500/20 via-[#171326] to-indigo-500/20 shadow-[0_0_80px_rgba(139,92,246,0.22)]">

                        <div className="absolute inset-3 rounded-full border border-white/10" />

                        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-2xl shadow-violet-500/30">
              <span className="font-heading text-4xl font-bold text-white">
                SK
              </span>
                        </div>

                        <p className="mt-6 font-heading text-lg font-semibold text-white">
                            Your Portrait
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                            Professional photo coming soon
                        </p>

                    </div>

                    {/* Floating technology tags */}
                    <div className="absolute -left-2 top-[22%] rounded-xl border border-violet-400/20 bg-[#121321]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-5">
            <span className="text-sm font-semibold text-violet-300">
              Java
            </span>
                    </div>

                    <div className="absolute -right-2 top-[30%] rounded-xl border border-indigo-400/20 bg-[#121321]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-5">
            <span className="text-sm font-semibold text-indigo-300">
              Spring Boot
            </span>
                    </div>

                    <div className="absolute bottom-[20%] left-0 rounded-xl border border-cyan-400/20 bg-[#121321]/90 px-4 py-3 shadow-xl backdrop-blur-xl">
            <span className="text-sm font-semibold text-cyan-300">
              React
            </span>
                    </div>

                    <div className="absolute bottom-[15%] right-0 rounded-xl border border-violet-400/20 bg-[#121321]/90 px-4 py-3 shadow-xl backdrop-blur-xl">
            <span className="text-sm font-semibold text-violet-300">
              PostgreSQL
            </span>
                    </div>

                    {/* Decorative floating icon */}
                    <div className="absolute right-[15%] top-[8%] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#171525] text-violet-300 shadow-xl">
                        <Sparkles size={21} />
                    </div>

                    <div className="absolute bottom-[5%] left-[35%] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#171525] text-indigo-300 shadow-xl">
                        <Code2 size={21} />
                    </div>

                </div>

            </div>

            {/* Scroll indicator */}
            <a
                href="#about"
                aria-label="Scroll to About section"
                className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-500 transition-colors hover:text-violet-300 md:flex"
            >
        <span className="text-[10px] uppercase tracking-[0.3em]">
          Scroll to explore
        </span>
                <ArrowDown size={17} className="animate-bounce" />
            </a>

        </section>
    );
}
