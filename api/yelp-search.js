const { searchYelpBusinesses } = require('../src/services/yelp-service');

const ALLOWED_LOCATIONS = new Set(['Tucson, AZ', 'Sonoita, AZ', 'Willcox, AZ', 'Cottonwood, AZ']);
const ALLOWED_TERMS = new Set(['wineries', 'wine tasting', 'wine bars']);
const ALLOWED_CATEGORIES = new Set(['wineries,wine_bars', 'wineries', 'wine_bars']);

function parsePositiveInteger(value, fallback) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.has(value) ? value : fallback;
}

module.exports = async function handler(request, response) {
    if (request.method && request.method !== 'GET') {
        response.statusCode = 405;
        response.setHeader('content-type', 'application/json');
        response.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        const query = request.query || {};
        const limit = Math.min(parsePositiveInteger(query.limit, 8), 8);
        const result = await searchYelpBusinesses({
            apiKey: process.env.YELP_API_KEY,
            search: {
                location: pickAllowed(query.location, ALLOWED_LOCATIONS, 'Tucson, AZ'),
                term: pickAllowed(query.term, ALLOWED_TERMS, 'wineries'),
                categories: pickAllowed(query.categories, ALLOWED_CATEGORIES, 'wineries,wine_bars'),
                limit,
                sortBy: query.sort_by || 'rating',
            },
        });

        response.statusCode = 200;
        response.setHeader('cache-control', 's-maxage=3600, stale-while-revalidate=86400');
        response.setHeader('content-type', 'application/json');
        response.end(JSON.stringify(result));
    } catch (error) {
        response.statusCode = error.message.includes('YELP_API_KEY') ? 500 : 502;
        response.setHeader('content-type', 'application/json');
        response.end(
            JSON.stringify({
                error: 'Unable to load Yelp business data',
            })
        );
    }
};
