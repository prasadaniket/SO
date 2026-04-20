# Conventions

## Code Style & Patterns
- **Functional Components**: Everything relies on React functional components with heavily embedded Tailwind utility classes.
- **Client-Side Targeting**: Use of `"use client"` heavily in components heavily leveraging `framer-motion` APIs.
- **Tailwind Precision**: The design system relies heavily on specific, complex Tailwind classes (e.g., inline box-shadow rgba logic, precise hex codes `bg-[#EEEEEE]`, nested gradients).
- **Aesthetics & Minimalism**: Unnecessary sub-texts, complex multi-line grid structures inside buttons, and excessive visual noise are actively factored out in favor of sleek, mathematically centered "pill" buttons (e.g., `h-[60px] rounded-full`).

## Motion Standards
- Entry sequences often operate with staggered `delay` props and Spring smoothing.
- Interactive elements typically respond to `whileHover={{ y: -3, scale: 1.02 }}` and `whileTap={{ scale: 0.96 }}` to give tactile feedback.

## Formatting
- Explicit pixel values are frequently passed to Tailwind (`text-[15px]`, `h-[60px]`) for design fidelity rather than abstract rem-based sizing.

## Error Handling
- Minimal visible error boundary setup at the page routing level. Data flows are generally static or assume safe default shapes. Form submissions (Feedback/Review) will require graceful degradation strategies.
