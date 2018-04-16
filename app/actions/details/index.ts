// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as actions from '../../constants/actions';
import * as auth from './../auth';
import { appConfig } from '../../config';
import { fetchHelpers } from '../../helpers';

const detailsRequestSuccess = (data: object): ReduxAction => {
    return {
        type: actions.DETAILS_REQUEST_SUCCESS,
        data: data
    };
};

const detailsRequestError = (error: FetchError): ReduxAction => {
    return {
        type: actions.DETAILS_REQUEST_ERROR,
        data: fetchHelpers.getErrorMessageString(error)
    };
};

export const detailsRequest = (id: string): Function => {

    return (dispatch) => {

        const sessionData: string = sessionStorage.getItem(appConfig.auth.sessionState);
        const detailsApi: string = window[appConfig.windowGlobalAppConfig][appConfig.apiRoot] + appConfig.apis.details;
        const keyField: string = appConfig.data.keyField;

        if (!sessionData) {

            dispatch(auth.logOutRequest(appConfig.auth.messages.notAuthenticated));

        } else {

            dispatch(<ReduxAction>{
                type: actions.DETAILS_REQUEST,
                data: 'Requesting detail'
            });

            fetch(`${detailsApi}?${keyField}=${id}`, fetchHelpers.setGetFetchOpts(sessionData)).then(response => {

                if (!response.ok) {
                    fetchHelpers.handleFetchResponseError(response, dispatch, detailsRequestError, auth.logOutRequest);
                    return;
                }

                response.text().then(data => {

                    try {

                        const resultData: APIResponse = JSON.parse(data);

                        if (!resultData.isError) {

                            dispatch(detailsRequestSuccess(resultData));

                        } else {

                            dispatch(detailsRequestError(resultData.messageText || resultData.messageText));

                        }

                    } catch (error) {

                        dispatch(detailsRequestError(error));

                    }

                }).catch(error => dispatch(detailsRequestError(error)));

            }).catch(error => dispatch(detailsRequestError(error)));

        }

    };

};