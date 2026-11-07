
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const GET: APIRoute = async () => {
    try {
        const db = env.DB;

        const [total, unread, read, recent] = await Promise.all([
            db.prepare(
                "SELECT COUNT(*) AS count FROM contact_messages"
            ).first<{ count: number }>(),

            db.prepare(
                "SELECT COUNT(*) AS count FROM contact_messages WHERE status = 'NEW'"
            ).first<{ count: number }>(),

            db.prepare(
                "SELECT COUNT(*) AS count FROM contact_messages WHERE status = 'READ'"
            ).first<{ count: number }>(),

            db.prepare(
                `SELECT id, name, email, company, category, message, status, created_at
                 FROM contact_messages
                 ORDER BY created_at DESC
                 LIMIT 10`
            ).all(),
        ]);

        return Response.json(
            {
                success: true,
                stats: {
                    totalMessages: total?.count ?? 0,
                    unreadMessages: unread?.count ?? 0,
                    readMessages: read?.count ?? 0,
                },
                messages: recent.results,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store",
                },
            }
        );

    } catch (error) {
        console.error("Admin messages API error:", error);

        return Response.json(
            {
                success: false,
                message: "Unable to retrieve contact messages.",
            },
            { status: 500 }
        );
    }
};
