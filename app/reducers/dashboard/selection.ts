// reducers are pure functions which recieve the current state object and an action object
// if the action type has a matching case, the reducer should return a NEW COPY of the state object with required changes applied, rather than mutating the existing state
// if the action matches no cases, the reducer should return the existing state
// if no state object is passed in, the reducer can optionally fall back to using a defined default value for the state

import * as clone from 'clone';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import DashboardInterface from './interfaces';

export default (state, action) => {

    const newItemState: object = clone(state.items);

    switch (action.type) {

        // a record was selected in the grid
        case actions.GRID_SELECT_RECORD:

            newItemState[action.data].selected = true;

            return Object.assign({}, state, <DashboardInterface> {
                items: newItemState,
                itemsSelected: state.itemsSelected + 1,
            });

        // a record was deselected in the grid
        case actions.GRID_DESELECT_RECORD:

            newItemState[action.data].selected = false;

            return Object.assign({}, state, <DashboardInterface> {
                items: newItemState,
                itemsSelected: state.itemsSelected - 1,
            });

        default:
            return <DashboardInterface> state;

    }

};