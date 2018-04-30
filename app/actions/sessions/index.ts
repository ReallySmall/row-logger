// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as actions from '../../constants/actions';
import * as auth from './../auth';
import { appConfig } from '../../config';
import { fetchHelpers } from '../../helpers';

const sessionTotalsRequestComplete = (data: object, error: Error): ReduxAction => {
    return {
        type: actions.SESSION_TOTALS_REQUEST_COMPLETE,
        payload: error ? error : data,
        error: error ? true : false
    };
};

const sessionRequestComplete = (data: object, error: Error): ReduxAction => {
    return {
        type: actions.SESSION_REQUEST_COMPLETE,
        payload: error ? error : data,
        error: error ? true : false
    };
};

const sessionsRequestComplete = (data: object, isShowRecent: boolean = false, error: Error): ReduxAction => {
    return {
        type: isShowRecent ? actions.SESSIONS_RECENT_REQUEST_COMPLETE : actions.SESSIONS_REQUEST_COMPLETE,
        payload: error ? error : data,
        error: error ? true : false
    };
};

export const sessionRequest = (id: string): Function => {

    return (dispatch) => {

        const sessionData: string = sessionStorage.getItem(appConfig.auth.sessionState);
        const sessionApi: string = appConfig.apis.session;

        if (!sessionData) {

            dispatch(auth.logOutRequest(appConfig.auth.messages.notAuthenticated));

        } else {

            dispatch(<ReduxAction>{
                type: actions.SESSION_REQUEST,
                data: 'Requesting session'
            });

            fetch(`${sessionApi}?id=${id}`, fetchHelpers.setGetFetchOpts(sessionData)).then(response => {

                if (!response.ok) {
                    fetchHelpers.handleFetchResponseError(response, dispatch, sessionRequestError, auth.logOutRequest);
                    return;
                }

                response.json().then(data => dispatch(sessionRequestComplete(data)));

            }).catch(error => dispatch(sessionRequestComplete(null, error)));

        }

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
                payload: 'Requesting sessions'
            });

            fetch(`${sessionsApi}?limit=${limit}`, fetchHelpers.setGetFetchOpts(sessionData)).then(response => {

                if (!response.ok) {
                    fetchHelpers.handleFetchResponseError(response, dispatch, sessionsRequestError, auth.logOutRequest);
                    return;
                }

                response.json().then(data => {

                    const gridData: GridData = {
                        items: {},
                        ids: []
                    };

                    data.map((datum, index) => {
                        gridData.items[datum.id] = datum;
                        gridData.ids.push(datum.id);
                    });

                    dispatch(sessionsRequestComplete(gridData, showRecent));

                });

            }).catch(error => dispatch(sessionsRequestComplete(null, showRecent, error));

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

                response.json().then(data => {

                    const gridData: GridData = {
                        items: {
                            [data.date]: data
                        },
                        ids: [data.date]
                    };

                    dispatch(sessionTotalsRequestComplete(gridData));

                });

            }).catch(error => dispatch(sessionTotalsRequestComplete(null, error)));

        }

    };

};