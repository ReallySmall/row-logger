export namespace Interfaces {

    export interface Props {
        disabled: boolean;
        id: string;
        label: string;
        input: any;
        type: string;
        typeSpecific: any;
        options: Array<any>;
        placeholder: string;
        required: boolean;
        meta: any;
        changeAction?: Function;
    }

    export interface State {
        active: boolean;
        allCheckedVal: Array<any>;
    }

}