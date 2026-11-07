
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

// Mark a message as READ or NEW
export const PATCH: APIRoute = async ({ request, params }) => {
    try {
        const id = params.id;

        if (!id) {
            return Response.json(
                { success: false, message: "Message ID is required." },
                { status: 400 }
            );
        }

        const rawBody: unknown = await request.json();

        if (
            typeof rawBody !== "object" ||
            rawBody === null ||
            Array.isArray(rawBody) ||
            !("status" in rawBody) ||
            (rawBody.status !== "READ" && rawBody.status !== "NEW")
        ) {
            return Response.json(
                { success: false, message: "Invalid message status." },
                { status: 400 }
            );
        }

        const db = env.DB;

        const result = await db.prepare(
            `UPDATE contact_messages
             SET status = ?
             WHERE id = ?`
        )
            .bind(rawBody.status, id)
            .run();

        if (result.meta.changes === 0) {
            return Response.json(
                { success: false, message: "Message not found." },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Message status updated successfully."
        });

    } catch (error) {
        console.error("Admin message update error:", error);

        return Response.json(
            { success: false, message: "Unable to update message." },
            { status: 500 }
        );
    }
};

// Delete a message
export const DELETE: APIRoute = async ({ params }) => {
    try {
        const id = params.id;

        if (!id) {
            return Response.json(
                { success: false, message: "Message ID is required." },
                { status: 400 }
            );
        }

        const db = env.DB;

        const result = await db.prepare(
            "DELETE FROM contact_messages WHERE id = ?"
        )
            .bind(id)
            .run();

        if (result.meta.changes === 0) {
            return Response.json(
                { success: false, message: "Message not found." },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Message deleted successfully."
        });

    } catch (error) {
        console.error("Admin message deletion error:", error);

        return Response.json(
            { success: false, message: "Unable to delete message." },
            { status: 500 }
        );
    }
};
