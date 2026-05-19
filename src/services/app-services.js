const { seedData } = require('../data/seed-data');

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function createMemoryDatabase(initialData = seedData) {
    const state = {
        wineries: clone(initialData.wineries),
        experiences: clone(initialData.experiences),
        pairings: clone(initialData.pairings),
        courseModules: clone(initialData.courseModules),
        users: [],
        bookingRequests: [],
        favorites: [],
        courseProgress: [],
    };

    return {
        list(collection) {
            return clone(state[collection] || []);
        },
        insert(collection, record) {
            if (!state[collection]) {
                state[collection] = [];
            }

            const savedRecord = {
                id: record.id || `${collection}-${state[collection].length + 1}`,
                createdAt: record.createdAt || new Date().toISOString(),
                ...record,
            };

            state[collection].push(savedRecord);
            return clone(savedRecord);
        },
        find(collection, predicate) {
            return clone((state[collection] || []).find(predicate) || null);
        },
        update(collection, predicate, updater) {
            const item = (state[collection] || []).find(predicate);
            if (!item) return null;

            Object.assign(item, updater(clone(item)));
            return clone(item);
        },
        snapshot() {
            return clone(state);
        },
    };
}

function createAuthService(database) {
    let session = null;

    return {
        signInWithEmail(email) {
            const normalizedEmail = email.trim().toLowerCase();
            let user = database.find('users', item => item.email === normalizedEmail);

            if (!user) {
                user = database.insert('users', {
                    id: `user-${Date.now()}`,
                    email: normalizedEmail,
                    displayName: normalizedEmail.split('@')[0],
                });
            }

            session = {
                user,
                accessToken: `mock-token-${user.id}`,
            };

            return clone(session);
        },
        signOut() {
            session = null;
        },
        getSession() {
            return clone(session);
        },
        requireUser() {
            if (!session?.user) {
                throw new Error('Authentication required');
            }

            return clone(session.user);
        },
    };
}

function createCatalogService(database) {
    return {
        listWineries(filters = {}) {
            return database.list('wineries').filter(winery => {
                return !filters.region || winery.region === filters.region;
            });
        },
        listExperiences(filters = {}) {
            return database.list('experiences').filter(experience => {
                const matchesRegion = !filters.region || experience.region === filters.region;
                const matchesType = !filters.type || experience.type === filters.type;
                const matchesPrice =
                    !filters.maxPrice || experience.pricePerPerson <= filters.maxPrice;

                return matchesRegion && matchesType && matchesPrice;
            });
        },
        listPairings(filters = {}) {
            return database.list('pairings').filter(pairing => {
                return !filters.wine || pairing.wine.toLowerCase() === filters.wine.toLowerCase();
            });
        },
    };
}

function createBookingService(database) {
    return {
        createBookingRequest(input) {
            const requiredFields = ['experienceId', 'guestEmail', 'partySize', 'requestedDate'];
            const missingField = requiredFields.find(field => {
                return input[field] === undefined || input[field] === null || input[field] === '';
            });

            if (missingField) {
                throw new Error(`Missing booking field: ${missingField}`);
            }

            if (input.partySize < 1) {
                throw new Error('Party size must be at least 1');
            }

            return database.insert('bookingRequests', {
                ...input,
                status: 'pending',
            });
        },
        listBookingRequests() {
            return database.list('bookingRequests');
        },
    };
}

function createJournalService(database, auth) {
    return {
        saveFavorite(input) {
            const user = auth.requireUser();
            const favorite = database.find('favorites', item => {
                return (
                    item.userId === user.id &&
                    item.itemType === input.itemType &&
                    item.itemId === input.itemId
                );
            });

            if (favorite) return favorite;

            return database.insert('favorites', {
                userId: user.id,
                itemType: input.itemType,
                itemId: input.itemId,
                notes: input.notes || '',
            });
        },
        listFavorites() {
            const user = auth.requireUser();
            return database.list('favorites').filter(item => item.userId === user.id);
        },
        saveCourseProgress(input) {
            const user = auth.requireUser();
            const existing = database.find('courseProgress', item => {
                return item.userId === user.id && item.moduleId === input.moduleId;
            });

            if (existing) {
                return database.update(
                    'courseProgress',
                    item => item.id === existing.id,
                    () => ({
                        score: input.score,
                        completed: input.completed,
                        updatedAt: new Date().toISOString(),
                    })
                );
            }

            return database.insert('courseProgress', {
                userId: user.id,
                moduleId: input.moduleId,
                score: input.score,
                completed: input.completed,
            });
        },
        listCourseProgress() {
            const user = auth.requireUser();
            return database.list('courseProgress').filter(item => item.userId === user.id);
        },
    };
}

function createAppServices({ database = createMemoryDatabase(), auth } = {}) {
    const authService = auth || createAuthService(database);

    return {
        database,
        auth: authService,
        catalog: createCatalogService(database),
        bookings: createBookingService(database),
        journal: createJournalService(database, authService),
    };
}

module.exports = {
    createAppServices,
    createAuthService,
    createBookingService,
    createCatalogService,
    createJournalService,
    createMemoryDatabase,
};
