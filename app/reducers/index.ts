import * as actions from '../constants/actions';
import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth/';
import AuthInterface from './auth/interfaces';
import overview from './overview/';
import OverviewInterface from './overview/interfaces';
import sessions from './sessions/';
import SessionsInterface from './sessions/interfaces';
import session from './session/';
import SessionInterface from './session/interfaces';
import active from './active/';
import ActiveInterface from './active/interfaces';
import loading from './loading/';
import LoadingInterface from './loading/interfaces';
import error from './error/';
import ErrorInterface from './error/interfaces';
import { appConfig } from '../config';

export interface RootState {
    auth: AuthInterface;
    overview: OverviewInterface;
    sessions: SessionsInterface;
    session: SessionInterface;
    active: ActiveInterface;
    loading: LoadingInterface;
    error: ErrorInterface;
    form: any;
}

// reducers to pass an action through to update state
const appReducer = combineReducers<RootState>({
    overview,
    sessions,
    auth,
    session,
    active,
    form: formReducer,
    loading,
    error
});

export const rootReducer = (state, action) => {

    if (action.type === actions.LOGOUT_REQUEST) {
        // first delete the authenication data in session storage
        sessionStorage.removeItem(appConfig.auth.sessionState);
        // then set state reference to undefined
        // when this is then passed through the reducers, each will fall back to its default arguments
        // which resets the app to its initial state
        state = undefined;
    }

    return appReducer(state, action); // pass current state and latest action through the reducers

};