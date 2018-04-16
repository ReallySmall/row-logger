// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as jwtDecode from 'jwt-decode';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import { fetchHelpers, storageHelpers } from '../../helpers';

// notify of successful login
const ws = (): ReduxAction => {
    return {
      type: 'WEBSOCKET_CONNECT',
      payload: {
        url: 'ws://192.168.1.64:8080/api/socket'
      }
    };
};

// notify of successful login
const logInRequestSuccess = (data: UserDataRoleArray): ReduxAction => {
    return {
        type: actions.LOGIN_REQUEST_SUCCESS,
        data: data
    };
};

// notify of error in login
const logInRequestError = (error: FetchError): ReduxAction => {
    return {
        type: actions.LOGIN_REQUEST_ERROR,
        data: fetchHelpers.getErrorMessageString(error)
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
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-TOKEN': csrf
            }),
            body: `email=${email}&password=${password}&_csrf=${csrf}`
        };

        dispatch(<ReduxAction>{ // notify store of login request
            type: actions.LOGIN_REQUEST,
            data: appConfig.auth.messages.loginMessage
        });

        fetch(loginApi, fetchOpts).then(response => {

            // handle any response errors
            if (!response.ok) {
                response.json().then(data => dispatch(logInRequestError(data)));
                return;
            }

            response.text().then(data => {

                try {

                    const loginData: JwtToken = JSON.parse(data);
                    const decodedLoginData: JwtTokenDecoded = loginData ? jwtDecode(loginData.token) : null; // decode it if it exists
                    const userRoles: UserDataRoleArray = ['admin']; // decode the JWT and get the user's roles

                    if (decodedLoginData && userRoles.length) {

                        // save the JWT to session storage so app state can rehydrate after a page reload
                        sessionStorage.setItem(appConfig.auth.sessionState, loginData.token);

                        // notify store of successful login, with user details
                        dispatch(logInRequestSuccess(userRoles));
                        dispatch(ws());

                    } else {

                        dispatch(logInRequestError('Error logging in. Please try again.'));

                    }

                } catch (error) {

                    dispatch(logInRequestError(error));

                }

            }).catch(error => dispatch(logInRequestError(error)));

        }).catch(error => dispatch(logInRequestError(error)));

    };

};

// attempt to restore authentication from an existing JWT in session storage
// e.g. when refreshing the page
export const logInRequestWithJWT = (): Function => {

    return (dispatch) => {

        const loginData: string = sessionStorage.getItem(appConfig.auth.sessionState); // look for a JWT in session storage
        const decodedLoginData: JwtTokenDecoded = loginData ? jwtDecode(loginData) : null; // and decode it if it exists
        const now: Date = new Date(); // get the current date and time

        let userRoles: UserDataRoleArray = []; // array to hold user roles
        let jwtExpiryDate: Date = undefined; // date to hold expiry date and time of JWT

        dispatch(<ReduxAction>{ // notify store of login request
            type: actions.LOGIN_WITH_JWT_REQUEST,
            data: appConfig.auth.messages.loginMessage
        });

        if (decodedLoginData) { // if a JWT exists
            userRoles = decodedLoginData.role; // get the user's roles
            //jwtExpiryDate = new Date(decodedLoginData.exp * 1000); // get the expiry date and time of the JWT
        }

        // if the JWT holds at least one user role and has not expired
        if (userRoles.length) {

            dispatch(<ReduxAction>{ // notify store of successful JWT login
                type: actions.LOGIN_WITH_JWT_REQUEST_SUCCESS,
                data: userRoles
            });
            dispatch(ws());

        // otherwise JWT either doesn't exist, has expired, or doesn't contain the requisite information
        } else {

            sessionStorage.removeItem(appConfig.auth.sessionState); // delete the JWT from session storage (if it exists)

            dispatch(<ReduxAction>{ // notify store that JWT automatic login attempt failed
                type: actions.LOGIN_WITH_JWT_REQUEST_FAILURE
            });

        }

    };

};

// attempt to logout
export const logOutRequest = (data?: string): Function => {

    return (dispatch) => dispatch({
        type: actions.LOGOUT_REQUEST,
        data: data
    });

};