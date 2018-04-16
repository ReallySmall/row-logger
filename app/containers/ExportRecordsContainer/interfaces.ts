export namespace Interfaces {

    export interface Props {
        exportActions?: any;
        ids?: Array<any>;
        items?: any;
        overallCount: number;
        exportAll?: boolean;
        processing?: boolean;
        error?: string;
        fieldData?: any;
        maxSelectableItems: number;
    }

    export interface State {
        /* empty */
    }

}