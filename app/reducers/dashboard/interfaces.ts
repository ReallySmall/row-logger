declare interface DashboardInterface {
    readonly activeTabIndex: number;
    readonly processing: string;
    readonly ids?: Array<string>;
    readonly overallCount: number;
    readonly items?: object;
    readonly currentQuery?: object;
    readonly itemsSelected: number;
    readonly pages: Array<any>;
    readonly pageSize: number;
    readonly currentPage: number;
    readonly error: string;
}

export default DashboardInterface;