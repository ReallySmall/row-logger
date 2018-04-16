export namespace Interfaces {

    export interface Column {
        columnId: string;
        name: string;
        width: string;
        sortable: boolean;
        sortDirection: string;
        renderer: Function;
        renderTemplate: string;
    }

}