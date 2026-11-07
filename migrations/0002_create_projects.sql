
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT NOT NULL DEFAULT '[]',
    github_url TEXT NOT NULL,
    demo_url TEXT,
    image_url TEXT,
    featured INTEGER NOT NULL DEFAULT 0,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_display_order
ON projects(display_order);

CREATE INDEX IF NOT EXISTS idx_projects_published
ON projects(is_published);
