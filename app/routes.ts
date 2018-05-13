export const routes = {
    base: {
        pathname: '/',
        public: true
    },
    login: {
        pathname: '/login',
        public: true
    },
    register: {
        pathname: '/register',
        public: true
    },
    account: {
        pathname: '/account',
        public: false
    },
    sessions: {
        pathname: '/sessions',
        public: false
    },
    session: {
        pathname: '/sessions/:id',
        public: false
    },
    activeSession: {
        pathname: '/active',
        public: false
    }
};
