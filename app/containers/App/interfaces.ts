export namespace Interfaces {

    export interface Props {
        actions: any;
        isLoggedIn: boolean;
        isProcessing: boolean;
        error: string;
        userName: string;
        appConnected: boolean;
        location: any;
        history: any;
        authActions: any;
        errorActions: any;
    }

    export interface State {
        requestedInitialPath: string;
    }

}