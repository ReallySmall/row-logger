import { appConfig } from '../config';

export const getSessionData = (): object => {

    const sessionObjString: string = sessionStorage.getItem(appConfig.auth.sessionState);

    return sessionObjString ? JSON.parse(sessionObjString) : null;

};

// this is a messaging system which allows the transferal of sessionStorage data from one tab to another
// setting a value in localStorage fires an event in a listener
// which can then parse the event data and copy the keys into the active tab's sessionStorage
// this allows the user to open elements of the app in new tabs without having to re-authenticate
// but when the browser is closed, the session is automatically ended as expected
export const getSessionDataViaLocalStorage = (data: any, callBack: Function): void => {

    const sessionStorageString: string = 'sessionStorage';
    const getSessionStorageString: string = 'getSessionStorage';

    if(!data) {
        // Ask other tabs for session storage
        // the value of the key being set here is arbritary
        // the real purpose is to generate a storage event
        localStorage.setItem(getSessionStorageString, Date.now().toString());
    }

    // listen for storage events
    window.addEventListener('storage', function (event) {

        // a newly opened tab requested the sessionStorage
        if (event.key === getSessionStorageString) {

            // set the sessionStorage data as a localStorage key
            localStorage.setItem(sessionStorageString, JSON.stringify(sessionStorage));
            // then immedeately delete it (the event will still be fired)
            localStorage.removeItem(sessionStorageString);

        // the sessionStorage has been pushed through to this tab
        } else if (event.key === sessionStorageString && !sessionStorage.length) {

            // get the sessionStorage data for the other tab from the event
            const data: object = JSON.parse(event.newValue);

            // and hydrate the session storage for this tab with it
            for (const key in data) {
                sessionStorage.setItem(key, data[key]);
            }

            // then run any supplied callback function
            if (callBack){
                callBack();
            }

        }

    });

};