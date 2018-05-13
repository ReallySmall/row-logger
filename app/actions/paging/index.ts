import * as actions from '../../constants/actions';

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
        //dispatch(queryRequest(updatedQuery, { reset: false }));

    };

};