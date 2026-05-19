# Arizona Wine Experience

[![CI](https://github.com/beamendivil/CuratedTucsonSite/actions/workflows/ci.yml/badge.svg)](https://github.com/beamendivil/CuratedTucsonSite/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/beamendivil/CuratedTucsonSite/actions/workflows/deploy.yml/badge.svg)](https://github.com/beamendivil/CuratedTucsonSite/actions/workflows/deploy.yml)

Arizona Wine Experience is a static, multi-page hospitality website for a fictional Arizona wine-tour brand. It was built as a front-end portfolio project focused on destination storytelling, responsive UI, interactive education, and clear product documentation.

## Live Demo

GitHub Pages is the intended production target.

```text
https://beamendivil.github.io/CuratedTucsonSite/
```

If the repository is renamed later, update this URL to match the new GitHub Pages path.

The Yelp-enabled deployment target is Vercel because Yelp requires a server-side proxy for `YELP_API_KEY`.

## Why I Built It

The goal was to turn a visual tourism concept into a more resume-ready front-end project: a site with brand consistency, documented tradeoffs, basic automated checks, and several client-side interactions that can be reviewed without a backend.

## Tech Stack

- HTML, CSS, and vanilla JavaScript
- Tailwind CLI for compiled production CSS
- Anime.js, Typed.js, Splide, ECharts, html2canvas, and jsPDF
- Node test runner, ESLint, and Prettier
- GitHub Actions and GitHub Pages

## Implemented Features

- Responsive five-page site: home, experiences, pairing guide, about, and Wine 101.
- Compiled Tailwind CSS loaded locally instead of the Tailwind CDN.
- Shared brand/design layer in `styles.css` for color tokens, focus states, gradients, and reduced-motion support.
- Interactive wine-region explorer on the homepage.
- Wine pairing guide that filters food recommendations by selected varietal.
- Booking prototype with generated calendar dates, available time-slot modal, and non-destructive form feedback.
- Wine 101 course player with modules, quizzes, local progress persistence, and certificate PDF generation.
- Backend-ready service layer for catalog queries, booking requests, auth-gated favorites, and course progress.
- Server-side Yelp API integration boundary with request normalization and tests.
- Framework-agnostic state store that models session, catalog, booking, favorite, and course-progress state.
- Automated checks for linting, formatting, local link integrity, asset references, brand consistency, and critical interactive hooks.

## Not Yet Implemented

These are intentionally documented as future work rather than presented as complete product features:

- Real booking availability or payments.
- User accounts, saved favorites, or a persistent wine journal.
- API-backed winery data.
- Share-to-social integrations.
- GPS, maps, or offline behavior.
- Full end-to-end browser tests with Playwright or Cypress.

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:4173
```

## Quality Checks

```bash
npm run check
```

This runs:

- `npm run build:css`
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run format:check`

## Testing

The test suite lives in `tests/site.test.js`. It checks the parts most likely to regress in a static portfolio site:

- Every public page uses the current brand.
- Shared CSS and JS are loaded by every page.
- Local page links, anchors, and image assets resolve.
- Key interactive hooks match the markup they depend on.
- Package metadata and README branding stay aligned.

Browser tests live in `tests/e2e/site.spec.js` and cover homepage navigation, pairing selection, booking calendar time slots, and Wine 101 quiz persistence.

See `docs/testing.md` for the full testing strategy.

## Deployment

The GitHub Pages workflow in `.github/workflows/deploy.yml` runs the full quality gate before publishing. The old GitHub Packages publish workflow was removed because this is a static website, not an npm package intended for distribution.

See `docs/workflow.md` for the local development, CI, and deployment workflow.

## Accessibility Notes

Accessibility work is tracked in `docs/accessibility.md`. Current implementation includes semantic landmarks, alt text on meaningful images, visible focus states, keyboard-focusable controls, and reduced-motion CSS. Automated accessibility auditing with axe or Lighthouse is planned.

## Engineering Decisions

- Kept the project framework-free to show vanilla HTML/CSS/JS fundamentals.
- Added a shared CSS layer because the Tailwind CDN does not know custom project tokens like `text-charcoal` or `bg-wine-burgundy`.
- Documented prototype boundaries clearly so design concepts are not mistaken for production backend functionality.
- Added static smoke tests before introducing a heavier browser testing stack.
- Added a service/store boundary before the React migration so backend data flows can be tested independently from UI rendering.

## Backend And State Architecture

See `docs/backend-architecture.md` and `docs/state-architecture.md` for the API, auth, database, and state-management direction. The planned production backend is Supabase; the current implementation uses a memory adapter with the same service boundaries for local tests and demos.

See `docs/api-integration.md` for the Yelp API integration plan. Yelp credentials must be supplied through `YELP_API_KEY` on a backend-capable host and should never be committed to the repository.

See `docs/vercel-deployment.md` for Vercel setup and runtime flow.

## Roadmap

See `ROADMAP.md` for planned improvements and issue candidates.

## Resume Bullets

- Built a responsive multi-page wine-tour platform with interactive booking, pairing, and staff-training workflows.
- Added automated smoke tests and CI validation for brand consistency, local links, assets, and core interactive hooks.
- Created a shared visual system and documentation set covering setup, deployment, accessibility, current limitations, and roadmap.
