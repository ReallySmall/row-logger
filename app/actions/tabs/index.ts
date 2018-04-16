// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as actions from '../../constants/actions';
import * as auth from './../auth';
import { appConfig } from '../../config';

export const tabChange = (index: number): Function => {

    return (dispatch) => {

        dispatch(<ReduxAction>{
            type: actions.DASHBOARD_TAB_CHANGE,
            data: index
        });

    };

};