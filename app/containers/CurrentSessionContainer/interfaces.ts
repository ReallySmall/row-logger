export namespace Interfaces {

    export interface Props {
        appConnected: boolean;
        loggerConnected: boolean;
        times: Array<number>;
        multi: number;
        constant: number;
    }

    export interface State {
        isLoggerConnected: boolean;
    }

}