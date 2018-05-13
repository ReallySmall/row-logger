export namespace Interfaces {

    export interface Props {
        disabled: boolean;
        id: string;
        label: string;
        input: object;
        type: string;
        typeSpecific: any;
        options: Array<any>;
        placeholder: string;
        required: boolean;
        meta: any;
    }

    export interface State {
        /* empty */
    }

}