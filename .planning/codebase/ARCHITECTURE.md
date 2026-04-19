# Architecture

## System Overview
The StoneOven project follows a decoupled, three-tier architecture:
1. **Frontend (Client)**: Customer-facing Web app.
2. **Frontend (CMS)**: Content Management Web app for staff/admin.
3. **Backend (Server)**: Restful API server supporting both frontends.

## Component Boundaries
### Client App (`/client`)
- Written in Next.js, implements the UI layer for customers.
- Handles user interface, data display, and client-side form validations.
- Uses `axios` to communicate with the REST API.

### CMS App (`/cms`)
- Written in Next.js, separate from the client app to keep admin logic isolated.
- Designed for staff. Also uses `axios` to communicate with the backend.

### Server (`/server`)
- Written in Spring Boot.
- Acts as the central data provider and orchestrates business logic.
- Exposes RESTful APIs.
- Integrates with external providers (Twilio).

## Data Flow
1. **Requests**: Users interact with the Client or CMS `next.js` app.
2. **API Calls**: The Next.js apps make asynchronous REST API calls via `axios` to the `Spring Boot` backend.
3. **Processing**: The backend controller receives the request, delegates to a service layer, and queries the database via Spring Data JPA.
4. **Response**: Objects are mapped using MapStruct and sent back to the frontend as JSON. Next.js handles the rendering.

## Security
- API requests are secured via **JWT tokens**. The server validates incoming requests and restricts data according to user roles (likely distinguishing between regular users and CMS admins).
