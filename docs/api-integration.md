# Yelp API Integration

The project is adding Yelp Fusion / Yelp Places data through a server-side API boundary.

## Why Server-Side

Yelp API keys must not be shipped to browser JavaScript. The public HTML pages call local app services, and a backend/serverless proxy is responsible for calling Yelp with `YELP_API_KEY`.

The API key that was shared during development should be rotated in Yelp for Developers before use.

## Endpoint

Yelp Business Search:

```text
GET https://api.yelp.com/v3/businesses/search
Authorization: Bearer <YELP_API_KEY>
```

Current default query:

```text
location=Tucson, AZ
term=wineries
categories=wineries,wine_bars
limit=8
sort_by=rating
```

## Files

- `src/services/yelp-service.js`: request builder, Yelp fetch function, and response normalizer.
- `api/yelp-search.js`: serverless-style proxy endpoint that reads `process.env.YELP_API_KEY`.
- `.env.example`: documents required environment variables without committing secrets.
- `tests/yelp-service.test.js`: verifies URL construction, bearer auth, response mapping, and missing-key behavior.

## Deployment Notes

GitHub Pages cannot run server-side functions, so this endpoint needs a backend-capable host such as Vercel, Netlify Functions, Supabase Edge Functions, or a small Express API.

For a Vercel-style deployment, configure:

```text
YELP_API_KEY=<rotated key from Yelp for Developers>
```

The homepage now calls `/api/yelp-search` for the live winery discovery section. When the proxy is unavailable, the UI shows a fallback message and the rest of the site continues to work.

See `docs/vercel-deployment.md` for the Vercel deployment setup.
