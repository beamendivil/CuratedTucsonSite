function createAppStore(services) {
    const listeners = new Set();
    const state = {
        session: services.auth.getSession(),
        wineries: [],
        experiences: [],
        pairings: [],
        favorites: [],
        courseProgress: [],
        bookingRequests: [],
        isLoading: false,
        error: null,
    };

    function snapshot() {
        return JSON.parse(JSON.stringify(state));
    }

    function notify() {
        const current = snapshot();
        listeners.forEach(listener => listener(current));
    }

    function setState(patch) {
        Object.assign(state, patch);
        notify();
    }

    return {
        subscribe(listener) {
            listeners.add(listener);
            listener(snapshot());
            return () => listeners.delete(listener);
        },
        getState: snapshot,
        async loadCatalog(filters = {}) {
            setState({ isLoading: true, error: null });

            try {
                setState({
                    wineries: services.catalog.listWineries(filters),
                    experiences: services.catalog.listExperiences(filters),
                    pairings: services.catalog.listPairings(filters),
                    isLoading: false,
                });
            } catch (error) {
                setState({ error: error.message, isLoading: false });
            }
        },
        signIn(email) {
            const session = services.auth.signInWithEmail(email);
            setState({
                session,
                favorites: services.journal.listFavorites(),
                courseProgress: services.journal.listCourseProgress(),
            });
            return session;
        },
        signOut() {
            services.auth.signOut();
            setState({
                session: null,
                favorites: [],
                courseProgress: [],
            });
        },
        saveFavorite(input) {
            const favorite = services.journal.saveFavorite(input);
            setState({ favorites: services.journal.listFavorites() });
            return favorite;
        },
        saveCourseProgress(input) {
            const progress = services.journal.saveCourseProgress(input);
            setState({ courseProgress: services.journal.listCourseProgress() });
            return progress;
        },
        createBookingRequest(input) {
            const booking = services.bookings.createBookingRequest(input);
            setState({ bookingRequests: services.bookings.listBookingRequests() });
            return booking;
        },
    };
}

module.exports = {
    createAppStore,
};
