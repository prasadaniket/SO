# Coding Conventions

## Language & Framework
- **Frontend**: Both `client` and `cms` use TypeScript with Next.js App Router conventions.
- **Backend**: `server` uses Java 17 with Spring Boot and Maven.

## Code Style & Organization
### Spring Boot (Backend)
- Uses **Lombok** to reduce boilerplate code (e.g., getters, setters, constructors).
- Uses **MapStruct** for automatic object mapping between Entity models and DTOs.
- Typical package breakdown implies `controllers`, `services`, `repositories`, `models`/`entities`, `dtos`, `security`.

### React/Next.js (Frontends)
- Uses **Tailwind CSS** combined with `clsx` and `tailwind-merge` for dynamic and declarative component styling.
- **Zod** is used alongside `react-hook-form` to define schema-based validations and manage form states declaratively.
- Uses **ESLint** for static code analysis.

## Naming Conventions
- React components: `PascalCase.tsx`.
- Java Classes: `PascalCase.java`.
- Type/Interface definitions in TypeScript: `PascalCase.ts`.
- Hooks: `camelCase` starting with `use`.
