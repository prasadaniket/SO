# Conventions

## Frontend Patterns (Next 16 / React 19)
- **Functional Driven**: Exclusively relies on functional composition using heavy Tailwind utility classes internally in TSX structures.
- **Client Processing Limits**: Specific interactive sections are clearly bounded with `"use client"` avoiding over-processing components Server Side that require motion logic.
- **Tailwind Precision**: Elements are styled using complex, precise, heavily iterated exact specific values (e.g. `bg-[#EEEEEE]`, nested radial gradients, hard-pixel bounds like `h-[60px] rounded-full`) instead of relying solely on default generic rem system scales to enforce premium fidelity layouts.
- **Consistent Typographic Motion**: Focus on streamlined "pill" buttons, minimal redundant text, and high tactile interaction boundaries leveraging `framer-motion` properties like `whileHover` and `whileTap`.

## Backend Patterns (Spring Boot 3)
- Controllers directly proxy specific external Service abstractions rather than maintaining native logic implementations.
- Relies heavily on MapStruct auto-mapping interfaces to ensure database Entity schemas are never exposed accidentally down wire bounds to the frontend JSON structure.
- Adopts Lombok exclusively for object mutability generation (`@Data`, `@Builder`) eliminating standard boilerplate noise.

## Error Recovery
Static UI structures tend to assume safe configuration shapes. Backend paths leverage standard Spring structured HTTP mapping validations (`@Valid`) natively rejecting bad shapes gracefully.
