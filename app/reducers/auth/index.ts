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

        case actions.REGISTER_REQUEST_COMPLETE:

            return Object.assign({}, state, <AuthInterface>{
                isLoggedIn: action.error ? false : true,
                userName: action.error ? initialState.userName : action.payload
            });

        case actions.LOGIN_REQUEST_COMPLETE:

            return Object.assign({}, state, <AuthInterface>{
                isLoggedIn: action.error ? false : true,
                userName: action.error ? initialState.userName : action.payload
            });

        case actions.LOGIN_WITH_JWT_REQUEST_COMPLETE:

            return Object.assign({}, state, <AuthInterface>{
                isLoggedIn: action.error ? false : true,
                userName: action.error ? state.userName : action.payload
            });

        case actions.ACCOUNT_DETAILS_REQUEST_COMPLETE:

            return Object.assign({}, state, <AuthInterface>{
                userName: action.error ? state.userName : action.payload.userName,
                email: action.error ? state.email : action.payload.email,
                rowerType: action.error ? state.rowerType : action.payload.rowerType,
                rowerDamping: action.error ? state.rowerDamping : action.payload.rowerDamping
            });

        case actions.ACCOUNT_DETAILS_UPDATE_REQUEST_COMPLETE:

            return Object.assign({}, state, <AuthInterface>{
                userName: action.error ? state.userName : action.payload.userName,
                email: action.error ? state.email : action.payload.email,
                rowerType: action.error ? state.rowerType : action.payload.rowerType,
                rowerDamping: action.error ? state.rowerDamping : action.payload.rowerDamping
            });

        case actions.LOGOUT_REQUEST:

            return state;

        default:
            return <AuthInterface> state;

    }

};