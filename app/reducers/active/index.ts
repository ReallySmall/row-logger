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

        case actions.WEBSOCKET_CLOSED:

            return Object.assign({}, state, <ActiveInterface>{
                appConnected: false
            });

        case actions.WEBSOCKET_MESSAGE:

            const serverWsAction: any = JSON.parse(action.payload.data);

            console.log(serverWsAction);

            switch(serverWsAction.type){

                case actions.WEBSOCKET_LOGGER_CONNECTED:

                    return Object.assign({}, state, <ActiveInterface>{
                        loggerConnected: true
                    });

                case actions.WEBSOCKET_LOGGER_DISCONNECTED:

                    return Object.assign({}, state, <ActiveInterface>{
                        loggerConnected: false
                    });

            }

        default:
            return <ActiveInterface> state;

    }

};