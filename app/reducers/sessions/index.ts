import initialState from './initialState';
import * as clone from 'clone';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import DashboardSessionsInterface from './interfaces';

export default <DetailsStoreState>(state = initialState, action) => {

    switch (action.type) {

        case actions.SESSIONS_REQUEST_COMPLETE:

            return Object.assign({}, state, <DashboardSessionsInterface>{
                sessions: action.error ? state.sessions : action.payload
            });

        default:
            return <DashboardSessionsInterface> state;

    }

};