export namespace Interfaces {

    export interface Props {
        processing?: string;
        error?: string;
        sessionActions?: any;
        sessions: any;
        totals: GridData;
        recentSessions: GridData;
        activeFilters: AppFormValues;
    }

    export interface State {
        /* empty */
    }

}