# Development Workflow

This repo uses a simple quality-gated workflow suitable for a static front-end portfolio project.

## Local Loop

1. Make a focused change.
2. Run the full local check:

```bash
npm run check
```

3. Commit only after linting, static tests, and formatting pass.

## CI

`.github/workflows/ci.yml` runs on pull requests, pushes to `main`, and manual dispatch. It installs dependencies with `npm ci` and runs:

- ESLint
- Tailwind production CSS build
- Node smoke tests
- Playwright browser tests
- Prettier format check

The current smoke tests cover brand consistency, shared asset loading, local link/anchor integrity, local image references, and critical interactive hooks. The browser tests cover representative user flows for navigation, pairings, booking, and Wine 101 progress.

## Deployment

`.github/workflows/deploy.yml` deploys to GitHub Pages on pushes to `main` after running the same quality gate. This keeps the deployed portfolio site aligned with the checked source.

The Yelp-enabled app path uses Vercel. See `docs/vercel-deployment.md` for environment variable and serverless proxy setup.

## Branch Strategy

For larger work, use short-lived branches:

```text
feature/react-migration
feature/auth-journal
feature/booking-api
test/playwright-smoke
```

Open a pull request into `main`, let CI validate it, then merge. The GitHub Pages deployment workflow publishes the merged result.

## Future Workflow Upgrades

- Add mobile viewport Playwright coverage.
- Add axe accessibility checks to the Playwright suite.
- Capture Lighthouse performance/accessibility reports for the deployed site.
- Add database migration checks when the project gains a backend.
