
import {
    ArrowUp,
    ArrowUpRight,
    Code2,
    ExternalLink,
    Mail,
} from "lucide-react";

const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/10 bg-[#080910]">
            <div className="container-custom py-14">
                <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <a href="#home" className="inline-flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 font-heading text-lg font-bold text-white">
                                SK
                            </div>

                            <div>
                                <p className="font-heading text-sm font-bold tracking-wide text-white">
                                    SANDEEP KARNE
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                                    Software Engineer
                                </p>
                            </div>
                        </a>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400">
                            Building scalable backend systems, modern full-stack
                            applications and solving challenging engineering problems.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold text-white">
                            Quick Links
                        </h3>

                        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-gray-400 transition-colors hover:text-violet-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social links */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold text-white">
                            Connect
                        </h3>

                        <div className="space-y-4">
                            <a
                                href="https://github.com/Sandeep8217"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-violet-300"
                            >
                                <Code2 size={18} />
                                GitHub
                                <ArrowUpRight size={14} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/sandeepkarne/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-violet-300"
                            >
                                <ExternalLink size={18} />
                                LinkedIn
                                <ArrowUpRight size={14} />
                            </a>

                            <a
                                href="https://leetcode.com/u/Sandeep_karne/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-violet-300"
                            >
                                <Code2 size={18} />
                                LeetCode
                                <ArrowUpRight size={14} />
                            </a>

                            <a
                                href="mailto:sandeepkarne126@gmail.com"
                                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-violet-300"
                            >
                                <Mail size={18} />
                                Email
                                <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row">
                    <p className="text-center text-xs text-gray-500">
                        © {currentYear} Sandeep Karne. All rights reserved.
                    </p>

                    <p className="text-xs text-gray-500">
                        Designed & built with passion.
                    </p>

                    <a
                        href="#home"
                        aria-label="Back to top"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition-all hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
                    >
                        <ArrowUp size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
