// reducers are pure functions which recieve the current state object and an action object
// if the action type has a matching case, the reducer should return a NEW COPY of the state object with required changes applied, rather than mutating the existing state
// if the action matches no cases, the reducer should return the existing state
// if no state object is passed in, the reducer can optionally fall back to using a defined default value for the state

import * as clone from 'clone';
import { appConfig } from '../../config';
import { utilsHelpers, formsHelpers } from '../../helpers';
import exportRecords from '../../forms/exportRecords';
import * as actions from '../../constants/actions';
import initialState from './initialState';
import DashboardInterface from './interfaces';

export default (state, action) => {

    switch (action.type) {

        case actions.EXPORT_RECORDS_REQUEST:

            return Object.assign({}, state, <DashboardInterface> {
                processing: action.data
            });

        case actions.EXPORT_RECORDS_REQUEST_SUCCESS:

            return Object.assign({}, state, <DashboardInterface>{
                processing: initialState.processing
            });

        case actions.EXPORT_RECORDS_REQUEST_ERROR:

            return Object.assign({}, state, <DashboardInterface>{
                processing: initialState.processing,
                error: action.data
            });

        case actions.EXPORT_RECORDS_CLEAR_REQUEST_ERROR:

            return Object.assign({}, state, <DashboardInterface>{
                error: initialState.error
            });

        default:
            return state;

    }

};