declare type QueryItemIdArray = Array<string>;

declare type UserDataRoleArray = Array<string>;

declare type QueryFileIdArray = Array<string>;

declare type FetchError = string | object;

declare type DetailId = string;

declare interface Column {
    columnId: string;
    name: string;
    width: string;
    sortable: boolean;
    sortDirection: string;
    renderer: Function;
    renderTemplate: string;
}

declare interface AppFormFieldSelectOption {
    value: string;
    label: string;
    meta?: any;
}

declare interface AppFormFieldConditionalParent {
    name: string;
    values: Array<any>;
}

declare interface AppFormFieldTypeSpecificData {
    options?: Array<AppFormFieldSelectOption>;
    maxLength?: number;
    max?: number;
    min?: number;
    rangeFuture?: string;
    rangePast?: string;
}

declare interface AppFormField {
    name: string;
    display: boolean;
    renderer: string;
    type: string;
    typeSpecific: AppFormFieldTypeSpecificData;
    label: string;
    value: any;
    placeholder: string;
    conditionalParent?: AppFormFieldConditionalParent;
    required: boolean;
    validators: Array<string>;
}

declare interface AppForm {
    [key: string]: AppFormField;
}

declare interface AppFormValues {
    [key: string]: any;
}

declare interface QueryParams {
    status: string;
    fromDate: any;
    toDate: any;
    pageSize: number;
    pageNumber: number;
    sortColumn: string;
    sortDirection: string;
    formType: string;
    formSearch: string;
    openingCode: string;
    submitNumber: number;
    submitYear: number;
    closingCode: string;
}

declare interface QueryOptions {
    reset?: boolean;
    stayOnCurrentPage?: boolean;
}

declare interface QuerySortDirections {
    ASC: string;
    DESC: string;
    NONE: null;
}

declare interface QueryPagingSorting {
    pageSize?: number;
    pageNumber?: number;
    sortColumn?: string;
    sortDirection?: string;
}

declare interface ReduxAction {
    type: string;
    data?: any;
    message?: any;
    payload?: any;
}

declare interface FetchOptions {
    method: string;
    headers: any;
    body?: string;
}

declare interface JwtToken {
    access_token: string;
    expires_in: number;
    token_type: string;
}

declare interface JwtTokenDecoded {
    exp: number;
    role: UserDataRoleArray;
}

declare interface GridData {
    items: object;
    ids: Array<string>;
}

declare type WebsocketMessage = string;

declare type WebsocketMessageType = 'message' | 'base' | 'error';

declare interface SessionTotals {
    metres: number;
    time: number;
}
