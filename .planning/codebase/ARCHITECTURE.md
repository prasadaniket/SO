# Architecture

## Decoupled System Architecture
StoneOven isolates heavy backend business logic and caching from its dynamic frontend interaction endpoints.

## Monorepo Layout
The project uses a clear separation:
- `server/`: The authoritative monolithic Java backend controlling core business logic, the database, authentication, and external messaging queues.
- `client/`: Parent directory utilizing npm workspaces to manage frontend apps.
  - `client/main/`: The public-facing Next.js website for StoneOven customers natively generating complex UI pages.
  - `client/cms/`: The internal Next.js application for staff/admin to manage content and inspect operational analytics.
  - `client/shared/`: Shared module utilities.

## Backend (Spring Boot 3.x)
- Constructed strictly using a typical layered Controller (REST Endpoint) -> Service (Business Execution) -> Repository (Data Store) model.
- Strongly typed request/responses handled via MapStruct DTO configurations.
- API endpoints are heavily secured through stateless JWT validation mechanisms handled centrally.

## Frontend (Next.js App Router)
- **Dynamic Controller Layouts**: Branches like `client/main/src/app/outlet/[route]` serve as high-level Controller components querying or determining static geographic configurations.
- **Component Modularity**: Distinguishes firmly between UI presentational layout configurations (e.g., `components/boisar/`) and abstract global components (e.g., global footers, modular form logic isolated independently like feedback and reviews in specific sub-routes).
