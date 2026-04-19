# Integrations

## Overview
This document outlines the external services, APIs, and databases integrated within the StoneOven codebase.

## Databases & Middleware
- **PostgreSQL**: Primary relational database for persistent data storage on the backend (`server/pom.xml`).
- **Redis**: In-memory data structure store used for caching and potentially session management on the backend (`server/pom.xml`).

## External APIs & Services
- **Twilio**: Integrated in the Spring Boot backend (`com.twilio.sdk:twilio:11.4.0`) to handle WhatsApp messaging, likely for sending order confirmations, QR code links, or OTPs.

## Auth & Identity Providers
- **JWT (JSON Web Tokens)**: Used for stateless authentication across the platform (`io.jsonwebtoken:jjwt`), coupled with Spring Security (`server/pom.xml`). No third-party OAuth providers are explicitly present in the dependency tree at this time.

## Fingerprinting
- **FingerprintJS**: Used in the client frontend (`@fingerprintjs/fingerprintjs`) for device fingerprinting, potentially to manage carts or sessions without explicit user login.
