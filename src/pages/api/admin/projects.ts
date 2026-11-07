
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

// Retrieve all projects, including unpublished projects.
export const GET: APIRoute = async () => {
    try {
        const result = await env.DB.prepare(`
            SELECT *
            FROM projects
            ORDER BY display_order ASC
        `).all();

        const projects = result.results.map((project) => ({
            ...project,
            technologies: JSON.parse(
                String(project.technologies ?? "[]")
            ),
            featured: Number(project.featured) === 1,
            is_published: Number(project.is_published) === 1,
        }));

        return Response.json({
            success: true,
            projects,
        }, {
            headers: { "Cache-Control": "no-store" },
        });

    } catch (error) {
        console.error("Admin projects GET error:", error);

        return Response.json({
            success: false,
            message: "Unable to retrieve projects.",
        }, { status: 500 });
    }
};

// Add a new project.
export const POST: APIRoute = async ({ request }) => {
    try {
        const rawBody: unknown = await request.json();

        if (
            typeof rawBody !== "object" ||
            rawBody === null ||
            Array.isArray(rawBody)
        ) {
            return Response.json({
                success: false,
                message: "Invalid request data.",
            }, { status: 400 });
        }

        const body = rawBody as Record<string, unknown>;

        const title = typeof body.title === "string" ? body.title.trim() : "";
        const subtitle = typeof body.subtitle === "string" ? body.subtitle.trim() : "";
        const description = typeof body.description === "string" ? body.description.trim() : "";
        const githubUrl = typeof body.github_url === "string" ? body.github_url.trim() : "";

        if (!title || !subtitle || !description || !githubUrl) {
            return Response.json({
                success: false,
                message: "Title, subtitle, description and GitHub URL are required.",
            }, { status: 400 });
        }

        if (
            !Array.isArray(body.technologies) ||
            !body.technologies.every(
                (item) => typeof item === "string" && item.trim().length > 0
            )
        ) {
            return Response.json({
                success: false,
                message: "Technologies must be an array of non-empty strings.",
            }, { status: 400 });
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
            return Response.json({
                success: false,
                message: "Please provide a valid GitHub URL.",
            }, { status: 400 });
        }

        const demoUrl = typeof body.demo_url === "string" ? body.demo_url.trim() : "";
        const imageUrl = typeof body.image_url === "string" ? body.image_url.trim() : "";

        if (demoUrl && !validUrl(demoUrl)) {
            return Response.json({
                success: false,
                message: "Please provide a valid demo URL.",
            }, { status: 400 });
        }

        if (imageUrl && !validUrl(imageUrl)) {
            return Response.json({
                success: false,
                message: "Please provide a valid image URL.",
            }, { status: 400 });
        }

        const orderResult = await env.DB.prepare(`
            SELECT COALESCE(MAX(display_order), 0) AS maxOrder
            FROM projects
        `).first<{ maxOrder: number }>();

        const id = crypto.randomUUID();

        await env.DB.prepare(`
            INSERT INTO projects (
                id, title, subtitle, description, technologies,
                github_url, demo_url, image_url, featured,
                display_order, is_published
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            id,
            title,
            subtitle,
            description,
            JSON.stringify(body.technologies.map((item) => (item as string).trim())),
            githubUrl,
            demoUrl || null,
            imageUrl || null,
            body.featured === true ? 1 : 0,
            (orderResult?.maxOrder ?? 0) + 1,
            body.is_published === false ? 0 : 1
        ).run();

        return Response.json({
            success: true,
            message: "Project created successfully.",
            id,
        }, { status: 201 });

    } catch (error) {
        console.error("Admin projects POST error:", error);

        return Response.json({
            success: false,
            message: "Unable to create project.",
        }, { status: 500 });
    }
};
