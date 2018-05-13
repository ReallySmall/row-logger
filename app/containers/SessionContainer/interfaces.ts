export namespace Interfaces {

    export interface Props {
        processing?: string;
        error?: string;
        sessionsAction?: any;
        totals: GridData;
        recentSessions: GridData;
    }

    export interface State {
        /* empty */
    }

}