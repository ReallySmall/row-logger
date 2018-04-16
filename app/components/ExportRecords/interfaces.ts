import { RouteComponentProps } from 'react-router';

export namespace Interfaces {

    export interface Props {
        ids: Array<string>;
        totalRecords: number;
        fileName: string;
        formName: string;
        exportAction: Function;
        clearExportErrorAction: Function;
        exportAll?: boolean;
        disabled: boolean;
        error?: string;
        processing: boolean;
        fieldData: any;
    }

    export interface State { }

}