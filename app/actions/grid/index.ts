import * as actions from '../../constants/actions';
import { pagingHelpers } from '../../helpers';

// sort the grid by a column
export const gridSortByColumn = (sortColumn: string, sortDirection: string): Function => {

    const sortDirections: QuerySortDirections = {
        ASC: 'asc',
        DESC: 'desc',
        NONE: null
    };

    switch (sortDirection) {

        // if the column was previously unsorted, sort it ascending
        case sortDirections.NONE:

            sortDirection = sortDirections.ASC;
            break;

        // if the column was previously sorted ascending, sort it descending
        case sortDirections.ASC:

            sortDirection = sortDirections.DESC;
            break;

        // if the column was previously sorted descending, set it to unsorted
        case sortDirections.DESC:

            sortDirection = sortDirections.NONE;
            break;

    }

    const pagingSortingParams: QueryPagingSorting = {
        sortColumn: sortDirection ? sortColumn : '', // submit both sort column and direction or neither
        sortDirection: sortColumn ? sortDirection : '' // submit both sort column and direction or neither
    };

    return function (dispatch, getState) {

        // the latest data query, to modify and run again if the requested page is not yet in state
        const currentQuery: any = getState().dashboard.currentQuery;
        const updatedQuery: any = currentQuery;

        // update the column header state
        dispatch(<ReduxAction>{
            type: actions.GRID_SORT_BY_COLUMN,
            data: { sortColumn, sortDirection }
        });

        // then re-query for data with the new sort options
        // erasing any previous query results from the store first
        dispatch(queryRequest(pagingHelpers.addPagingSortingParams(updatedQuery, pagingSortingParams), { reset: true }));

    };

};