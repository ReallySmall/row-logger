import initialState from './initialState';
import * as clone from 'clone';
import * as actions from '../../constants/actions';
import { appConfig } from '../../config';
import ActiveInterface from './interfaces';

export default <SessionStoreState>(state = initialState, action) => {

    switch (action.type) {

        case actions.WEBSOCKET_CONNECT:

            return Object.assign({}, state, <ActiveInterface>{
                appConnected: true
            });

        case actions.WEBSOCKET_DISCONNECT:

            return Object.assign({}, state, <ActiveInterface>{
                appConnected: false
            });

        case actions.WEBSOCKET_MESSAGE:

            console.log(action.payload);

            return state;

        default:
            return <ActiveInterface> state;

    }

};