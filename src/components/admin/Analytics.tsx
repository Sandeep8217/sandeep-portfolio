
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { MessageSquare, Mail, Inbox, TrendingUp } from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

type AnalyticsData = {
    success: boolean;
    stats: {
        totalMessages: number;
        unreadMessages: number;
        readMessages: number;
    };
    monthlyMessages: {
        month: string;
        count: number;
    }[];
    categoryBreakdown: {
        category: string;
        count: number;
    }[];
};

export default function Analytics() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const response = await fetch("/api/admin/analytics", {
                    headers: { Accept: "application/json" },
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
                    throw new Error("Unable to load analytics.");
                }

                setData(result as AnalyticsData);
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

        void loadAnalytics();
    }, []);

    const stats = [
        {
            label: "Total Messages",
            value: data?.stats.totalMessages ?? 0,
            icon: MessageSquare,
            color: "text-violet-400",
            background: "bg-violet-500/10",
        },
        {
            label: "Unread Messages",
            value: data?.stats.unreadMessages ?? 0,
            icon: Mail,
            color: "text-cyan-400",
            background: "bg-cyan-500/10",
        },
        {
            label: "Read Messages",
            value: data?.stats.readMessages ?? 0,
            icon: Inbox,
            color: "text-emerald-400",
            background: "bg-emerald-500/10",
        },
    ];

    const monthlyData = {
        labels: (data?.monthlyMessages ?? []).map((item) => {
            const [year, month] = item.month.split("-");
            return new Date(Number(year), Number(month) - 1)
                .toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                });
        }),
        datasets: [
            {
                label: "Messages",
                data: (data?.monthlyMessages ?? []).map(
                    (item) => item.count
                ),
                borderColor: "#a78bfa",
                backgroundColor: "rgba(167, 139, 250, 0.12)",
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 7,
            },
        ],
    };

    const categoryData = {
        labels: (data?.categoryBreakdown ?? []).map(
            (item) => item.category
        ),
        datasets: [
            {
                data: (data?.categoryBreakdown ?? []).map(
                    (item) => item.count
                ),
                backgroundColor: [
                    "#8b5cf6",
                    "#06b6d4",
                    "#10b981",
                    "#f59e0b",
                    "#ec4899",
                    "#6366f1",
                ],
                borderColor: "#10121e",
                borderWidth: 3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "#9ca3af",
                    usePointStyle: true,
                    padding: 20,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#9ca3af" },
                grid: { color: "rgba(255,255,255,0.05)" },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#9ca3af",
                    precision: 0,
                },
                grid: { color: "rgba(255,255,255,0.05)" },
            },
        },
    };

    return (
        <section>
            <div className="mb-8">
                <p className="text-sm font-medium text-violet-400">
                    ANALYTICS
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                    Portfolio Analytics
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                    Understand your contact activity and message trends.
                </p>
            </div>

            {error && (
                <div
                    role="alert"
                    className="mb-6 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
                >
                    {error}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-white/10 bg-[#10121e] p-5"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-400">
                                    {stat.label}
                                </p>
                                <div
                                    className={`rounded-xl p-3 ${stat.background} ${stat.color}`}
                                >
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

            <div className="mt-8 grid gap-6 xl:grid-cols-5">
                <div className="rounded-2xl border border-white/10 bg-[#10121e] p-5 sm:p-6 xl:col-span-3">
                    <div className="mb-6">
                        <h3 className="font-heading text-lg font-bold">
                            Monthly Messages
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Contact submissions over the last six months
                        </p>
                    </div>

                    <div className="h-72">
                        {loading ? (
                            <p className="pt-20 text-center text-sm text-gray-500">
                                Loading chart...
                            </p>
                        ) : data?.monthlyMessages.length ? (
                            <Line
                                data={monthlyData}
                                options={chartOptions}
                            />
                        ) : (
                            <p className="pt-20 text-center text-sm text-gray-500">
                                No monthly message data available yet.
                            </p>
                        )}
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#10121e] p-5 sm:p-6 xl:col-span-2">
                    <div className="mb-6">
                        <h3 className="font-heading text-lg font-bold">
                            Message Categories
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Breakdown by contact category
                        </p>
                    </div>

                    <div className="flex h-72 items-center justify-center">
                        {loading ? (
                            <p className="text-sm text-gray-500">
                                Loading chart...
                            </p>
                        ) : data?.categoryBreakdown.length ? (
                            <Doughnut
                                data={categoryData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "bottom",
                                            labels: {
                                                color: "#9ca3af",
                                                usePointStyle: true,
                                                padding: 16,
                                            },
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <p className="text-center text-sm text-gray-500">
                                No category data available yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#10121e] p-5">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            Analytics Overview
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            All figures are calculated from your contact message database.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
