
import { useState } from "react";
import { Menu, X, ArrowUpRight, Download, ShieldCheck } from "lucide-react";

const navigation = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "LeetCode", href: "#leetcode" },
    { label: "GitHub", href: "#github" },
    { label: "Courses", href: "#courses" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="fixed left-0 right-0 top-0 z-[100] isolate px-3 pt-3 sm:px-4 sm:pt-4">
            <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#10111f] px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-xl sm:px-5">

                {/* Logo */}
                <a
                    href="#home"
                    onClick={closeMenu}
                    className="flex shrink-0 items-center gap-3"
                    aria-label="Sandeep Karne home"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 font-heading text-lg font-bold text-white shadow-lg shadow-violet-500/20">
                        SK
                    </div>

                    <div className="hidden sm:block">
                        <p className="font-heading text-sm font-bold tracking-wide text-white">
                            SANDEEP KARNE
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                            Software Engineer
                        </p>
                    </div>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-5 xl:gap-7 lg:flex">
                    {navigation.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="whitespace-nowrap text-sm text-gray-300 transition-colors duration-200 hover:text-violet-400"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden shrink-0 items-center gap-3 lg:flex">
                    <a
                        href="/admin"
                        className="flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/10 px-3 py-2.5 text-sm font-semibold text-violet-300 transition-all hover:border-violet-400/60 hover:bg-violet-500/20"
                    >
                        <ShieldCheck size={15} />
                        Admin Login
                    </a>

                    <a
                        href="/resume.pdf"
                        download
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40"
                    >
                        <Download size={15} />
                        Resume
                        <ArrowUpRight size={14} />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div
                    id="mobile-navigation"
                    className="mx-auto mt-3 max-h-[calc(100dvh-100px)] max-w-7xl overflow-y-auto rounded-2xl border border-white/10 bg-[#10111f] p-4 shadow-2xl shadow-black/70 backdrop-blur-xl lg:hidden"
                >
                    <div className="mb-3 border-b border-white/10 px-3 pb-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                            Navigation
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            Explore my portfolio
                        </p>
                    </div>

                    <div className="flex flex-col gap-1">
                        {navigation.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={closeMenu}
                                className="flex items-center rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-gray-200 transition-all hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300 active:bg-violet-500/20"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Admin Login */}
                    <a
                        href="/admin"
                        onClick={closeMenu}
                        className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300 transition-all hover:bg-violet-500/20"
                    >
                        <ShieldCheck size={17} />
                        Admin Login
                        <ArrowUpRight size={15} />
                    </a>

                    {/* Mobile Resume */}
                    <a
                        href="/resume.pdf"
                        download
                        onClick={closeMenu}
                        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:brightness-110"
                    >
                        <Download size={16} />
                        Download Resume
                        <ArrowUpRight size={15} />
                    </a>
                </div>
            )}
        </header>
    );
}
