export namespace Interfaces {

    export interface Props {
        actions: any;
        isLoggedIn: boolean;
        userName: string;
        appConnected: boolean;
        location: any;
        history: any;
        authActions: any;
    }

    export interface State {
        requestedInitialPath: string;
    }

}