import initialState from './initialState';
import * as clone from 'clone';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import DashboardSessionsInterface from './interfaces';

export default <DetailsStoreState>(state = initialState, action) => {

    switch (action.type) {

        case actions.SESSIONS_REQUEST:

            return Object.assign({}, state, <DashboardSessionsInterface> {
                processing: action.data
            });

        case actions.SESSIONS_REQUEST_SUCCESS:

            return Object.assign({}, state, <DashboardSessionsInterface>{
                sessions: action.data,
                processing: initialState.processing,
                error: initialState.error
            });

        case actions.SESSIONS_REQUEST_ERROR:

            return Object.assign({}, state, <DashboardSessionsInterface>{
                processing: initialState.processing,
                error: action.data,
            });

        default:
            return <DashboardSessionsInterface> state;

    }

};