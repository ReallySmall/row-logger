// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as actions from '../../constants/actions';
import * as auth from './../auth';
import * as moment from 'moment';
import { appConfig } from '../../config';
import { fetchHelpers } from '../../helpers';

const queryRequestSuccess = (data: FormDataNormalised): ReduxAction => {
    return {
        type: actions.QUERY_REQUEST_SUCCESS,
        data: data
    };
};

const queryRequestError = (error: FetchError): ReduxAction => {
    return {
        type: actions.QUERY_REQUEST_ERROR,
        data: fetchHelpers.getErrorMessageString(error)
    };
};

export const queryReset = (): ReduxAction => {
    return {
        type: actions.QUERY_RESET
    };
};

export const queryRequest = (data: QueryParams, options?: QueryOptions): Function => {

    return (dispatch, getState) => {

        const { formType, status, fromDate, toDate, formSearch, openingCode, submitNumber, submitYear, closingCode, pageNumber, pageSize, sortColumn, sortDirection } = data;

        const sessionData: string = sessionStorage.getItem(appConfig.auth.sessionState);
        const queryApi: string = window[appConfig.windowGlobalAppConfig][appConfig.apiRoot] + appConfig.apis.formSubmissions;
        const keyField: string = appConfig.data.keyField;
        const dateFormat: string = appConfig.dateFormats.submissionDateTime;
        const fetchOpts: FetchOptions = fetchHelpers.setPostFetchOpts(sessionData);

        let queryString: string = queryApi;

        fetchOpts.body = formType ? JSON.stringify(formType) : ''; // set the form types in the fetch body

        // if form types passed in, this is a standard search
        if (formType) {

            queryString += '?status=' + (status ? status : '');
            queryString += '&fromDate=' + (fromDate ? moment(fromDate).format(dateFormat) : '');
            queryString += '&toDate=' + (toDate ? moment(toDate).format(dateFormat) : '');
            queryString += '&formSearch=' + (formSearch ? formSearch : '');

        // otherwise it's a search by form reference
        } else {

            queryString += '?openingCode=' + (openingCode ? openingCode : '');
            queryString += '&submitNumber=' + (submitNumber ? submitNumber : '');
            queryString += '&submitYear=' + (submitYear ? submitYear : '');
            queryString += '&closingCode=' + (closingCode ? closingCode : '');

        }

        // add paging and sorting params
        queryString += '&pageNumber=' + pageNumber;
        queryString += '&pageSize=' + pageSize;
        queryString += '&sortColumn=' + sortColumn;
        queryString += '&sortDirection=' + sortDirection;

        if (!sessionData) {

            dispatch(auth.logOutRequest(appConfig.auth.messages.notAuthenticated));

        } else {

            // if the last query result is not going to be re-used
            // clear the data from the store
            if (options && options.reset) {
                dispatch(<ReduxAction>{
                    type: actions.QUERY_RESET
                });
            }

            // notify store that a new query is being made
            dispatch(<ReduxAction>{
                type: actions.QUERY_REQUEST,
                data: data,
                message: 'Fetching data'
            });

            fetch(queryString, fetchOpts).then(response => {

                if (!response.ok) {
                    fetchHelpers.handleFetchResponseError(response, dispatch, queryRequestError, auth.logOutRequest);
                    return;
                }

                response.text().then(data => {

                    try {

                        const resultData: APIResponse = JSON.parse(data);

                        if (!resultData.isError) {

                            const { allItemsSelected } = getState().dashboard; // whether all items are currently in selected mode
                            const { overallCount, pageNumber } = resultData;

                            // returned data is easier to manipulate in app state if normalised
                            const normalisedData: FormDataNormalised = {
                                items: {},
                                ids: [],
                                overallCount: overallCount,
                                pageNumber: pageNumber,
                                stayOnCurrentPage: options && options.stayOnCurrentPage ? true : false
                            };

                            // rebuild returned array into nested objects
                            // with an associated array of ids
                            resultData.items.forEach(datum => {
                                normalisedData.items[datum[keyField]] = datum;
                                normalisedData.ids.push(datum[keyField]);
                            });

                            // send data to store
                            dispatch(queryRequestSuccess(normalisedData));

                        } else {

                            dispatch(queryRequestError(resultData.messageText || resultData.messageText));

                        }

                    } catch (error) {

                        dispatch(queryRequestError(error));

                    }

                }).catch(error => dispatch(queryRequestError(error)));

            }).catch(error => dispatch(queryRequestError(error)));

        }

    };

};

export const setActiveQueryTabIndex = (index: number): ReduxAction => {
    return {
        type: actions.QUERY_ACTIVE_TAB_CHANGE,
        data: index
    };
};