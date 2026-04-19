# Directory Structure

## Repository Layout
``` text
/
├── client/           # Customer-facing Next.js application
├── cms/              # Admin-facing Next.js application
└── server/           # Java Spring Boot backend
```

## Client Subdirectories (`/client`)
- `src/app/` - Next.js App Router entry points, pages, and layout structure.
- `src/components/` - Reusable UI elements (React components). Includes `ui` (Avatar, Button, Select, etc) and `layout/Footer`.
- `src/hooks/` - Custom React hooks for shared logic.
- `src/lib/` - Utility functions, configurations, and API clients.
- `src/styles/` - Global CSS/Tailwind definitions.
- `src/types/` - TypeScript typings and interfaces.

## CMS Subdirectories (`/cms`)
- Follows the exact same Next.js App Router structure as `/client`.
- `src/app/`, `src/components/`, `src/hooks/`, `src/lib/`, `src/styles/`, `src/types/`.

## Server Subdirectories (`/server`)
- `src/main/java/` - Core Java source code files.
- `src/main/resources/` - Properties files, config logic, Thymeleaf templates.
- `src/test/` - Contains unit and integration tests for backend endpoints and services.

## Key Configuration Files
- `client/package.json` & `client/tailwind.config.ts`: Client dependencies and styling config.
- `cms/package.json` & `cms/tailwind.config.ts`: CMS dependencies and styling config.
- `server/pom.xml`: Backend maven dependencies and build plugins.
