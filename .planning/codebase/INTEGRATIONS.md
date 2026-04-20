# Integrations

## Overview
The application functions primarily as a frontend marketing and user experience portal for StoneOven outlets.

## External Services & APIs
- **Google Maps**: Outlets map strictly to Google Maps URLs so users can seamlessly transition from the "Find on Google Maps" Call to Action directly into Google Maps interface.
- **Social Media Links**: Social page redirections (Instagram, Facebook) are hardcoded into specific routing components and footers.

## Backend Dependencies
- Currently operates largely as a static/client-side dynamic site. Menu items, locations, and testimonials are usually driven by local configuration structures or client-side JSON maps, passing metadata like `outlet.googleMapsUrl` dynamically down to client components. 
- *Note*: As feedback and review features (`app/outlet/[code]/feedback` & `review`) are built out, they will likely integrate with backend form aggregation services or direct server actions.
