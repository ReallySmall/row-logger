export namespace Interfaces {

    export interface Props {
        processing?: string;
        error?: string;
        session: any;
        sessionActions: any;
        routing: any;
    }

    export interface State {
        editing: boolean;
    }

}