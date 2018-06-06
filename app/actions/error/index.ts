// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as actions from '../../constants/actions';
import { appConfig } from '../../config';

// clear a named error
export const clearError = (errorName: string): ReduxAction => {

    return {
        type: actions.CLEAR_ERROR,
        payload: errorName,
        error: false
    };

};
