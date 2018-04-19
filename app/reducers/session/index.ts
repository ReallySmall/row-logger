import initialState from './initialState';
import * as clone from 'clone';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import SesionInterface from './interfaces';

export default <SessionStoreState>(state = initialState, action) => {

    switch (action.type) {

        case actions.SESSION_REQUEST_SUCCESS:

            const newSession = clone(state);

            if (action.data[appConfig.data.keyField]) {
                newSession.data[action.data[appConfig.data.keyField]] = action.data;
            }

            return Object.assign({}, state, <SessionInterface>{
                data: newSession.data
            });

        default:
            return <SessionInterface> state;

    }

};