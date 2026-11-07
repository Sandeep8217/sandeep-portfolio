
INSERT INTO projects (
    id, title, subtitle, description, technologies,
    github_url, demo_url, featured, display_order, is_published
) VALUES
(
    'financial-habit-builder',
    'Financial Habit Builder',
    'Personal Finance & Wealth Tracking',
    'A full-stack platform for tracking expenses, managing savings goals, building financial habits and monitoring personal net worth.',
    '["Java","Spring Boot","React","PostgreSQL"]',
    'https://github.com/Sandeep8217/financial-habit-builder',
    'https://wealthwise-frontend-ept5.onrender.com/',
    1, 1, 1
),
(
    'rewear',
    'ReWear',
    'Clothing Exchange Marketplace',
    'A clothing exchange platform that enables users to list items, discover clothing and exchange one item for another.',
    '["Spring Boot","React","MongoDB","JWT"]',
    'https://github.com/Sandeep8217/Clothing-Exchange-Api',
    'https://rewear-frontend-we7t.onrender.com/',
    0, 2, 1
),
(
    'ecommerce-microservices',
    'E-commerce Microservices',
    'Distributed Backend Architecture',
    'A modular e-commerce backend built around independent services and REST-based communication.',
    '["Java","Spring Boot","Microservices"]',
    'https://github.com/Sandeep8217/Ecom-Application-MicroServices',
    NULL,
    0, 3, 1
),
(
    'banking-management-api',
    'Banking Management API',
    'Backend Banking Application',
    'A backend application implementing banking operations and REST APIs using Spring Boot.',
    '["Java","Spring Boot","Docker"]',
    'https://github.com/Sandeep8217/banking-management-api',
    NULL,
    0, 4, 1
),
(
    'hospital-management-system',
    'Hospital Management System',
    'Healthcare Application',
    'A role-based healthcare application for administrators, doctors and patients with appointment management.',
    '["MongoDB","Express","React","Node.js"]',
    'https://github.com/Sandeep8217/Hospital-Management-Systems',
    'https://hospital-management-systems-1-hxez.onrender.com',
    0, 5, 1
),
(
    'ai-document-assistant',
    'AI Document Assistant',
    'AI-powered Document Application',
    'An AI-powered application for interacting with and understanding documents.',
    '["React","Node.js","LangChain"]',
    'https://github.com/Sandeep8217/AI-Document-Assistant',
    NULL,
    0, 6, 1
);
