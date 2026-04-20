# Testing

## Frameworks
- **Vitest**: Installed and configured for executing fast, specific unit tests and testing specific utility behavior (configuration recently set up during testing phases).
- **Playwright**: Utilized for E2E browser automation to ensure vital dynamic interactions—such as the Testimonial slide logic, path-aware outlet routing (navigating accurately dynamically from the outlet wrapper down to the subcomponents), and sticky sidebar positioning—function robustly across screen sizes.

## Structure
- Tests typically map to features rather than isolated single-component files, particularly validating critical "Phase" behaviors ensuring routing navigation is safe.

## Quality Assurance & E2E Validation
- Validation places a high emphasis on *interaction fidelity*. It is critical in this application that the UI behaviors, complex Framer motion orchestrations, and visual boundaries handle dynamically rendered content natively, mimicking high-end user expectations consistently.
