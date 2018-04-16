import initialState from './initialState';
import * as clone from 'clone';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import DashboardOverviewInterface from './interfaces';

export default <DetailsStoreState>(state = initialState, action) => {

    switch (action.type) {

        case actions.SESSION_TOTALS_REQUEST:

            return Object.assign({}, state, <DashboardOverviewInterface> {
                processing: action.data
            });

        case actions.SESSION_TOTALS_REQUEST_SUCCESS:

            return Object.assign({}, state, <DashboardOverviewInterface>{
                totals: action.data,
                processing: initialState.processing,
                error: initialState.error
            });

        case actions.SESSION_TOTALS_REQUEST_ERROR:

            return Object.assign({}, state, <DashboardOverviewInterface>{
                processing: initialState.processing,
                error: action.data,
            });

        case actions.SESSIONS_RECENT_REQUEST:

            return Object.assign({}, state, <DashboardOverviewInterface> {
                processing: action.data
            });

        case actions.SESSIONS_RECENT_REQUEST_SUCCESS:

            return Object.assign({}, state, <DashboardOverviewInterface>{
                recentSessions: action.data,
                processing: initialState.processing,
                error: initialState.error
            });

        case actions.SESSIONS_RECENT_REQUEST_ERROR:

            return Object.assign({}, state, <DashboardOverviewInterface>{
                processing: initialState.processing,
                error: action.data,
            });

        default:
            return <DashboardOverviewInterface> state;

    }

};