declare type QueryItemIdArray = Array<string>;

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

declare interface AppFormField {
    name: string;
    display: boolean;
    renderer: string;
    type: string;
    options?: Array<AppFormFieldSelectOption>;
    label: string;
    value: any;
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
    payload?: any;
    error?: boolean;
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
    userName: string;
}

declare interface GridData {
    items: object;
    ids: Array<string>;
}

declare type WebsocketMessage = string | number | Array<number> | Array<string>;

declare type WebsocketMessageType = 'WEBSOCKET:MESSAGE' | 'WEBSOCKET:LOGGER_CONNECTED' | 'WEBSOCKET:CLIENT_CONNECTED' | 'WEBSOCKET:LOGGER_DISCONNECTED' | 'WEBSOCKET:CLIENT_DISCONNECTED';

declare interface WebsocketActiveSessionClients {}

declare interface SessionTotals {
    metres: number;
    time: number;
}

declare interface RowerType {
    constant: number;
    multi: number;
}

declare interface RowerTypes {
  waterRowerA1: RowerType;
}

declare interface SessionsQuery {
    limit: number;
    showRecent: boolean;
}