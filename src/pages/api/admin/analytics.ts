import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const GET: APIRoute = async () => {
    try {
        const db = env.DB;

        const [
            totalMessages,
            unreadMessages,
            readMessages,
            monthlyMessages,
            categoryBreakdown,
        ] = await Promise.all([
            db.prepare(`
                SELECT COUNT(*) AS count
                FROM contact_messages
            `).first<{ count: number }>(),

            db.prepare(`
                SELECT COUNT(*) AS count
                FROM contact_messages
                WHERE status = 'NEW'
            `).first<{ count: number }>(),

            db.prepare(`
                SELECT COUNT(*) AS count
                FROM contact_messages
                WHERE status = 'READ'
            `).first<{ count: number }>(),

            db.prepare(`
                SELECT
                    strftime('%Y-%m', created_at) AS month,
                    COUNT(*) AS count
                FROM contact_messages
                WHERE created_at >= date('now', '-5 months', 'start of month')
                GROUP BY strftime('%Y-%m', created_at)
                ORDER BY month ASC
            `).all(),

            db.prepare(`
                SELECT
                    category,
                    COUNT(*) AS count
                FROM contact_messages
                GROUP BY category
                ORDER BY count DESC
            `).all(),
        ]);

        return Response.json({
            success: true,
            stats: {
                totalMessages: totalMessages?.count ?? 0,
                unreadMessages: unreadMessages?.count ?? 0,
                readMessages: readMessages?.count ?? 0,
            },
            monthlyMessages: monthlyMessages.results,
            categoryBreakdown: categoryBreakdown.results,
        }, {
            status: 200,
            headers: {
                "Cache-Control": "no-store",
            },
        });

    } catch (error) {
        console.error("Admin analytics API error:", error);

        return Response.json({
            success: false,
            message: "Unable to retrieve analytics.",
        }, { status: 500 });
    }
};