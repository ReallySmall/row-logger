/* eslint-env browser */
import { compose } from 'redux';
import { connecting, open, closed, message } from './actions';
import { createWebsocket } from './websocket';
import { WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_SEND, LOGOUT_REQUEST } from '../../constants/actions';
import { appConfig } from '../../config';

const partial = require('lodash/fp/partial');
const partialRight = require('lodash/fp/partialRight');

const createMiddleware = () => {
  // Hold a reference to the WebSocket instance in use.
  let websocket: ?WebSocket;

  /**
   * A function to create the WebSocket object and attach the standard callbacks
   */
  const initialize = ({ dispatch }, config: Config) => {
    // Instantiate the websocket.
    websocket = createWebsocket(config);

    // Function will dispatch actions returned from action creators.
    const dispatchAction = partial(compose, [dispatch]);
    const jwt: string = sessionStorage.getItem(appConfig.auth.sessionState); // look for a JWT in session storage

    websocket.onopen = () => {

      dispatchAction(open);

      if (websocket && jwt) {

        websocket.send(JSON.stringify({
          type: 'auth',
          payload: jwt,
          error: false
        }));

      } else {

        console.warn('WebSocket is closed or no JWT, ignoring.');

      }

    };

    websocket.onclose = dispatchAction(closed);
    websocket.onmessage = dispatchAction(message);

    // An optimistic callback assignment for WebSocket objects that support this
    const onConnecting = dispatchAction(connecting);
    // Add the websocket as the 2nd argument (after the event).
    websocket.onconnecting = partialRight(onConnecting, [websocket]);
  };

  /**
   * Close the WebSocket connection and cleanup
   */
  const close = () => {
    if (websocket) {
      console.warn(`Closing WebSocket connection to ${websocket.url} ...`);
      websocket.close();
      websocket = null;
    }
  };

  /**
   * The primary Redux middleware function.
   * Each of the actions handled are user-dispatched.
   */
  return (store: Object) => (next: Function) => (action: Action) => {

    switch (action.type) {
      // User request to connect
      case WEBSOCKET_CONNECT:
        close();
        initialize(store, action.payload);
        next(action);
        break;

      // User request to disconnect
      case WEBSOCKET_DISCONNECT:
        close();
        next(action);
        break;

      // User logged out
      case LOGOUT_REQUEST:
        close();
        next(action);
        break;

      // User request to send a message
      case WEBSOCKET_SEND:
        if (websocket) {
          websocket.send(JSON.stringify(action.payload));
        } else {
          console.warn('WebSocket is closed, ignoring. Trigger a WEBSOCKET_CONNECT first.');
        }
        next(action);
        break;

      default:
        next(action);
    }
  };
};

export default createMiddleware();
