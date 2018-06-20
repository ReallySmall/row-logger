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
export const getErrorMessageString = (error: Error): string => {

    if(!error){
        return undefined;
    }

    let message: string = error.message || 'Unexpected error.';

    message = message === 'Failed to fetch' ? 'Server error or couldn\'t connect.' : message;

    return message;

};

// returns a default options object to use for GET requests
export const setGetFetchOpts = (jwt?: string): FetchOptions => {

    const fetchOpts: FetchOptions = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };

    if(jwt){
        fetchOpts.headers.append('Authorization', 'Bearer ' + jwt);
    }

    return fetchOpts;

};

// returns a default options object to use for POST requests
export const setPostFetchOpts = (jwt?: string): FetchOptions => {

    const fetchOpts: FetchOptions = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };

    if(jwt){
        fetchOpts.headers.append('Authorization', 'Bearer ' + jwt);
    }

    return fetchOpts;

};

// returns a default options object to use for form POST requests
export const setFormPostFetchOpts = (formData: AppFormValues, jwt?: string): FetchOptions => {

    const fetchOpts: FetchOptions = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };

    if(jwt){
        fetchOpts.headers.append('Authorization', 'Bearer ' + jwt);
    }

    let formBody: string = '';

    Object.keys(formData).map(key => {
        formBody += `${key}=${formData[key]}&`;
    });

    fetchOpts.body = formBody;

    return fetchOpts;

};