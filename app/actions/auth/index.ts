// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as jwtDecode from 'jwt-decode';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import { fetchHelpers, storageHelpers } from '../../helpers';

// notify of successful login
const wsConnect = (connect: boolean): ReduxAction => {

    return {
        type: connect ? actions.WEBSOCKET_CONNECT: actions.WEBSOCKET_DISCONNECT,
        payload: {
            url: appConfig.apis.ws
        },
        error: false
    };

};

// notify of successful login
const logInRequestComplete = (userName: string, error: Error): ReduxAction => {

    return {
        type: actions.LOGIN_REQUEST_COMPLETE,
        payload: error ? error : userName,
        error: error ? true : false
    };

};
