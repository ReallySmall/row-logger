import * as actions from '../../constants/actions';
import * as auth from './../auth';
import { appConfig } from '../../config';
import { fetchHelpers } from '../../helpers';

const accountDetailsRequestComplete = (data: object, error: Error): ReduxAction => {
    return {
        type: actions.ACCOUNT_DETAILS_REQUEST_COMPLETE,
        payload: error ? error : data,
        error: error ? true : false
    };
};

const accountDetailsUpdateRequestComplete = (data: object, error: Error): ReduxAction => {
    return {
        type: actions.ACCOUNT_DETAILS_UPDATE_REQUEST_COMPLETE,
        payload: error ? error : data,
        error: error ? true : false
    };
};

export const accountRequest = (): Function => {

    return (dispatch) => {

        const sessionData: string = sessionStorage.getItem(appConfig.auth.sessionState);
        const accountApi: string = appConfig.apis.account;

        if (!sessionData) {

            dispatch(auth.logOutRequest(appConfig.auth.messages.notAuthenticated));

        } else {

            dispatch(<ReduxAction>{
                type: actions.ACCOUNT_DETAILS_REQUEST,
                payload: 'Requesting account details'
            });

            fetch(accountApi, fetchHelpers.setGetFetchOpts(sessionData)).then(response => {

                if (!response.ok) {
                    fetchHelpers.handleFetchResponseError(response, dispatch, accountDetailsRequestComplete, auth.logOutRequest);
                    return;
                }

                response.json().then(data => dispatch(accountDetailsRequestComplete(data, null)));

            }).catch(error => dispatch(accountDetailsRequestComplete(null, error)));

        }

    };

};

export const accountUpdateRequest = (formData: AppFormValues, formName: string): Function => {

    return (dispatch) => {

        const sessionData: string = sessionStorage.getItem(appConfig.auth.sessionState);
        const accountApi: string = appConfig.apis[formName];

        if (!sessionData) {

            dispatch(auth.logOutRequest(appConfig.auth.messages.notAuthenticated));

        } else if(accountApi) {

            dispatch(<ReduxAction>{
                type: actions.ACCOUNT_DETAILS_UPDATE_REQUEST,
                payload: 'Updating account details'
            });

            fetch(accountApi, fetchHelpers.setFormPostFetchOpts(formData, sessionData)).then(response => {

                if (!response.ok) {
                    fetchHelpers.handleFetchResponseError(response, dispatch, accountDetailsUpdateRequestComplete, auth.logOutRequest);
                    return;
                }

                response.json().then(data => dispatch(accountDetailsUpdateRequestComplete(data, null)));

            }).catch(error => dispatch(accountDetailsUpdateRequestComplete(null, error)));

        }

    };

};
