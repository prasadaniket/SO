# Tech Stack

## Overview
StoneOven is a multi-repo project with a Java Spring Boot backend and two Next.js frontend applications (Client and CMS). 

## Front-ends (`client` and `cms`)

### Core
- **Framework**: `Next.js 16.2.4`
- **UI Library**: `React 19`
- **Language**: `TypeScript`

### Styling & UI
- **CSS Framework**: `Tailwind CSS 3.4.4`
- **Animation**: `Framer Motion` (client)
- **Icons**: `Lucide React` (cms), Raw SVGs (client footer)
- **Component Libraries**: `@radix-ui/react-avatar` (cms/client)

### UI Patterns
- **Linktree Aesthetic**: The `client` app employs a "Linktree" or "Link-in-bio" mobile-first aesthetic with immersive gradients (`#E88C3A` to `#1E2024`), rounded pills, semi-transparent overlays, and centered layouts.

### State Management & Data Fetching
- **HTTP Client**: `axios`
- **Form Handling**: `react-hook-form`
- **Validation**: `zod`, `@hookform/resolvers`

### Utilities
- **Date Formatting**: `date-fns`
- **Class Merging**: `clsx`, `tailwind-merge`, `class-variance-authority`
- **Fingerprinting**: `@fingerprintjs/fingerprintjs` (client)

## Back-end (`server`)

### Core
- **Runtime**: `Java 17`
- **Framework**: `Spring Boot 3.5.13`
- **Build Tool**: `Maven`

### Data & Persistence
- **Database**: `PostgreSQL`
- **ORM**: `Spring Data JPA`
- **Caching**: `Spring Data Redis`

### Security
- **Authentication**: `Spring Security`
- **Tokens**: `JJWT 0.13.0` (JSON Web Tokens)

### Utilities
- **Boilerplate Reduction**: `Lombok 1.18.44`
- **Object Mapping**: `MapStruct 1.6.3`
- **Templating**: `Thymeleaf`
- **Misc**: `commons-csv`
