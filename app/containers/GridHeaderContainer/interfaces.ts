export namespace Interfaces {

    export interface Props {
        gridActions?: any;
        items?: object;
        ids?: Array<string>;
        sortedItems?: Array<any>;
        selectedItems?: Array<any>;
        columns?: Array<any>;
        pageSize?: number;
        sortOrder?: any;
        currentQuery?: object;
        processing?: boolean;
    }

    export interface State {
        /* empty */
    }

}