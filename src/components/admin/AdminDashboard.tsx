
import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Mail,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    Search,
    Bell,
    ArrowUpRight,
    Inbox,
    Menu,
    RefreshCw,
    AlertCircle,
} from "lucide-react";

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    company: string | null;
    category: string;
    message: string;
    status: "NEW" | "READ";
    created_at: string;
};

type DashboardData = {
    success: boolean;
    stats: {
        totalMessages: number;
        unreadMessages: number;
        readMessages: number;
    };
    messages: ContactMessage[];
};

const menuItems = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Messages", icon: Mail },
    { label: "Analytics", icon: ArrowUpRight },
    { label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const loadDashboard = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/messages", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                cache: "no-store",
            });

            const result: unknown = await response.json();

            if (
                !response.ok ||
                !result ||
                typeof result !== "object" ||
                !("success" in result) ||
                result.success !== true
            ) {
                throw new Error("Unable to load dashboard data.");
            }

            setData(result as DashboardData);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadDashboard();
    }, []);

    const stats = [
        {
            label: "Total Messages",
            value: data?.stats.totalMessages ?? "—",
            icon: MessageSquare,
            color: "text-violet-400",
            background: "bg-violet-500/10",
        },
        {
            label: "Unread Messages",
            value: data?.stats.unreadMessages ?? "—",
            icon: Mail,
            color: "text-cyan-400",
            background: "bg-cyan-500/10",
        },
        {
            label: "Read Messages",
            value: data?.stats.readMessages ?? "—",
            icon: Inbox,
            color: "text-emerald-400",
            background: "bg-emerald-500/10",
        },
        {
            label: "Portfolio Visitors",
            value: "—",
            icon: Users,
            color: "text-amber-400",
            background: "bg-amber-500/10",
        },
    ];

    const filteredMessages = (data?.messages ?? []).filter((message) => {
        const query = search.toLowerCase();

        return (
            message.name.toLowerCase().includes(query) ||
            message.email.toLowerCase().includes(query) ||
            message.category.toLowerCase().includes(query)
        );
    });

    return (
        <main className="min-h-screen bg-[#080910] text-white">
            <div className="flex min-h-screen">

                {/* Sidebar */}
                <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0d0f19] p-6 lg:flex lg:flex-col">
                    <a href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold">
                            SK
                        </div>
                        <div>
                            <p className="font-bold">SANDEEP KARNE</p>
                            <p className="text-xs text-gray-500">Admin Console</p>
                        </div>
                    </a>

                    <div className="mt-12">
                        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                            Workspace
                        </p>

                        <nav className="space-y-2">
                            {menuItems.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.label}
                                        href={index === 0 ? "/admin" : "#"}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                                            index === 0
                                                ? "border border-violet-500/20 bg-violet-500/10 font-semibold text-violet-300"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                    </a>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto border-t border-white/10 pt-5">
                        <a
                            href="/"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <LogOut size={18} />
                            Back to Portfolio
                        </a>
                    </div>
                </aside>

                {/* Main Content */}
                <section className="min-w-0 flex-1">

                    {/* Header */}
                    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#0d0f19]/80 px-5 py-5 sm:px-8">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="rounded-lg border border-white/10 p-2 text-gray-400 lg:hidden"
                                aria-label="Menu"
                            >
                                <Menu size={20} />
                            </button>

                            <div>
                                <h1 className="font-heading text-xl font-bold sm:text-2xl">
                                    Dashboard Overview
                                </h1>
                                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                    Manage your portfolio from one place.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={loadDashboard}
                                disabled={loading}
                                aria-label="Refresh dashboard"
                                className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-gray-400 transition-colors hover:text-white disabled:opacity-50"
                            >
                                <RefreshCw
                                    size={18}
                                    className={loading ? "animate-spin" : ""}
                                />
                            </button>

                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20 font-bold text-violet-300">
                                    SK
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-semibold">Administrator</p>
                                    <p className="text-xs text-gray-500">
                                        Portfolio Owner
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Body */}
                    <div className="p-5 sm:p-8">

                        <div className="mb-8">
                            <p className="text-sm font-medium text-violet-400">
                                ADMINISTRATION
                            </p>
                            <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                                Welcome back!
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Here's an overview of your portfolio activity.
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
                                <AlertCircle size={19} />
                                {error}
                            </div>
                        )}

                        {/* Statistics */}
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={stat.label}
                                        className="rounded-2xl border border-white/10 bg-[#10121e] p-5 transition-colors hover:border-violet-500/30"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-400">
                                                {stat.label}
                                            </p>
                                            <div className={`rounded-xl p-3 ${stat.background} ${stat.color}`}>
                                                <Icon size={19} />
                                            </div>
                                        </div>

                                        <p className="mt-5 text-3xl font-bold">
                                            {loading ? "..." : stat.value}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Messages */}
                        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#10121e]">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
                                <div>
                                    <h3 className="font-heading text-lg font-bold">
                                        Recent Messages
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Your latest contact form submissions
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                                    <Search size={16} className="text-gray-500" />
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search messages..."
                                        className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-gray-500 sm:w-48"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[750px] text-left">
                                    <thead className="bg-white/[0.02]">
                                    <tr className="text-xs uppercase tracking-wider text-gray-500">
                                        <th className="px-6 py-4 font-medium">Sender</th>
                                        <th className="px-6 py-4 font-medium">Category</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-white/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-16 text-center text-sm text-gray-500">
                                                Loading messages...
                                            </td>
                                        </tr>
                                    ) : filteredMessages.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-16 text-center">
                                                <Inbox size={36} className="mx-auto text-gray-600" />
                                                <p className="mt-4 font-semibold text-gray-300">
                                                    No messages found
                                                </p>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Your contact submissions will appear here.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMessages.map((message) => (
                                            <tr key={message.id} className="transition-colors hover:bg-white/[0.02]">
                                                <td className="px-6 py-5">
                                                    <p className="font-medium text-white">
                                                        {message.name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {message.email}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-5 text-sm text-gray-300">
                                                    {message.category}
                                                </td>

                                                <td className="px-6 py-5 text-sm text-gray-400">
                                                    {new Date(message.created_at).toLocaleDateString("en-IN")}
                                                </td>

                                                <td className="px-6 py-5">
                                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                            message.status === "NEW"
                                                                ? "bg-cyan-400/10 text-cyan-300"
                                                                : "bg-emerald-400/10 text-emerald-300"
                                                        }`}>
                                                            {message.status === "NEW" ? "Unread" : "Read"}
                                                        </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-xs text-gray-600">
                            Sandeep Karne Admin Console
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
