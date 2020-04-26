import { RowingData } from '../models/RowingData';
import { User } from '../models/User';
import { RowerTypes } from '../models/RowerTypes';
import { WSSessionManager } from '../helpers/wsSessionManager';
import * as dateTimeHelpers from '../helpers/dateTimeHelper';
import * as rowingDataHelpers from '../helpers/rowingDataHelper';
import * as wsHelpers from '../helpers/wsHelper';
import * as actions from '../constants/actions';

const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const activeSessions = {};

/**
 * WEBSOCKET /
 * handle creation of new rowing data.
 */
export const recordSession = (ws: WebSocketClient, req: any) => {

  ws.connectionId = uuidv4(); // a unique socket id
  ws.isAlive = true; // a flag to track whether the socket is still connected

  // client gets n milliseconds to send a valid authentication message before being automatically disconnected
  const authenticationWindow = setTimeout(() => {

    !req.user && ws.terminate();

  }, 10000);

  // ping pong the connection every n seconds to check it's still alive
  const clientConnectionCheck = setInterval(() => {

    // if the client disconnected
    if(!ws.isAlive || ws.readyState !== 1){

        ws.terminate(); // delete this connection from the clients list
        activeSessions[req.user] && activeSessions[req.user].removeClient(ws);
        activeSessions[req.user] && activeSessions[req.user].broadcastLoggerConnectionState();
        clearInterval(clientConnectionCheck);
        console.log('client has disconnected');

        return;

    }

    ws.isAlive = false;
    ws.ping((error) => console.log(error));
    activeSessions[req.user] && activeSessions[req.user].broadcastLoggerConnectionState();

  }, 5000);

  // called on successful pong reply to a previous ping request
  // heartBeat asserts that this client connection is still alive
  ws.on('pong', () => {

    ws.isAlive = true;

  });

  // on socket close
  ws.on('close', () => {

    clearTimeout(authenticationWindow);
    activeSessions[req.user] && activeSessions[req.user].removeClient(ws);
    console.log('close');

  });

  // on socket message
  ws.on('message', (messageJSON: string) => {

    console.log(messageJSON);

    // attempt to parse JSON into valid ws message object
    const message: any = wsHelpers.parseWsMessage(messageJSON);

    if(!message){

      ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid JSON or incorrect structure in message', true), error => wsHelpers.handleWsError(error));
      ws.terminate(); // close the socket
      activeSessions[req.user] && activeSessions[req.user].removeClient(ws);
      console.log('!message');

      return;

    }

    if(!req.user){ // first client message must be a valid JWT

      console.log('Authenticating');

      jwt.verify(message.payload, process.env.JWT_TOKEN_SECRET, (error, token) => {

        if(error){ // if JWT auth fails

          console.log('JWT error', error);

          ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid token', true), error => wsHelpers.handleWsError(error));
          ws.terminate(); // close the socket
          activeSessions[req.user] && activeSessions[req.user].removeClient(ws);

          return;

        }

        req.user = token.user; // otherwise flag the socket as authenticated
        ws.isLogger = Boolean(token.isLogger); // is this a logging client?

        // get the existing active session for this user, or create one if it doesn't exist
        if(!activeSessions[req.user]){

          activeSessions[req.user] = new WSSessionManager(req.user);

        }

        // add this ws to the client list
        activeSessions[req.user] && activeSessions[req.user].addClient(ws);

        // on notification event that all clients for a user are disconnected
        // delete the user entry from the parent cache object
        activeSessions[req.user] && activeSessions[req.user].on(actions.NO_WEBSOCKET_CLIENTS, () => {

          delete activeSessions[req.user];
          console.log('no clients');

        });

        console.log('Authenticated');

      });

      return;

    }

    console.log('Recieved message from client: ', message);

    // attempt to extract variables from message
    const { data } = message.payload;

    ws.base = message.payload.base as number;

    // if data array exists
    // create new array with each time added to base time to get full timestamps
    const times: Array<number> = data && data.length ? data.map(datum => ws.base + parseInt(datum, 10)) : [];

    // if an active rowing session doesn't exist yet for this user
    if(activeSessions[req.user] && !activeSessions[req.user].dataSet){

      // look for a matching user
      User.findById(req.user, (error, user) => {

        // if error or no matching user
        if(error || !user){

          // close the socket
          ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), error => wsHelpers.handleWsError(error));
          ws.terminate();
          activeSessions[req.user] && activeSessions[req.user].removeClient(ws);

          return;

        }

        ws.damping = user.rowingRowerDamping as number;
        ws.rowerType = user.rowingRowerType as string;
        ws.constant = RowerTypes[ws.rowerType].constant as number;
        ws.multi = RowerTypes[ws.rowerType].multi as number;

        // if all required params exist
        if(ws.damping && ws.base && ws.constant && ws.multi && activeSessions[req.user]){

          ws.recordingSessionId = new uuidv4();

          activeSessions[req.user].createDataSet(ws.rowerType, ws.damping, ws.multi, times); // create a new recording session
          activeSessions[req.user].saveDataSet(); // set up the timeout before session save

          console.log('created new dataset');

        // otherwise close the socket
        } else {

          ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), error => wsHelpers.handleWsError(error));
          ws.terminate();
          activeSessions[req.user] && activeSessions[req.user].removeClient(ws);

          return;

        }

      });

    // if an active rowing session already exists for this user
    } else {

      // append new times to existing times
      activeSessions[req.user] && activeSessions[req.user].addToDataSet(times);
      activeSessions[req.user] && activeSessions[req.user].saveDataSet();

      console.log('updated dataset');

    }

    // update all user's other connected clients
    activeSessions[req.user] && activeSessions[req.user].broadcastData({
      id: ws.recordingSessionId,
      times: times,
      multi: ws.multi,
      constant: ws.constant
    } as WebsocketClientMessage, ws);

  });

};