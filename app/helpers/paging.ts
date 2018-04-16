// create a paged data array
export const updatePageArray = (existingPageArray: Array<QueryItemIdArray>, totalItemCount: number, itemsPerPage: number, pageNumber: number, ids: Array<string>): Array<QueryItemIdArray> => {

    const newPageCount: number = Math.ceil(totalItemCount / itemsPerPage);
    const newPageArray: Array<QueryItemIdArray> = [];
    const pageNumberIndex: number = pageNumber - 1;

    for (let i = 0; i < newPageCount; i++) {
        newPageArray.push(i === pageNumberIndex ? ids : existingPageArray[i] || []);
    }

    return newPageArray;

};

// add page sorting params to a query
export const addPagingSortingParams = (query: QueryParams, pagingSortingParams: QueryPagingSorting): QueryParams => {

    query.pageNumber = pagingSortingParams.pageNumber || 1; // always set page to 1 unless specified otherwise
    query.pageSize = pagingSortingParams.pageSize || 50;
    query.sortColumn = pagingSortingParams.sortColumn || '';
    query.sortDirection = pagingSortingParams.sortDirection || '';

    return query;

};