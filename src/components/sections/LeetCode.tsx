
import {
    Code2,
    Trophy,
    Flame,
    Target,
    ExternalLink,
    TrendingUp,
} from "lucide-react";

const difficulty = [
    { label: "Easy", color: "bg-emerald-400", width: "0%" },
    { label: "Medium", color: "bg-amber-400", width: "0%" },
    { label: "Hard", color: "bg-rose-400", width: "0%" },
];

const activity = Array.from({ length: 140 }, (_, index) => ({
    id: index,
    level: 0,
}));

const stats = [
    {
        label: "Problems Solved",
        value: "—",
        icon: Code2,
        description: "Total solved",
    },
    {
        label: "Contest Rating",
        value: "—",
        icon: Trophy,
        description: "Current rating",
    },
    {
        label: "Current Streak",
        value: "—",
        icon: Flame,
        description: "Consecutive days",
    },
    {
        label: "Longest Streak",
        value: "—",
        icon: Target,
        description: "Personal best",
    },
];

export default function LeetCode() {
    return (
        <section id="leetcode" className="section-padding relative">
            <div className="container-custom">
                {/* Heading */}
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-3xl">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                            Problem solving
                        </p>

                        <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                            Beyond building,
                            <span className="gradient-text"> solving.</span>
                        </h2>

                        <p className="mt-6 leading-8 text-gray-400">
                            My competitive programming journey, problem-solving
                            practice and continuous improvement through algorithms
                            and data structures.
                        </p>
                    </div>

                    <a
                        href="https://leetcode.com/u/Sandeep_karne/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-amber-400/30 hover:text-amber-300"
                    >
                        View LeetCode Profile
                        <ExternalLink size={16} />
                    </a>
                </div>

                {/* Main dashboard */}
                <div className="glass-panel rounded-3xl p-6 sm:p-8">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
                                <Code2 size={22} />
                            </div>

                            <div>
                                <h3 className="font-heading text-lg font-bold text-white">
                                    LeetCode Statistics
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Sandeep_karne
                                </p>
                            </div>
                        </div>

                        <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-400">
              Awaiting live data
            </span>
                    </div>

                    {/* Statistic cards */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">
                                            {stat.label}
                                        </p>

                                        <Icon size={18} className="text-amber-300" />
                                    </div>

                                    <p className="mt-5 font-heading text-3xl font-bold text-white">
                                        {stat.value}
                                    </p>

                                    <p className="mt-2 text-xs text-gray-500">
                                        {stat.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Difficulty breakdown */}
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                        <h4 className="font-semibold text-white">
                            Problem difficulty breakdown
                        </h4>

                        <p className="mt-1 text-xs text-gray-500">
                            Actual solved counts will appear after integration.
                        </p>

                        <div className="mt-6 space-y-5">
                            {difficulty.map((item) => (
                                <div key={item.label}>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="text-gray-300">{item.label}</span>
                                        <span className="text-gray-500">—</span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className={`h-full rounded-full ${item.color}`}
                                            style={{ width: item.width }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity heatmap placeholder */}
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h4 className="font-semibold text-white">
                                    Submission activity
                                </h4>

                                <p className="mt-1 text-xs text-gray-500">
                                    Your coding consistency over time
                                </p>
                            </div>

                            <TrendingUp size={19} className="text-emerald-400" />
                        </div>

                        <div className="mt-6 overflow-x-auto pb-2">
                            <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
                                {activity.map((day) => (
                                    <div
                                        key={day.id}
                                        title="Activity data not loaded"
                                        className="h-3 w-3 rounded-[3px] border border-white/5 bg-white/[0.06]"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-gray-500">
                            Less
                            <span className="h-3 w-3 rounded-sm bg-white/[0.06]" />
                            <span className="h-3 w-3 rounded-sm bg-emerald-900/60" />
                            <span className="h-3 w-3 rounded-sm bg-emerald-700/70" />
                            <span className="h-3 w-3 rounded-sm bg-emerald-500" />
                            More
                        </div>
                    </div>

                    {/* Contest section */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                            <div className="flex items-center gap-3">
                                <Trophy size={20} className="text-amber-300" />
                                <h4 className="font-semibold text-white">
                                    Contest performance
                                </h4>
                            </div>

                            <p className="mt-5 font-heading text-3xl font-bold text-white">
                                —
                            </p>

                            <p className="mt-2 text-xs text-gray-500">
                                Maximum contest rating
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                            <div className="flex items-center gap-3">
                                <Flame size={20} className="text-orange-300" />
                                <h4 className="font-semibold text-white">
                                    Consistency
                                </h4>
                            </div>

                            <p className="mt-5 font-heading text-3xl font-bold text-white">
                                —
                            </p>

                            <p className="mt-2 text-xs text-gray-500">
                                Total active days
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
