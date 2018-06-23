export namespace Interfaces {

    export interface Props {
        processing?: string;
        error?: string;
        sessionActions?: any;
        sessions: any;
        totals: GridData;
        recentSessions: GridData;
    }

    export interface State {
        /* empty */
    }

}