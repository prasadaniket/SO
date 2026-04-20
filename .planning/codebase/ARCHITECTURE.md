# Architecture

## Core Pattern
StoneOven follows a **Component-Based Architecture** orchestrated through the Next.js **App Router** (`client/src/app`). It distinguishes firmly between global layouts and dynamic, slug-based routing.

## Global Routing
- `client/src/app` drives the application routing.
- Specific dynamic branches like `app/outlet/[code]/page.tsx` serve as high-level Controller components. These components fetch or determine configuration state (e.g., matching the `[code]` parameter to a specific location like `boisar` or `vasai`).

## Component Modularity
- **Outlet Components**: Each outlet has a self-governing component (e.g., `components/boisar/boisar.tsx`) that houses visually customized (but structurally similar) layouts for local marketing.
- **UI Components**: Global navigation (`Navbar`), footprint elements (`GlobalFooter.tsx`), and specific form handlers (`review.tsx`) are isolated and instantiated globally. 
- **Decoupled Features**: Review logic, social linking, and feedback have recently been specifically decoupled out of the raw outlet page files and into independent routes (`/outlet/[code]/feedback`, `/outlet/[code]/review`).

## State & Data Flow
- Standard React unidirectional data flow. Information like device context or outlet-specific strings (`code`, `name`) are passed down as `props` or extrapolated from URL params in the layout structure.
- Animations trigger strictly on client-side state (`whileHover`, `whileTap`) via Framer Motion without blocking the main event loops.
