export namespace Interfaces {

    export interface Props {
        actions: any;
        isLoggedIn: boolean;
        location: any;
        history: any;
        authActions: any;
    }

    export interface State {
        requestedInitialPath: string;
    }

}