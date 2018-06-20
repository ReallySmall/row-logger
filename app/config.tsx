export const appConfig = {
    windowGlobalAppConfig: 'rowLogger', // set against window object in index.tsx
    csrf: '', // set against window object in index.tsx
    apis: {
        register: 'https://localhost/api/register',
        account: 'https://localhost/api/account',
        login: 'https://localhost/api/login',
        profile: 'https://localhost/api/account/profile',
        rower: 'https://localhost/api/account/rower',
        password: 'https://localhost/api/account/password',
        sessionTotals: 'https://localhost/api/sessions/totals',
        session: 'https://localhost/api/session',
        sessions: 'https://localhost/api/sessions',
        ws: __ISDEVENV__ ? 'wss://localhost' : 'TBC'
    },
    auth: {
        sessionState: 'sessionState', // name of key in sessionStorage
        idleTimeout: 900000, // 15 minutes
        messages: {
            loginMessage: 'Logging in',
            idleTimeout: 'Session ended due to inactivity. Please log in again.',
            sessionTimeout: 'Session expired. Please log in again.',
            notAuthenticated: 'Logged out due to an unauthorised request.'
        }
    },
    cssBreakPoints: {
        tablet: 768,
        desktop: 960
    },
    data: {
        keyField: 'id' // the data field used as a key
    },
    dateFormats: {
        date: 'DD/MM/YYYY',
        dateTime: 'DD/MM/YYYY HH:mm',
        time: 'HH:mm',
        submissionDateTime: 'YYYY-MM-DDTHH:mm',
        fileExport: 'DD/MM/YYYY_HH:mm'
    },
    export: {
        maxItems: 1000,
        maxItemsLarge: 1000,
        downloadBatchSize: 50,
        fileName: 'Sessions'
    },
    formNames: {
        login: 'login'
    },
    pagination: {
        pageSizeOptions: [20, 50, 100, 200],
        pageSizeDefault: 50,
        pageLinksToShow: 10
    }
};
