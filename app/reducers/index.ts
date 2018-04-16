import * as actions from '../constants/actions';
import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth/';
import AuthInterface from './auth/interfaces';
import dashboard from './dashboard/';
import DashboardInterface from './dashboard/interfaces';
import overview from './overview/';
import DashboardOverviewInterface from './overview/interfaces';
import sessions from './sessions/';
import DashboardSessionsInterface from './sessions/interfaces';
import session from './session/';
import SessionInterface from './session/interfaces';
import { appConfig } from '../config';

export interface RootState {
    auth: AuthInterface;
    overview: DashboardOverviewInterface;
    sessions: DashboardSessionsInterface;
    dashboard: DashboardInterface;
    session: SessionInterface;
    form: any;
}

// reducers to pass an action through to update state
const appReducer = combineReducers<RootState>({
    dashboard,
    overview,
    sessions,
    auth,
    session,
    form: formReducer
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