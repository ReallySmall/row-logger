import { appConfig } from '../config';

// generic handler for fetch errors
export const handleFetchResponseError = (response: any, dispatch: Function, errorAction: Function, logOutAction: Function): void => {

    response
        .json()
        .then(data => {

            dispatch(errorAction(data)); // dispatch the error action

            if (response.status === 401) { // if accessing while unauthorised (JWT probably expired), force logout
                dispatch(logOutAction(appConfig.auth.messages.idleTimeout));
            }

        });

    return;

};

// get an error message string from a passed in error object
export const getErrorMessageString = (error: any): string => {

    let message: string = error.error_description || error.message || error || 'Unexpected error.';

    message = message === 'Failed to fetch' ? 'Server error or couldn\'t connect.' : message;

    return message;

};

// returns a default options object to use for GET requests
export const setGetFetchOpts = (sessionData: string): FetchOptions => {

    const fetchOpts: FetchOptions = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionData
        })
    };

    return fetchOpts;

};

// returns a default options object to use for POST requests
export const setPostFetchOpts = (sessionData: string): FetchOptions => {

    const fetchOpts: FetchOptions = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionData
        })
    };

    return fetchOpts;

};