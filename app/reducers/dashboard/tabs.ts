// reducers are pure functions which recieve the current state object and an action object
// if the action type has a matching case, the reducer should return a NEW COPY of the state object with required changes applied, rather than mutating the existing state
// if the action matches no cases, the reducer should return the existing state
// if no state object is passed in, the reducer can optionally fall back to using a defined default value for the state

import * as actions from '../../constants/actions';
import DashboardInterface from './interfaces';

export default (state, action) => {

    switch (action.type) {

        case actions.DASHBOARD_TAB_CHANGE:

            return Object.assign({}, state, <DashboardInterface> {
                activeTabIndex: action.data
            });

        default:
            return state;

    }
};