// reducers are pure functions which recieve the current state object and an action object
// if the action type has a matching case, the reducer should return a NEW COPY of the state object with required changes applied, rather than mutating the existing state
// if the action matches no cases, the reducer should return the existing state
// if no state object is passed in, the reducer can optionally fall back to using a defined default value for the state

import initialState from './initialState';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';

import AuthInterface from './interfaces';

export default (state = initialState, action) => {

    switch (action.type) {

        case actions.LOGIN_REQUEST:

            return Object.assign({}, state, <AuthInterface> {
                processing: action.data
            });

        case actions.LOGIN_WITH_JWT_REQUEST:

            return Object.assign({}, state, <AuthInterface> {
                processing: action.data
            });

        case actions.LOGIN_REQUEST_SUCCESS:

            return Object.assign({}, state, <AuthInterface>{
                processing: initialState.processing,
                isLoggedIn: true,
                roles: action.data
            });

        case actions.LOGIN_WITH_JWT_REQUEST_SUCCESS:

            return Object.assign({}, state, <AuthInterface>{
                processing: initialState.processing,
                isLoggedIn: true,
                roles: action.data
            });

        case actions.LOGIN_WITH_JWT_REQUEST_FAILURE:

            return Object.assign({}, state, <AuthInterface>{
                processing: initialState.processing,
                isLoggedIn: false,
                roles: []
            });

        case actions.LOGIN_REQUEST_ERROR:

            return Object.assign({}, state, <AuthInterface>{
                processing: initialState.processing,
                isLoggedIn: false,
                roles: initialState.roles,
                error: action.data
            });

        case actions.LOGOUT_REQUEST:

            return Object.assign({}, state, <AuthInterface> {
                error: action.data
            });

        default:
            return <AuthInterface> state;

    }

};