# Stateful App Architecture

`src/state/app-store.js` introduces a small framework-agnostic state store. It is intentionally simple so it can support the current static site and later be replaced or wrapped by React state tools.

## Store Responsibilities

- Track the current auth session.
- Load catalog data into state.
- Persist booking requests through the booking service.
- Persist favorites and Wine 101 progress through authenticated journal services.
- Notify subscribers after state changes.

## State Shape

```js
{
    session: null,
    wineries: [],
    experiences: [],
    pairings: [],
    favorites: [],
    courseProgress: [],
    bookingRequests: [],
    isLoading: false,
    error: null
}
```

## React Migration Path

When the site moves to React, the store can be exposed through:

- A lightweight React Context provider for app/session state.
- TanStack Query for server state once Supabase/API calls are async.
- Focused hooks such as `useCatalog`, `useBookingRequests`, `useFavorites`, and `useCourseProgress`.

## Production-Like Flow

The UI should not read or mutate raw data directly. It should call service/store actions:

- `loadCatalog(filters)`
- `signIn(email)`
- `saveFavorite(input)`
- `saveCourseProgress(input)`
- `createBookingRequest(input)`

This keeps the app ready for API-backed persistence without rewriting every page-level interaction.
