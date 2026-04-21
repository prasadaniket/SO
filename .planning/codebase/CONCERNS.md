# Concerns

## Technical Debt & Synchronization
- **Component Duplicity Overhead**: Extensive hard-coded array rendering and component mappings exist disjointedly across similar geographic layout definitions mapping (e.g., `boisar`, `vasai`, etc.). Synchronisation requires multi-file audits currently. As the `cms/` platform matures, converting discrete hardcoded elements towards centralized remote dynamic configuration variables fetched via backend services is essential.
- **Form Cohesion**: Disconnected form implementations managing validations independently without a unified robust tracking pattern inside the feedback loop. 

## Areas of Future Focus
- Ensure cross-validation alignment where the robust `zod` schema checks on the client accurately map to the Java `@Validation` constraints configured server-side.
- Managing potential cold-start overhead when dynamically generating layout variations heavily leveraging complex spatial animations.
- Expanding global dark-mode persistence implementations without frame flash flickering securely between the main application interface endpoints.
- Unifying duplicated layout UI across outlets into singular layouts configurable via CMS.
