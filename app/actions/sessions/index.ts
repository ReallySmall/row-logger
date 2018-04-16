// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as actions from '../../constants/actions';
import * as auth from './../auth';
import { appConfig } from '../../config';
import { fetchHelpers } from '../../helpers';

const sessionTotalsRequestSuccess = (data: object): ReduxAction => {
    return {
        type: actions.SESSION_TOTALS_REQUEST_SUCCESS,
        data: data
    };
};

const sessionTotalsRequestError = (error: FetchError): ReduxAction => {
    return {
        type: actions.SESSION_TOTALS_REQUEST_ERROR,
        data: fetchHelpers.getErrorMessageString(error)
    };
};

const sessionsRequestSuccess = (data: object, isShowRecent: boolean = false): ReduxAction => {
    return {
        type: isShowRecent ? actions.SESSIONS_RECENT_REQUEST_SUCCESS : actions.SESSIONS_REQUEST_SUCCESS,
        data: data
    };
};

const sessionsRequestError = (error: FetchError, isShowRecent: boolean = false): ReduxAction => {
    return {
        type: isShowRecent ? actions.SESSIONS_RECENT_REQUEST_ERROR : actions.SESSIONS_REQUEST_ERROR,
        data: fetchHelpers.getErrorMessageString(error)
    };
};

export const sessionsRequest = (query: SessionsQuery): Function => {

    const { showRecent, limit } = query;

    return (dispatch) => {

        const sessionData: string = sessionStorage.getItem(appConfig.auth.sessionState);
        const sessionsApi: string = appConfig.apis.sessions;

        if (!sessionData) {

            dispatch(auth.logOutRequest(appConfig.auth.messages.notAuthenticated));

        } else {

            dispatch(<ReduxAction>{
                type: showRecent ? actions.SESSIONS_RECENT_REQUEST : actions.SESSIONS_REQUEST,
                data: 'Requesting sessions'
            });

            fetch(`${sessionsApi}?limit=${limit}`, fetchHelpers.setGetFetchOpts(sessionData)).then(response => {

                if (!response.ok) {
                    fetchHelpers.handleFetchResponseError(response, dispatch, sessionsRequestError, auth.logOutRequest);
                    return;
                }

                response.text().then(data => {

                    try {

                        const resultData: any = JSON.parse(data);

                        const gridData: GridData = {
                            items: {},
                            ids: []
                        };

                        resultData.map((datum, index) => {
                            gridData.items[datum.date] = datum;
                            gridData.ids.push(datum.date);
                        });

                        dispatch(sessionsRequestSuccess(gridData, showRecent));

                    } catch (error) {

                        dispatch(sessionsRequestError(error, showRecent));

                    }

                });

            }).catch(error => dispatch(sessionsRequestError(error)));

        }

    };

};

export const sessionTotalsRequest = (): Function => {

    return (dispatch) => {

        const sessionData: string = sessionStorage.getItem(appConfig.auth.sessionState);
        const sessionTotalsApi: string = appConfig.apis.sessionTotals;

        if (!sessionData) {

            dispatch(auth.logOutRequest(appConfig.auth.messages.notAuthenticated));

        } else {

            dispatch(<ReduxAction>{
                type: actions.SESSION_TOTALS_REQUEST,
                data: 'Requesting session totals'
            });

            fetch(`${sessionTotalsApi}`, fetchHelpers.setGetFetchOpts(sessionData)).then(response => {

                if (!response.ok) {
                    fetchHelpers.handleFetchResponseError(response, dispatch, sessionsRequestError, auth.logOutRequest);
                    return;
                }

                response.text().then(data => {

                    try {

                        const resultData: any = JSON.parse(data);

                        const gridData: GridData = {
                            items: {
                                [resultData.date]: resultData
                            },
                            ids: [resultData.date]
                        };

                        dispatch(sessionTotalsRequestSuccess(gridData));

                    } catch (error) {

                        dispatch(sessionTotalsRequestError(error));

                    }

                });

            }).catch(error => dispatch(sessionTotalsRequestError(error)));

        }

    };

};