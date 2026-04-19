# Known Concerns & Areas for Improvement

## Architecture Constraints
- Two separate Next.js web applications (`client` and `cms`) increase maintenance overhead for shared types and components. Consider a monorepo setup (like Turborepo) if duplicate code becomes problematic.

## Security
- Make sure to scrutinize Next.js `.env` references to prevent exposing backend keys or database secrets explicitly directly to the client bundle.
- Validating external dependencies regularly (Node.js and Maven packaging).

## Test Coverage
- Client and CMS lack testing framework dependencies. Adding an automated test layer (Vitest/Playwright) is highly recommended as the application grows, to ensure changes to shared libraries or generic components do not introduce regressions.

## Technical Debt
- Ensure MapStruct and Lombok processors compile efficiently together during Maven build steps without conflicting, as setup for these generally needs consistent version alignment.
