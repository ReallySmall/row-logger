// reducers are pure functions which recieve the current state object and an action object
// if the action type has a matching case, the reducer should return a NEW COPY of the state object with required changes applied, rather than mutating the existing state
// if the action matches no cases, the reducer should return the existing state
// if no state object is passed in, the reducer can optionally fall back to using a defined default value for the state

import initialState from './initialState';
import * as actions from '../../constants/actions';
import * as clone from 'clone';
import { pagingHelpers, utilsHelpers } from '../../helpers';
import DashboardInterface from './interfaces';

export default (state, action) => {

    switch (action.type) {

        // Empty any existing data
        case actions.QUERY_RESET:

            return Object.assign({}, state, <DashboardInterface> {
                ids: initialState.ids,
                items: initialState.items,
                pages: initialState.pages,
                pageSize: initialState.pageSize,
                overallCount: initialState.overallCount,
                itemsSelected: initialState.itemsSelected,
                maxSelectableItems: initialState.maxSelectableItems,
                currentQuery: initialState.currentQuery,
                error: initialState.error
            });

        // Just before a new query for data is made
        case actions.QUERY_REQUEST:

            // deep copy the existing fields object
            const newQueryFieldDefaults: any = clone(state.queryFields);

            // then set the values used in the query as the new default values
            Object.keys(action.data).map(function (filterValue, index) {
                if (newQueryFieldDefaults[0].fields[filterValue]) {
                    newQueryFieldDefaults[0].fields[filterValue].value = action.data[filterValue];
                } else if (newQueryFieldDefaults[1].fields[filterValue]){
                    newQueryFieldDefaults[1].fields[filterValue].value = action.data[filterValue];
                }
            });

            return Object.assign({}, state, <DashboardInterface> {
                queryFields: newQueryFieldDefaults,
                processing: action.message,
                currentQuery: action.data, // store the query so it can be re-used if necessary
                error: initialState.error
            });

        // When a new query for data successfully completes
        case actions.QUERY_REQUEST_SUCCESS:

            const newMultipleExportFields: object = clone(state.multipleExportFields);
            const pages: Array<any> = pagingHelpers.updatePageArray(state.pages, action.data.overallCount, state.pageSize, action.data.pageNumber, action.data.ids);

            return Object.assign({}, state, <DashboardInterface>{
                processing: initialState.processing,
                items: Object.assign({}, state.items, action.data.items),
                ids: utilsHelpers.deDupeArray([...state.ids, ...action.data.ids]),
                overallCount: action.data.overallCount,
                pages: pages,
                currentPage: action.data.stayOnCurrentPage ? state.currentPage : action.data.pageNumber,
                multipleExportFields: newMultipleExportFields,
                error: initialState.error
            });

        // if anything went wrong it's probably best to remove any existing data from the state and start again
        // as well as passing down the error
        case actions.QUERY_REQUEST_ERROR:

            return Object.assign({}, state, <DashboardInterface>{
                processing: initialState.processing,
                items: initialState.items,
                ids: initialState.ids,
                pages: initialState.pages,
                error: action.data
            });

        default:
            return state;

    }

};