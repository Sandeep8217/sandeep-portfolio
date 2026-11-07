
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const GET: APIRoute = async () => {
    try {
        const db = env.DB;

        const result = await db.prepare(`
            SELECT
                id,
                title,
                subtitle,
                description,
                technologies,
                github_url,
                demo_url,
                image_url,
                featured,
                display_order
            FROM projects
            WHERE is_published = 1
            ORDER BY display_order ASC
        `).all();

        const projects = result.results.map((project) => ({
            ...project,
            technologies: JSON.parse(
                String(project.technologies ?? "[]")
            ),
            featured: Number(project.featured) === 1,
        }));

        return Response.json(
            {
                success: true,
                projects,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store",
                },
            }
        );
    } catch (error) {
        console.error("Projects API error:", error);

        return Response.json(
            {
                success: false,
                message: "Unable to retrieve projects.",
            },
            { status: 500 }
        );
    }
};
