// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as actions from '../../constants/actions';
import { queryRequest } from '../../actions/query';

export const changeRecordsPerPage = (requestedpageSize: number): Function => {

    return (dispatch, getState) => {

        // the latest data query, to modify and run again if the requested page is not yet in state
        // and the current page size in the store
        const { currentQuery, pageSize } = getState().dashboard;

        // modify the last query to fetch results with updated page size
        currentQuery.pageSize = requestedpageSize;
        currentQuery.pageNumber = 1;

        // then re-run the query
        dispatch(queryRequest(currentQuery, { reset: true }));
        // and update store with new page size
        dispatch(<ReduxAction>{ type: actions.PAGING_CHANGE_ITEMS_PER_PAGE, data: requestedpageSize });

    };

};

export const changePage = (requestedPageIndex: number): Function => {

    return (dispatch, getState) => {

        // the latest data query, to modify and run again if the requested page is not yet in state
        // and the current pages in the store
        const { currentQuery, pages } = getState().dashboard;
        const updatedQuery: any = currentQuery;

        // if the page already has data
        // just change the active page to this page in the store
        if (pages[requestedPageIndex - 1].length > 0) {
            dispatch(<ReduxAction>{
                type: actions.PAGING_CHANGE_PAGE,
                data: requestedPageIndex
            });
            return;
        }

        // otherwise the page needs to be fetched from the api
        // so modify the current query to fetch this page
        updatedQuery.pageNumber = requestedPageIndex;

        // and then re-run the query to get it
        // not passing true into second parameter
        // as we want to keep the existing page data in our state and add to it
        dispatch(queryRequest(updatedQuery, { reset: false }));

    };

};