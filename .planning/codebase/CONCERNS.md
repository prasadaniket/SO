# Concerns

## Technical Debt & Maintenance
- **Data Duplication**: The hardcoded layout configuration array elements present across `boisar.tsx`, `palghar.tsx`, `vasai.tsx`, and `virar.tsx` have been highly synchronized (recently all receiving the identical sleek UI pill update). However, keeping 4 disconnected component variants completely aligned visually requires manual effort. Changes to one usually compel changing all, creating significant maintenance overhead and room for UI regressions if not carefully audited.
- **Form State Tracking**: The feedback and review portals currently rely heavily on standard React forms. State management, validations, and graceful server-integration errors must be consistently maintained as they are completely decoupled from context providers currently. 

## Areas of Future Focus
- Integrating the global footer centrally on purely isolated specific route segments.
- Implementing absolute dark-theme persistence without layout pop-in.
- Further reducing repetition by driving these static outlet variants through a unified CMS or more exhaustive shared configuration `OutletParams` type dictionary.
