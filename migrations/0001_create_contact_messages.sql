
CREATE TABLE IF NOT EXISTS contact_messages (
                                                id TEXT PRIMARY KEY,
                                                name TEXT NOT NULL,
                                                email TEXT NOT NULL,
                                                company TEXT,
                                                category TEXT NOT NULL,
                                                message TEXT NOT NULL,
                                                status TEXT NOT NULL DEFAULT 'NEW',
                                                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
    ON contact_messages(created_at);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status
    ON contact_messages(status);


CREATE TABLE IF NOT EXISTS contact_messages (
                                                id TEXT PRIMARY KEY,
                                                name TEXT NOT NULL,
                                                email TEXT NOT NULL,
                                                company TEXT,
                                                category TEXT NOT NULL,
                                                message TEXT NOT NULL,
                                                status TEXT NOT NULL DEFAULT 'NEW',
                                                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
    ON contact_messages(created_at);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status
    ON contact_messages(status);
