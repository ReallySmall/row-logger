import initialState from './initialState';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';

import AuthInterface from './interfaces';

export default (state = initialState, action) => {

    switch (action.type) {

        case actions.LOGIN_REQUEST_COMPLETE:

            const { error, payload } = action;

            const userName: string = payload.userName;
            const token: string = payload.token;

            return Object.assign({}, state, <AuthInterface>{
                isLoggedIn: error ? false : true,
                userName: error ? initialState.userName : userName,
                token: token
            });

        case actions.LOGOUT_REQUEST_COMPLETE:

            return Object.assign({}, state, <AuthInterface>{
                isLoggedIn: false,
                userName: undefined,
                token: undefined
            });

        default:
            return <AuthInterface> state;

    }

};