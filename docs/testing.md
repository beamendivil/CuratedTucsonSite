# Testing Strategy

The project uses two layers of automated tests.

## Static Smoke Tests

`tests/site.test.js` uses Node's built-in test runner to validate repository and markup integrity:

- Brand consistency across public pages.
- Shared CSS and JavaScript loading.
- Local links and anchors.
- Local image references.
- Critical markup hooks for interactive features.

Run with:

```bash
npm run test
```

## Browser Tests

`tests/e2e/site.spec.js` uses Playwright and Chromium to exercise critical user flows:

- Homepage loads and navigates to the experiences page.
- Pairing guide filters food cards by selected wine.
- Booking calendar opens available time slots.
- Wine 101 module quiz can be completed and persisted to `localStorage`.

Run with:

```bash
npm run test:e2e
```

## Full Gate

Run everything with:

```bash
npm run check
```

The full gate runs linting, static tests, browser tests, and formatting checks. CI and deployment both use this command so local validation matches GitHub Actions.

The gate also builds `dist/tailwind.css` with the Tailwind CLI so tests run against production-style CSS rather than the development CDN.

## Future Coverage

- Add mobile viewport E2E coverage.
- Add accessibility checks with `@axe-core/playwright`.
- Add visual screenshots for key pages after the React migration.
- Add API/auth/database tests once the project moves beyond a static prototype.
