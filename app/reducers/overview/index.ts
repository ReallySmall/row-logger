import initialState from './initialState';
import * as clone from 'clone';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import DashboardOverviewInterface from './interfaces';

export default <DetailsStoreState>(state = initialState, action) => {

    switch (action.type) {

        case actions.SESSION_TOTALS_REQUEST_COMPLETE:

            return Object.assign({}, state, <DashboardOverviewInterface>{
                totals: action.error ? state.totals : action.payload
            });

        case actions.SESSIONS_RECENT_REQUEST_COMPLETE:

            return Object.assign({}, state, <DashboardOverviewInterface>{
                recentSessions: action.error ? state.totals : action.payload.data
            });

        default:
            return <DashboardOverviewInterface> state;

    }

};