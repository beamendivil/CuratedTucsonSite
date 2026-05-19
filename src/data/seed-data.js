const seedData = {
    wineries: [
        {
            id: 'los-milics',
            name: 'Los Milics Vineyards',
            region: 'Sonoita AVA',
            specialties: ['Tempranillo', 'Syrah'],
            description: 'Modern tasting room with mountain views and a focused Arizona wine list.',
        },
        {
            id: 'rune-wines',
            name: 'Rune Wines',
            region: 'Sonoita AVA',
            specialties: ['Grenache', 'Viognier'],
            description:
                'Off-grid tasting experience built around open desert views and solar power.',
        },
        {
            id: 'page-springs',
            name: 'Page Springs Cellars',
            region: 'Verde Valley AVA',
            specialties: ['Sangiovese', 'Viognier'],
            description: 'Creekside tasting room known for food-friendly Arizona wines.',
        },
    ],
    experiences: [
        {
            id: 'vineyard-tour',
            title: 'Vineyard Tour',
            region: 'Sonoita AVA',
            type: 'tour',
            durationHours: 1.5,
            pricePerPerson: 45,
            capacity: 12,
        },
        {
            id: 'private-tasting',
            title: 'Private Tasting',
            region: 'Sonoita AVA',
            type: 'tasting',
            durationHours: 2,
            pricePerPerson: 75,
            capacity: 8,
        },
        {
            id: 'food-wine-pairing',
            title: 'Food & Wine Pairing',
            region: 'Verde Valley AVA',
            type: 'pairing',
            durationHours: 3,
            pricePerPerson: 120,
            capacity: 10,
        },
    ],
    pairings: [
        {
            id: 'tempranillo-steak',
            wine: 'Tempranillo',
            food: 'Mesquite-Grilled Steak',
            region: 'Sonoita AVA',
            notes: 'Smoke and char complement Tempranillo tannin and mineral notes.',
        },
        {
            id: 'viognier-seafood',
            wine: 'Viognier',
            food: 'Grilled Seafood',
            region: 'Willcox AVA',
            notes: 'Citrus and stone-fruit aromatics work well with delicate seafood.',
        },
        {
            id: 'rose-mediterranean',
            wine: 'Provence-style Rose',
            food: 'Mediterranean Cuisine',
            region: 'Verde Valley AVA',
            notes: 'Dry rose supports olives, herbs, tomatoes, and lighter grilled dishes.',
        },
    ],
    courseModules: [
        {
            id: 'wine-basics',
            title: 'Wine Basics & Terminology',
            requiredScore: 80,
        },
        {
            id: 'wine-service',
            title: 'Professional Service Standards',
            requiredScore: 80,
        },
        {
            id: 'arizona-wines',
            title: 'Arizona Wine Regions',
            requiredScore: 80,
        },
    ],
};

module.exports = {
    seedData,
};
