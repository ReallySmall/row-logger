export namespace Interfaces {

    export interface Props {
    	isLoggedIn: boolean;
        sessionActions: any;
        authActions: any;
        sessions: any;
        recentSessions: GridData;
        activeFilters: AppFormValues;
    }

    export interface State {
        /* empty */
    }

}