# StoneOven

StoneOven is a responsive, multi-outlet QR and web interaction system built to deliver a premium dining experience. It features an intuitive, buttery-smooth customer-facing interface and a robust internal CMS for managing operations across different geographic locations (e.g., Boisar, Palghar, Vasai, Virar).

## Structure
The project is decoupled into two primary domains inside a monorepo setup:

### Frontend (`/client`)
A Node monorepo (managed by NPM Workspaces) containing two distinct Next.js 16 applications:
- **`main`**: The primary customer-facing application offering dynamic geographic variants, highly configured Framer Motion animations, complex forms, and Tailwind CSS styling.
- **`cms`**: The internal portal for managing dynamic layouts, tracking visits, and overseeing operations via Recharts visualizations.
- **Tech Stack**: React 19, TypeScript, Tailwind CSS, Framer Motion, react-hook-form, Zod.

### Backend (`/server`)
A monolithic Spring Boot 3 web service managing core business execution and reliable persistent state.
- **Tech Stack**: Java 17, Spring Boot 3.5.x, PostgreSQL, Redis, Spring Security (JWT), Twilio SDK (WhatsApp integration), Lombok, MapStruct.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Java 17
- PostgreSQL 
- Redis

### Running the Frontend
Navigate to the `client/` directory, install all dependencies across the workspaces, and boot up both environments concurrently:
```bash
cd client
npm run install:all
npm run dev
```
- **Main App**: Accessible on <http://localhost:3000>
- **CMS App**: Accessible on <http://localhost:3001>

### Running the Backend
From the base `server/` directory run the standard Spring build task:
```bash
cd server
./mvnw spring-boot:run
```
*(Ensure your PostgreSQL and Redis services are active beforehand)*

## Testing & Automation
- Full End-to-End browser validation is governed proactively strictly through **Playwright**.
- Deep functional logic checks can be executed contextually utilizing boundaries managed natively inside **Vitest**.
- Backend unit boundaries execute through **Spring-Test**.

## System Architecture Reference
For in-depth explanations on technical structures, coding conventions, or integration configurations, please check the local architectural mappings mapped under `.planning/codebase/`.
