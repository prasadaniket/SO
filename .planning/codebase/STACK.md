# Tech Stack

## Overview
StoneOven is a full-stack application leveraging a robust architecture that mixes a high-end visual frontend with a scalable relational backend. The application features a monorepo setup for the frontend and a decoupled Java Spring Boot service for the backend.

## Frontend (client/)
- **Architecture**: Monorepo using `npm` workspaces containing `main` (public app) and `cms` (admin portal).
- **Framework**: Next.js 16 (App Router paradigm)
- **UI & Patterns**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion for buttery-smooth dynamic UX and micro-interactions.
- **Form Management**: `react-hook-form`, validated dynamically with `zod`.
- **Icons**: Lucide React.
- **Charts**: `recharts` for CMS visualization data.

## Backend (server/)
- **Framework**: Spring Boot 3.5.13 (Java 17)
- **Database Layer**: PostgreSQL driven by Spring Data JPA
- **Caching & Brokers**: Redis via Spring Boot Starter Data Redis
- **Security**: Spring Security coupled with JWT authentication (`io.jsonwebtoken`)
- **DTO Mapping**: MapStruct for strict, boilerplate-free data transfer object mapping.
- **Utilities**: Lombok for reducing Java boilerplate.

## Package Managers & Tools
- `npm` inside `client/` (Using concurrently for local execution)
- `Maven` for `server/` resolution
