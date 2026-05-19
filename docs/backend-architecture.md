# Backend Architecture

The current site is still deployed as a static front end, but the data layer is now shaped around a production backend boundary.

## Target Backend

The planned production target is Supabase:

- Supabase Auth for email-based authentication.
- Supabase Postgres for wineries, experiences, pairings, booking requests, favorites, and Wine 101 progress.
- Row Level Security for user-owned records.
- A server-side Yelp API proxy for winery discovery and enriched business metadata.

The draft schema lives in `supabase/schema.sql`.

## Current Implementation

The current implementation uses an in-memory adapter in `src/services/app-services.js`. It mirrors the future backend API shape without requiring credentials during local development or CI.

Implemented service boundaries:

- `auth`: sign in, sign out, current session, require authenticated user.
- `catalog`: list wineries, experiences, and pairings with query-style filters.
- `bookings`: create and list booking requests.
- `journal`: save favorites and Wine 101 course progress for authenticated users.
- `database`: adapter interface used by the service layer.
- `yelp-service`: builds Yelp Business Search requests and normalizes Yelp businesses for app use.

## Why This Helps

This creates a migration path from static prototype to full-stack app:

1. Keep the UI code calling service functions.
2. Swap the memory database adapter for a Supabase adapter.
3. Replace mock auth with Supabase Auth.
4. Keep the state store and tests focused on product behavior rather than storage details.

## Production Data Flows

### Browse Catalog

User opens the site -> UI calls `catalog.listExperiences(filters)` -> adapter queries experiences -> UI renders filtered results.

### Booking Request

User submits booking form -> UI calls `bookings.createBookingRequest(input)` -> service validates required fields -> adapter persists a `booking_requests` row with `pending` status.

### Authenticated Favorites

User signs in -> UI receives session -> user saves a winery/experience/pairing -> `journal.saveFavorite(input)` requires a user -> adapter persists a user-owned favorite.

### Wine 101 Progress

User completes a module -> UI calls `journal.saveCourseProgress(input)` -> service upserts module progress -> persisted progress can be restored across sessions/devices once backed by Supabase.

## Next Backend Step

Add a Supabase adapter that implements the same database operations used by the service layer, then gate it behind environment configuration:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
```

The static memory adapter remains useful for tests and local demos.
