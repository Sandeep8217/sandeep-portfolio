
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body: Record<string, unknown> = await request.json();

        const name = typeof body.name === "string" ? body.name.trim() : "";
        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        const company = typeof body.company === "string" ? body.company.trim() : "";
        const category = typeof body.category === "string" ? body.category.trim() : "";
        const message = typeof body.message === "string" ? body.message.trim() : "";

        if (!name || !email || !category || !message) {
            return Response.json(
                { success: false, message: "Please fill in all required fields." },
                { status: 400 }
            );
        }

        if (
            name.length > 100 ||
            email.length > 254 ||
            company.length > 150 ||
            category.length > 100 ||
            message.length > 5000
        ) {
            return Response.json(
                { success: false, message: "One or more fields exceed the allowed length." },
                { status: 400 }
            );
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return Response.json(
                { success: false, message: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        // Astro 6: Access Cloudflare bindings directly.
        const db = env.DB;

        const id = crypto.randomUUID();

        await db.prepare(
            `INSERT INTO contact_messages
            (id, name, email, company, category, message)
            VALUES (?, ?, ?, ?, ?, ?)`
        )
            .bind(id, name, email, company || null, category, message)
            .run();

        return Response.json(
            {
                success: true,
                message: "Your message has been sent successfully."
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Contact API error:", error);

        return Response.json(
            {
                success: false,
                message: "Unable to send your message right now. Please try again later."
            },
            { status: 500 }
        );
    }
};
