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

// notify of successful registration
const registerRequestComplete = (userName: string, error: Error): ReduxAction => {

    return {
        type: actions.REGISTER_REQUEST_COMPLETE,
        payload: error ? error : userName,
        error: error ? true : false
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

// attempt to login
export const registerRequest = (data: AppFormValues): Function => {

    return (dispatch) => {

        const { userName, email, password, confirmPassword } = data;
        const registerApi: string = appConfig.apis.register;
        const csrf: string = window[appConfig.windowGlobalAppConfig][appConfig.csrf];

        const fetchOpts: FetchOptions = {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: `userName=${userName}&email=${email}&password=${password}&confirmPassword=${confirmPassword}`
        };

        dispatch(<ReduxAction>{ // notify store of login request
            type: actions.REGISTER_REQUEST,
            payload: appConfig.auth.messages.loginMessage
        });

        fetch(registerApi, fetchOpts).then(response => {

            // handle any response errors
            if (!response.ok) {
                throw new Error(response.statusText || 'Error registering. Please try again.');
            }

            response.json().then(registerData => {

                const decodedRegisterData: JwtTokenDecoded = registerData ? jwtDecode(registerData.token) : null; // decode it if it exists
                const userName: string = decodedRegisterData.userName; // decode the JWT and get the user's roles

                if (decodedRegisterData && userName) {

                    // save the JWT to session storage so app state can rehydrate after a page reload
                    sessionStorage.setItem(appConfig.auth.sessionState, registerData.token);

                    // notify store of successful login, with user details
                    dispatch(registerRequestComplete(userName, null));
                    dispatch(wsConnect(true));

                } else {

                    throw new Error('Error registering. Please try again.');

                }

            });

        }).catch(error => dispatch(registerRequestComplete(null, error)));

    };

};

// attempt to login
export const logInRequest = (data: AppFormValues): Function => {

    return (dispatch) => {

        const { email, password } = data;
        const loginApi: string = appConfig.apis.login;
        const csrf: string = window[appConfig.windowGlobalAppConfig][appConfig.csrf];

        const fetchOpts: FetchOptions = {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: `email=${email}&password=${password}`
        };

        dispatch(<ReduxAction>{ // notify store of login request
            type: actions.LOGIN_REQUEST,
            payload: appConfig.auth.messages.loginMessage
        });

        fetch(loginApi, fetchOpts).then(response => {

            // handle any response errors
            if (!response.ok) {
                throw new Error(response.statusText || 'Error logging in. Please try again.');
            }

            response.json().then(loginData => {

                const decodedLoginData: JwtTokenDecoded = loginData ? jwtDecode(loginData.token) : null; // decode it if it exists
                const userName: string = decodedLoginData.userName; // decode the JWT and get the user's name

                if (decodedLoginData && userName) {

                    // save the JWT to session storage so app state can rehydrate after a page reload
                    sessionStorage.setItem(appConfig.auth.sessionState, loginData.token);

                    // notify store of successful login, with user details
                    dispatch(logInRequestComplete(userName, null));
                    dispatch(wsConnect(true));

                } else {

                    throw new Error('Error logging in. Please try again.');

                }

            });

        }).catch(error => dispatch(logInRequestComplete(null, error)));

    };

};

// attempt to restore authentication from an existing JWT in session storage
// e.g. when refreshing the page
export const logInRequestWithJWT = (): Function => {

    return (dispatch) => {

        const loginData: string = sessionStorage.getItem(appConfig.auth.sessionState); // look for a JWT in session storage
        const decodedLoginData: JwtTokenDecoded = loginData ? jwtDecode(loginData) : null; // and decode it if it exists
        const now: Date = new Date(); // get the current date and time

        let userName: string = undefined; // user name
        let jwtExpiryDate: Date = undefined; // date to hold expiry date and time of JWT

        dispatch(<ReduxAction>{ // notify store of login request
            type: actions.LOGIN_WITH_JWT_REQUEST,
            payload: appConfig.auth.messages.loginMessage
        });

        if (decodedLoginData) { // if a JWT exists
            userName = decodedLoginData.userName; // get the user's roles
            //jwtExpiryDate = new Date(decodedLoginData.exp * 1000); // get the expiry date and time of the JWT
        }

        // if the JWT holds at least one user role and has not expired
        if (userName) {

            dispatch(<ReduxAction>{ // notify store of successful JWT login
                type: actions.LOGIN_WITH_JWT_REQUEST_COMPLETE,
                payload: userName
            });

            dispatch(wsConnect(true));

        // otherwise JWT either doesn't exist, has expired, or doesn't contain the requisite information
        } else {

            sessionStorage.removeItem(appConfig.auth.sessionState); // delete the JWT from session storage (if it exists)

            dispatch(<ReduxAction>{ // notify store that JWT automatic login attempt failed
                type: actions.LOGIN_WITH_JWT_REQUEST_COMPLETE,
                payload: 'JWT auto-login failed',
                error: true
            });

        }

    };

};

// logout
export const logOutRequest = (data?: string): Function => {

    return (dispatch) => dispatch({
        type: actions.LOGOUT_REQUEST,
        data: data
    });

};