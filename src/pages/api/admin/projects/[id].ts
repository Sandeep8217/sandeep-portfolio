
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

// Update an existing project.
export const PATCH: APIRoute = async ({ params, request }) => {
    try {
        const id = params.id;

        if (!id) {
            return Response.json(
                { success: false, message: "Project ID is required." },
                { status: 400 }
            );
        }

        const rawBody: unknown = await request.json();

        if (
            typeof rawBody !== "object" ||
            rawBody === null ||
            Array.isArray(rawBody)
        ) {
            return Response.json(
                { success: false, message: "Invalid request data." },
                { status: 400 }
            );
        }

        const body = rawBody as Record<string, unknown>;

        const title = typeof body.title === "string" ? body.title.trim() : "";
        const subtitle = typeof body.subtitle === "string" ? body.subtitle.trim() : "";
        const description = typeof body.description === "string" ? body.description.trim() : "";
        const githubUrl = typeof body.github_url === "string" ? body.github_url.trim() : "";

        if (!title || !subtitle || !description || !githubUrl) {
            return Response.json(
                {
                    success: false,
                    message: "Title, subtitle, description and GitHub URL are required.",
                },
                { status: 400 }
            );
        }

        if (
            !Array.isArray(body.technologies) ||
            !body.technologies.every(
                (item) => typeof item === "string" && item.trim().length > 0
            )
        ) {
            return Response.json(
                {
                    success: false,
                    message: "Technologies must be an array of non-empty strings.",
                },
                { status: 400 }
            );
        }

        const validUrl = (value: string) => {
            try {
                const url = new URL(value);
                return url.protocol === "https:" || url.protocol === "http:";
            } catch {
                return false;
            }
        };

        if (!validUrl(githubUrl)) {
            return Response.json(
                { success: false, message: "Invalid GitHub URL." },
                { status: 400 }
            );
        }

        const demoUrl = typeof body.demo_url === "string" ? body.demo_url.trim() : "";
        const imageUrl = typeof body.image_url === "string" ? body.image_url.trim() : "";

        if (
            (demoUrl && !validUrl(demoUrl)) ||
            (imageUrl && !validUrl(imageUrl))
        ) {
            return Response.json(
                { success: false, message: "Invalid demo or image URL." },
                { status: 400 }
            );
        }

        if (
            typeof body.featured !== "boolean" ||
            typeof body.is_published !== "boolean" ||
            !Number.isInteger(body.display_order) ||
            Number(body.display_order) < 1
        ) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid featured, published or display order value.",
                },
                { status: 400 }
            );
        }

        const result = await env.DB.prepare(`
            UPDATE projects
            SET
                title = ?,
                subtitle = ?,
                description = ?,
                technologies = ?,
                github_url = ?,
                demo_url = ?,
                image_url = ?,
                featured = ?,
                display_order = ?,
                is_published = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `).bind(
            title,
            subtitle,
            description,
            JSON.stringify(body.technologies.map(
                (item) => (item as string).trim()
            )),
            githubUrl,
            demoUrl || null,
            imageUrl || null,
            body.featured ? 1 : 0,
            body.display_order,
            body.is_published ? 1 : 0,
            id
        ).run();

        if (result.meta.changes === 0) {
            return Response.json(
                { success: false, message: "Project not found." },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Project updated successfully.",
        });

    } catch (error) {
        console.error("Admin project PATCH error:", error);

        return Response.json(
            { success: false, message: "Unable to update project." },
            { status: 500 }
        );
    }
};

// Permanently delete a project.
export const DELETE: APIRoute = async ({ params }) => {
    try {
        const id = params.id;

        if (!id) {
            return Response.json(
                { success: false, message: "Project ID is required." },
                { status: 400 }
            );
        }

        const result = await env.DB.prepare(`
            DELETE FROM projects WHERE id = ?
        `).bind(id).run();

        if (result.meta.changes === 0) {
            return Response.json(
                { success: false, message: "Project not found." },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Project deleted successfully.",
        });

    } catch (error) {
        console.error("Admin project DELETE error:", error);

        return Response.json(
            { success: false, message: "Unable to delete project." },
            { status: 500 }
        );
    }
};
