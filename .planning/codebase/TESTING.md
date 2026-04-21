# Testing

## Execution Environments
- **Vitest**: Installed but might require manual pipeline execution to validate data shaping logic and basic util unit structures inside the `main` or shared scope. Highly relevant for isolated component behavior checks.
- **Playwright**: Utilized via `@playwright/test` for E2E browser automation specifically tailored to ensure vital dynamic interactions—such as the Testimonial slide logic, path-aware outlet routing traversing, and sticky sidebar positioning—function robustly across screen sizes.
- **Spring Boot Tester**: The backend natively integrates standard Controller assertions by leveraging `spring-boot-starter-test` and authentication scope checking handled cleanly by `spring-security-test` integrations.

## Quality Assurance & E2E Validation
- Validation places a high emphasis on *interaction fidelity*. It is critical in this application that the UI behaviors, complex Framer motion orchestrations, and visual boundaries handle dynamically rendered content natively, mimicking high-end user expectations consistently. Tests typically map to features rather than isolated files.
