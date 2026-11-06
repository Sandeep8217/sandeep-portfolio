
import {
    BookOpen,
    Code2,
    Database,
    Cloud,
    ArrowUpRight,
} from "lucide-react";

const courses = [
    {
        title: "Java Spring Boot Microservices",
        provider: "Udemy · EmbarkX",
        category: "Backend Development",
        icon: Code2,
        description:
            "Learning microservices architecture and building backend applications using Java and Spring Boot.",
    },
    {
        title: "Snowflake Masterclass",
        provider: "Udemy",
        category: "Data Engineering",
        icon: Database,
        description:
            "Exploring Snowflake concepts, data warehousing and modern data platform fundamentals.",
    },
    {
        title: "AWS Cloud Fundamentals",
        provider: "Udemy",
        category: "Cloud Computing",
        icon: Cloud,
        description:
            "Understanding cloud computing concepts and core AWS services.",
    },
    {
        title: "Data Structures & Algorithms in Java",
        provider: "Udemy",
        category: "Problem Solving",
        icon: BookOpen,
        description:
            "Strengthening algorithmic thinking and problem-solving skills using Java.",
    },
];

export default function Courses() {
    return (
        <section id="courses" className="section-padding relative">
            <div className="container-custom">
                <div className="mb-14 max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                        Continuous learning
                    </p>

                    <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                        Always learning,
                        <span className="gradient-text"> always growing.</span>
                    </h2>

                    <p className="mt-6 leading-8 text-gray-400">
                        Courses and structured learning that support my growth
                        across backend engineering, data platforms, cloud
                        technologies and problem solving.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    {courses.map((course, index) => {
                        const Icon = course.icon;

                        return (
                            <article
                                key={course.title}
                                className="glass-panel group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 sm:p-7"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-colors group-hover:bg-violet-500/20">
                                        <Icon size={23} />
                                    </div>

                                    <span className="font-mono text-xs text-gray-600">
                    LEARNING_{String(index + 1).padStart(2, "0")}
                  </span>
                                </div>

                                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-violet-300">
                                    {course.category}
                                </p>

                                <h3 className="mt-2 font-heading text-xl font-bold text-white">
                                    {course.title}
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    {course.provider}
                                </p>

                                <p className="mt-5 text-sm leading-7 text-gray-400">
                                    {course.description}
                                </p>

                                <div className="mt-6 border-t border-white/10 pt-5">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    Professional development
                  </span>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
