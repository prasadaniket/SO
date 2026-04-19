# Testing Patterns

## Overview
Test coverage and setup vary between the front-end architectures and the backend architecture.

## Spring Boot Backend (`/server`)
- Testing is set up using `spring-boot-starter-test`.
- Uses `spring-security-test` for testing secured endpoints over mocked API calls.
- Unit and Integration tests are maintained in `server/src/test`.

## Next.js Frontends (`/client` & `/cms`)
- Currenly, there are no robust testing frameworks configured out-of-the-box in the `package.json` configurations (No Jest, Vitest, Cypress, or Playwright out of the box).
- `Next lint` is provided as a static check command.
- *Recommendation*: Introduce a testing suite for critical UI integration flows (such as Vitest or Playwright).
