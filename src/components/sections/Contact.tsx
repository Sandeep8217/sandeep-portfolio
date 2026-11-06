
import { useState } from "react";
import {
    Mail,
    MapPin,
    Send,
    CheckCircle2,
    ArrowUpRight,
    ExternalLink,
} from "lucide-react";

const INITIAL_FORM = {
    name: "",
    email: "",
    company: "",
    category: "Recruitment / Job Opportunity",
    message: "",
};

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [form, setForm] = useState(INITIAL_FORM);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (submitError) {
            setSubmitError("");
        }
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    company: form.company.trim(),
                    category: form.category,
                    message: form.message.trim(),
                }),
            });

            const result = await response.json().catch(() => null);

            if (!response.ok || !result?.success) {
                throw new Error(
                    result?.message ||
                    "Unable to send your message. Please try again."
                );
            }

            setForm(INITIAL_FORM);
            setSubmitted(true);

        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section-padding relative">
            <div className="container-custom">

                {/* Section heading */}
                <div className="mb-14 max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                        Get in touch
                    </p>

                    <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                        Let's build something
                        <span className="gradient-text"> meaningful.</span>
                    </h2>

                    <p className="mt-6 leading-8 text-gray-400">
                        Have an opportunity, collaboration idea or interesting
                        project? I'd be happy to hear from you.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

                    {/* Contact information */}
                    <div className="space-y-5">
                        <div className="glass-panel rounded-3xl p-7">
                            <h3 className="font-heading text-xl font-bold text-white">
                                Contact information
                            </h3>

                            <div className="mt-7 space-y-6">
                                <a
                                    href="mailto:sandeepkarne126@gmail.com"
                                    className="group flex items-center gap-4"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                                        <Mail size={21} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Email
                                        </p>
                                        <p className="mt-1 break-all text-sm text-gray-200 transition-colors group-hover:text-violet-300">
                                            sandeepkarne126@gmail.com
                                        </p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                                        <MapPin size={21} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Location
                                        </p>
                                        <p className="mt-1 text-sm text-gray-200">
                                            Bengaluru, Karnataka, India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-white/10 pt-6">
                                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Find me online
                                </p>

                                <div className="flex gap-3">
                                    <a
                                        href="https://github.com/Sandeep8217"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub profile"
                                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition-all hover:border-violet-400/30 hover:text-violet-300"
                                    >
                                        <ExternalLink size={20} />
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/in/sandeepkarne/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn profile"
                                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition-all hover:border-violet-400/30 hover:text-violet-300"
                                    >
                                        <ArrowUpRight size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-emerald-400/15 bg-emerald-400/[0.04] p-6">
                            <div className="flex items-center gap-3">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

                                <p className="font-semibold text-emerald-300">
                                    Open to opportunities
                                </p>
                            </div>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                Interested in software engineering opportunities,
                                backend development and meaningful technical
                                collaborations.
                            </p>
                        </div>
                    </div>

                    {/* Contact form */}
                    <div className="glass-panel rounded-3xl p-6 sm:p-8">

                        {submitted ? (
                            <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                                <CheckCircle2
                                    size={54}
                                    className="text-emerald-400"
                                />

                                <h3 className="mt-6 font-heading text-2xl font-bold text-white">
                                    Thank you for reaching out!
                                </h3>

                                <p className="mt-3 max-w-sm text-sm leading-7 text-gray-400">
                                    Your message has been received successfully.
                                    I'll get back to you soon.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-7 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-violet-400/30"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="font-heading text-xl font-bold text-white">
                                    Send me a message
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Fill in the details below.
                                </p>

                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-7 space-y-5"
                                >
                                    <div className="grid gap-5 sm:grid-cols-2">

                                        <div>
                                            <label
                                                htmlFor="contact-name"
                                                className="mb-2 block text-sm text-gray-300"
                                            >
                                                Your name *
                                            </label>

                                            <input
                                                id="contact-name"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                maxLength={100}
                                                autoComplete="name"
                                                placeholder="John Doe"
                                                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-violet-400/50"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="contact-email"
                                                className="mb-2 block text-sm text-gray-300"
                                            >
                                                Email address *
                                            </label>

                                            <input
                                                id="contact-email"
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                maxLength={254}
                                                autoComplete="email"
                                                placeholder="john@example.com"
                                                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-violet-400/50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-company"
                                            className="mb-2 block text-sm text-gray-300"
                                        >
                                            Company (optional)
                                        </label>

                                        <input
                                            id="contact-company"
                                            name="company"
                                            value={form.company}
                                            onChange={handleChange}
                                            maxLength={150}
                                            autoComplete="organization"
                                            placeholder="Company name"
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-violet-400/50"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-category"
                                            className="mb-2 block text-sm text-gray-300"
                                        >
                                            Enquiry category *
                                        </label>

                                        <select
                                            id="contact-category"
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-[#111421] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/50"
                                        >
                                            <option>Recruitment / Job Opportunity</option>
                                            <option>Professional Collaboration</option>
                                            <option>Freelance / Project Opportunity</option>
                                            <option>General Enquiry</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-message"
                                            className="mb-2 block text-sm text-gray-300"
                                        >
                                            Your message *
                                        </label>

                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            maxLength={5000}
                                            rows={5}
                                            placeholder="Tell me about your opportunity or idea..."
                                            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-violet-400/50"
                                        />

                                        <p className="mt-2 text-right text-xs text-gray-500">
                                            {form.message.length}/5000
                                        </p>
                                    </div>

                                    {submitError && (
                                        <p
                                            role="alert"
                                            className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                                        >
                                            {submitError}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <Send size={17} />

                                        {isSubmitting
                                            ? "Sending..."
                                            : "Send Message"
                                        }

                                        {!isSubmitting && (
                                            <ArrowUpRight size={16} />
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
