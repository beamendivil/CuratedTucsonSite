const test = require('node:test');
const assert = require('node:assert/strict');

const {
    buildYelpSearchUrl,
    normalizeYelpBusiness,
    searchYelpBusinesses,
} = require('../src/services/yelp-service');

test('buildYelpSearchUrl creates a Yelp business search request', () => {
    const url = buildYelpSearchUrl({
        location: 'Sonoita, AZ',
        term: 'wine tasting',
        limit: 5,
    });

    assert.equal(url.origin, 'https://api.yelp.com');
    assert.equal(url.pathname, '/v3/businesses/search');
    assert.equal(url.searchParams.get('location'), 'Sonoita, AZ');
    assert.equal(url.searchParams.get('term'), 'wine tasting');
    assert.equal(url.searchParams.get('limit'), '5');
});

test('buildYelpSearchUrl clamps result limits', () => {
    const url = buildYelpSearchUrl({
        limit: 500,
    });

    assert.equal(url.searchParams.get('limit'), '8');
});

test('normalizeYelpBusiness maps Yelp response fields to app fields', () => {
    const business = normalizeYelpBusiness({
        id: 'sample-winery',
        name: 'Sample Winery',
        rating: 4.8,
        review_count: 125,
        url: 'https://www.yelp.com/biz/sample-winery',
        image_url: 'https://example.com/winery.jpg',
        display_phone: '(520) 555-0100',
        categories: [{ title: 'Wineries' }, { title: 'Wine Bars' }],
        coordinates: { latitude: 31.1, longitude: -110.6 },
        location: { display_address: ['123 Wine Rd', 'Sonoita, AZ'] },
    });

    assert.deepEqual(business, {
        id: 'sample-winery',
        name: 'Sample Winery',
        rating: 4.8,
        reviewCount: 125,
        url: 'https://www.yelp.com/biz/sample-winery',
        imageUrl: 'https://example.com/winery.jpg',
        phone: '(520) 555-0100',
        categories: ['Wineries', 'Wine Bars'],
        coordinates: { latitude: 31.1, longitude: -110.6 },
        address: ['123 Wine Rd', 'Sonoita, AZ'],
    });
});

test('searchYelpBusinesses sends bearer auth and returns normalized businesses', async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
        calls.push({ url, options });
        return {
            ok: true,
            async json() {
                return {
                    total: 1,
                    businesses: [
                        {
                            id: 'sample-winery',
                            name: 'Sample Winery',
                            rating: 4.8,
                            review_count: 125,
                            categories: [{ title: 'Wineries' }],
                            location: { display_address: ['123 Wine Rd'] },
                        },
                    ],
                };
            },
        };
    };

    const result = await searchYelpBusinesses({
        apiKey: 'test-key',
        fetchImpl,
        search: { location: 'Tucson, AZ' },
    });

    assert.equal(calls.length, 1);
    assert.equal(calls[0].options.headers.Authorization, 'Bearer test-key');
    assert.equal(result.total, 1);
    assert.equal(result.businesses[0].name, 'Sample Winery');
});

test('searchYelpBusinesses fails safely without an API key', async () => {
    await assert.rejects(() => searchYelpBusinesses({ apiKey: '' }), /YELP_API_KEY/);
});
