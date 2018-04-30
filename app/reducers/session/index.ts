import initialState from './initialState';
import * as clone from 'clone';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import SessionInterface from './interfaces';

export default <SessionStoreState>(state = initialState, action) => {

    switch (action.type) {

        case actions.SESSION_REQUEST_COMPLETE:

            const data = clone(state.data);

            if (action.payload[appConfig.data.keyField]) {
                data[action.payload[appConfig.data.keyField]] = action.payload;
            }

            return Object.assign({}, state, <SessionInterface>{
                data: data
            });

        default:
            return <SessionInterface> state;

    }

};