const YELP_BUSINESS_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';

function normalizeYelpBusiness(business) {
    return {
        id: business.id,
        name: business.name,
        rating: business.rating,
        reviewCount: business.review_count,
        url: business.url,
        imageUrl: business.image_url,
        phone: business.display_phone,
        categories: (business.categories || []).map(category => category.title),
        coordinates: business.coordinates || null,
        address: business.location?.display_address || [],
    };
}

function buildYelpSearchUrl({
    location = 'Tucson, AZ',
    term = 'wineries',
    categories = 'wineries,wine_bars',
    limit = 8,
    sortBy = 'rating',
} = {}) {
    const url = new URL(YELP_BUSINESS_SEARCH_URL);
    const safeLimit = Math.min(Math.max(Number.parseInt(limit, 10) || 8, 1), 8);

    url.searchParams.set('location', location);
    url.searchParams.set('term', term);
    url.searchParams.set('categories', categories);
    url.searchParams.set('limit', String(safeLimit));
    url.searchParams.set('sort_by', sortBy);

    return url;
}

async function searchYelpBusinesses({ apiKey, fetchImpl = fetch, search = {} }) {
    if (!apiKey) {
        throw new Error('YELP_API_KEY is required');
    }

    const url = buildYelpSearchUrl(search);
    const response = await fetchImpl(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Yelp search failed with status ${response.status}`);
    }

    const payload = await response.json();

    return {
        total: payload.total || 0,
        businesses: (payload.businesses || []).map(normalizeYelpBusiness),
    };
}

module.exports = {
    YELP_BUSINESS_SEARCH_URL,
    buildYelpSearchUrl,
    normalizeYelpBusiness,
    searchYelpBusinesses,
};
