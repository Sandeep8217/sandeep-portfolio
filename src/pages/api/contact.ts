
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const body = await request.json();

        const name = typeof body.name === "string" ? body.name.trim() : "";
        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        const company = typeof body.company === "string" ? body.company.trim() : "";
        const category = typeof body.category === "string" ? body.category.trim() : "";
        const message = typeof body.message === "string" ? body.message.trim() : "";

        // Validate required fields
        if (!name || !email || !category || !message) {
            return new Response(
                JSON.stringify({ success: false, message: "Please fill in all required fields." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Validate field lengths
        if (
            name.length > 100 ||
            email.length > 254 ||
            company.length > 150 ||
            category.length > 100 ||
            message.length > 5000
        ) {
            return new Response(
                JSON.stringify({ success: false, message: "One or more fields exceed the allowed length." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return new Response(
                JSON.stringify({ success: false, message: "Please enter a valid email address." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Access Cloudflare D1
        const db = (locals as any).runtime.env.DB;

        if (!db) {
            throw new Error("D1 database binding is unavailable.");
        }

        const id = crypto.randomUUID();

        await db.prepare(
            `INSERT INTO contact_messages
            (id, name, email, company, category, message)
            VALUES (?, ?, ?, ?, ?, ?)`
        )
            .bind(id, name, email, company || null, category, message)
            .run();

        return new Response(
            JSON.stringify({
                success: true,
                message: "Your message has been sent successfully."
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" }
            }
        );

    } catch (error) {
        console.error("Contact API error:", error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "Unable to send your message right now. Please try again later."
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};
