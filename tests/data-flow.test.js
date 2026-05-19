const test = require('node:test');
const assert = require('node:assert/strict');

const { createAppServices, createMemoryDatabase } = require('../src/services/app-services');
const { createAppStore } = require('../src/state/app-store');

test('catalog service filters experiences like an API query layer', () => {
    const services = createAppServices();

    const affordableSonoitaTours = services.catalog.listExperiences({
        region: 'Sonoita AVA',
        type: 'tour',
        maxPrice: 50,
    });

    assert.equal(affordableSonoitaTours.length, 1);
    assert.equal(affordableSonoitaTours[0].id, 'vineyard-tour');
});

test('booking service validates and persists booking requests', () => {
    const database = createMemoryDatabase();
    const services = createAppServices({ database });

    const booking = services.bookings.createBookingRequest({
        experienceId: 'private-tasting',
        guestEmail: 'guest@example.com',
        partySize: 4,
        requestedDate: '2026-06-15',
    });

    assert.equal(booking.status, 'pending');
    assert.equal(database.snapshot().bookingRequests.length, 1);
    assert.throws(() => {
        services.bookings.createBookingRequest({
            experienceId: 'private-tasting',
            guestEmail: 'guest@example.com',
            partySize: 0,
            requestedDate: '2026-06-15',
        });
    }, /Party size/);
});

test('authenticated users can save favorites and course progress', () => {
    const services = createAppServices();

    assert.throws(() => {
        services.journal.saveFavorite({
            itemType: 'winery',
            itemId: 'los-milics',
        });
    }, /Authentication required/);

    const session = services.auth.signInWithEmail('Guest@Example.com');
    assert.equal(session.user.email, 'guest@example.com');

    const favorite = services.journal.saveFavorite({
        itemType: 'winery',
        itemId: 'los-milics',
        notes: 'Prioritize this for the next Sonoita itinerary.',
    });

    const progress = services.journal.saveCourseProgress({
        moduleId: 'wine-basics',
        score: 100,
        completed: true,
    });

    assert.equal(favorite.userId, session.user.id);
    assert.equal(progress.completed, true);
    assert.equal(services.journal.listFavorites().length, 1);
    assert.equal(services.journal.listCourseProgress()[0].moduleId, 'wine-basics');
});

test('app store coordinates session, catalog, booking, and journal state', async () => {
    const services = createAppServices();
    const store = createAppStore(services);
    const observedStates = [];

    const unsubscribe = store.subscribe(state => observedStates.push(state));

    await store.loadCatalog({ region: 'Sonoita AVA' });
    store.signIn('member@example.com');
    store.saveFavorite({ itemType: 'experience', itemId: 'private-tasting' });
    store.saveCourseProgress({ moduleId: 'wine-basics', score: 100, completed: true });
    store.createBookingRequest({
        experienceId: 'private-tasting',
        guestEmail: 'member@example.com',
        partySize: 2,
        requestedDate: '2026-06-16',
    });

    const state = store.getState();
    unsubscribe();

    assert.equal(state.session.user.email, 'member@example.com');
    assert.equal(state.experiences.length, 2);
    assert.equal(state.favorites.length, 1);
    assert.equal(state.courseProgress.length, 1);
    assert.equal(state.bookingRequests[0].status, 'pending');
    assert.ok(observedStates.length >= 5);
});
