# Vercel Deployment

Vercel is the recommended host for the Yelp-enabled version of Arizona Wine Experience because it can serve both static files and serverless functions from the same repo.

## Why Vercel

GitHub Pages can host the static HTML/CSS/JS, but it cannot run the `/api/yelp-search` proxy. Vercel can deploy:

- Static pages from the repo root.
- The generated Tailwind CSS artifact from `npm run build`.
- Serverless functions from the root `api/` directory.

## Required Environment Variables

Set this in Vercel Project Settings:

```text
YELP_API_KEY=<rotated Yelp Fusion API key>
```

Do not commit `.env` files or paste the key into browser JavaScript.

## Build Settings

The repo includes `vercel.json`:

```json
{
    "framework": null,
    "buildCommand": "npm run build",
    "outputDirectory": "."
}
```

The build command generates `dist/tailwind.css`. The root directory is used as the output directory because this is still a static HTML project with a root-level Vercel function.

## Runtime Flow

1. Browser loads `index.html`.
2. `main.js` requests `/api/yelp-search`.
3. Vercel invokes `api/yelp-search.js`.
4. The function reads `process.env.YELP_API_KEY`.
5. The function calls Yelp Business Search and returns normalized business data.
6. The browser renders the live winery cards.

If the proxy is unavailable, the page shows a non-breaking fallback message.

## Local Development

The static site still runs with:

```bash
npm run dev
```

To test the serverless function locally, use Vercel CLI:

```bash
vercel dev
```

Then request:

```text
http://localhost:3000/api/yelp-search?location=Tucson%2C%20AZ&term=wineries
```
