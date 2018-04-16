export namespace Interfaces {

    export interface Props {
        disabled: boolean;
        id: string;
        label: string;
        input: object;
        type: string;
        placeholder: string;
        required: boolean;
        meta: any;
    }

    export interface State {
        dateTimeConfig: any;
    }

}