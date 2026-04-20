# Structure

## Directory Layout
The primary frontend application lives in `h:\UniCord\StoneOven\client\`.

```text
client/
├── src/
│   ├── app/                    # Next.js App Router root
│   │   ├── outlet/
│   │   │   └── [code]/         # Dynamic route for specific outlet locations
│   │   │       ├── menu/       # Nested menu page
│   │   │       ├── feedback/   # 1st Visit feedback page
│   │   │       ├── review/     # Review submission page
│   │   │       └── page.tsx    # Outlet Landing Page
│   │   ├── globals.css         # Global tailwind imports
│   │   └── layout.tsx          # Root container and meta layout
│   ├── components/             # Reusable UI Blocks
│   │   ├── home/               # Homepage unique modules
│   │   ├── boisar/             # Boisar outlet logic
│   │   ├── palghar/            # Palghar outlet logic
│   │   ├── vasai/              # Vasai outlet logic
│   │   ├── virar/              # Virar outlet logic
│   │   ├── form2/              # Modular form components (like review.tsx)
│   │   ├── social/             # Social media layout components
│   │   └── ui/                 # Global UI atoms (GlobalFooter, Navbar)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Helper libraries and utilities
│   ├── styles/                 # Ancillary stylesheets
│   └── types/                  # Global TypeScript Interfaces
```

## Naming Conventions
- React Components: PascalCase filenames are sometimes used (e.g., `GlobalFooter.tsx`), though some domains strictly use lowercase folder matching (e.g., `boisar/boisar.tsx`, `review.tsx`).
- Next.js Routes: Strict lowercase (`page.tsx`, `layout.tsx`).
