export namespace Interfaces {

    export interface Props {
        pageSizeOptions: Array<any>;
        pageSizeValue: number;
        currentPage: number;
        pageCount: number;
        pageLinksToShow: number;
        changePerPageAction: any;
        changePageAction: any;
    }

    export interface State {
        visiblePaginationIndex: number;
    }

}