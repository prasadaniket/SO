# Structure

## High-Level Layout
The codebase segregates its main functional environments into distinct root folders:
```text
/
├── client/
│   ├── main/             # The public StoneOven Next.js site
│   │   ├── src/          # Source files (app routing, components, hooks)
│   │   ├── package.json  # Next 16, React 19, Framer Motion
│   ├── cms/              # The Internal configuration Management System
│   │   ├── src/          # Source files specifically geared directly towards staff logic
│   │   ├── package.json  # Separate dependency tracking subset
│   ├── shared/           # Cross-app configurations
│   └── package.json      # Monorepo concurrency scripts (`npm run dev`)
├── server/               # The authoritative Spring Boot Application
│   ├── src/              # Java backend controllers, entities, repositories
│   └── pom.xml           # Managed by Maven
```

## Internal Next.js Main Frontend Structure
```text
client/main/src/
├── app/                    # Next.js App Router root
│   ├── outlet/
│   │   └── [code]/         # Dynamic route for specific outlet locations
│   │       ├── menu/
│   │       ├── feedback/
│   │       ├── review/
│   │       └── page.tsx
├── components/             # Reusable UI Blocks (e.g. boisar, ui, home)
├── hooks/                  # Custom React hooks
├── lib/                    # Helper libraries and utilities
├── styles/                 # Ancillary stylesheets
└── types/                  # Global TypeScript Interfaces
```

## Conventions
- **Naming**: React Components are a mix of PascalCase (`GlobalFooter.tsx`) and strict lowercase matching logic paths for domains (`boisar.tsx`). Backend leverages standard Java Class Camel casing. Next.js routes maintain exact structural lowercase `page.tsx`/`layout.tsx` syntax.
