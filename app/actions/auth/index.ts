// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import { fetchHelpers, storageHelpers } from '../../helpers';

export const wsConnect = (connect: boolean): ReduxAction => {

    return {
        type: connect ? actions.WEBSOCKET_CONNECT: actions.WEBSOCKET_DISCONNECT,
        payload: {
            url: appConfig.apis.ws
        },
        error: false
    };

};

export const logInRequest = (isUser: boolean = false): ReduxAction => {

    return {
        type: actions.LOGIN_REQUEST,
        payload: isUser,
        error: false
    };

};

export const logInRequestComplete = (authData: any, error: Error): ReduxAction => {

    return {
        type: actions.LOGIN_REQUEST_COMPLETE,
        payload: error ? error : authData,
        error: error ? true : false
    };

};

export const logOutRequest = (): ReduxAction => {

    return {
        type: actions.LOGOUT_REQUEST,
        payload: undefined,
        error: false
    };

};

export const logOutRequestComplete = (): ReduxAction => {

    return {
        type: actions.LOGOUT_REQUEST_COMPLETE,
        payload: undefined,
        error: false
    };

};
