
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let animationFrame = 0;
        let startTime = 0;

        const updateProgress = (timestamp: number) => {
            if (!startTime) startTime = timestamp;

            const elapsed = timestamp - startTime;
            const nextProgress = Math.min(
                95,
                Math.round((elapsed / 1800) * 95)
            );

            setProgress(nextProgress);

            if (nextProgress < 95) {
                animationFrame = requestAnimationFrame(updateProgress);
            }
        };

        animationFrame = requestAnimationFrame(updateProgress);

        const finishLoading = () => {
            setProgress(100);
            setVisible(false);
        };

        if (document.readyState === "complete") {
            finishLoading();
        } else {
            window.addEventListener("load", finishLoading, { once: true });
        }

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("load", finishLoading);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080910]"
                >
                    <div className="relative flex h-36 w-36 items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-violet-400/30 border-t-violet-400"
                        />

                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-3 rounded-full border border-cyan-400/20 border-b-cyan-400"
                        />

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_0_45px_rgba(139,92,246,0.35)]">
              <span className="font-heading text-3xl font-bold text-white">
                SK
              </span>
                        </div>
                    </div>

                    <h1 className="mt-10 font-heading text-xl font-bold tracking-[0.25em] text-white">
                        SANDEEP KARNE
                    </h1>

                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-500">
                        Software Development Engineer
                    </p>

                    <div className="mt-10 w-56">
                        <div className="mb-3 flex justify-between text-[10px] uppercase tracking-widest text-gray-500">
                            <span>Loading experience</span>
                            <span>{progress}%</span>
                        </div>

                        <div className="h-1 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.25 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
