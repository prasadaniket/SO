# Tech Stack

## Overview
StoneOven is a responsive web application built with the Next.js App Router, prioritizing a high-end visual aesthetic and buttery smooth client-side interactions.

## Core Technologies
- **Framework**: Next.js 16 (App Router paradigm)
- **UI Library**: React 19
- **Language**: TypeScript for strict typing across components and data definitions
- **Styling**: Tailwind CSS
- **Motion & Animations**: Framer Motion (extensively used for hover effects, page load delays, scaling, and premium micro-interactions)
- **Icons**: Lucide React

## Package Manager
- `npm` (running inside `client/` directory)

## Dependency Highlights
- `next`: `16.2.4` (or similar recent 16.x distribution)
- `react`, `react-dom`: `19.x`
- `framer-motion`: For fluid UI dynamics
- `lucide-react`: High-quality unstyled SVG scalable icons

## Configuration
- Standard `next.config.js` or `.mjs`
- Tailwind setup heavily leveraging custom Hex codes (e.g., `#F2A65A`, `#111111`, `#EEEEEE`) directly injected via inline classes or structured class variables.
