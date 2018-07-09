const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

import { RowingData } from '../models/RowingData';
import { User } from '../models/User';
import { RowerTypes } from '../models/RowerTypes';
import { RowingDataRecorder } from '../helpers/rowingDataRecorder';
import * as dateTimeHelpers from '../helpers/dateTimeHelper';
import * as rowingDataHelpers from '../helpers/rowingDataHelper';
import * as wsHelpers from '../helpers/wsHelper';
import * as actions from '../constants/actions';

const uuidv4 = require('uuid/v4');

const rowingDataRecorder = new RowingDataRecorder();
const activeSessions = {};

const heartBeat = (ws, req) => {

  if(activeSessions[req.user]){

    const { connectionId } = ws;

    if(activeSessions[req.user].clients[connectionId]){

      activeSessions[req.user].clients[connectionId].isAlive = true;

    }

  }

};

/**
 * WEBSOCKET /
 * handle creation of new rowing data.
 */
export const recordSession = (ws, req) => {

  // on socket connect add some extra properties to the connection
  ws.connectionId = uuidv4(); // a unique socket id
  ws.isAlive = true; // a flag to track whether the socket is still connected

  // client gets n milliseconds to send a valid authentication message before being automatically disconnected
  const authenticationWindow = setTimeout(() => {

    if(req && !req.user && ws) ws.terminate();

  }, 5000);

  // ping pong the connection every n seconds to check it's still alive
  const pingPongConnectionCheck = setInterval(() => {

    if(activeSessions[req.user]) {

      const disconnectedClients: Array<any> = [];
      const connectedClientsCount: number = Object.keys(activeSessions[req.user].clients).length;

      // loop through each of the clients for the user
      Object.keys(activeSessions[req.user].clients).forEach((clientId, index) => {

        const client: any = activeSessions[req.user].clients[clientId];

        // if the client connection is dead
        if(!client.isAlive){

          delete activeSessions[req.user].clients[clientId]; // delete this connection from the clients list

          disconnectedClients.push({
            connectionId: client.connectionId,
            isLogger: client.isLogger
          }); // and push metadata to a seperate array to deal with afterwards

          return;

        }

        // otherwise set isAlive to false and ping the connection again
        // on successful pong, heartBeat() will reset isAlive to true
        // before this function runs again
        client.isAlive = false;
        client.ping(() => {});

      });

      if(disconnectedClients.length){

        console.log(`There are ${disconnectedClients.length} disconnected clients`);

        // message the remaining clients with details on which clients disconnected
        Object.keys(activeSessions[req.user].clients).forEach((clientId, index) => {

          const client: any = activeSessions[req.user].clients[clientId];

          disconnectedClients.forEach((data, index) => {

            if(data.connectionId !== client.connectionId){

              client.send(wsHelpers.createWsMessage(data.isLogger ? actions.WEBSOCKET_LOGGER_DISCONNECTED: actions.WEBSOCKET_CLIENT_DISCONNECTED, 'A socket disconnected', false), error => wsHelpers.handleWsError(error));

            }

          });

        });

      }

      // if no clients are now connected for this user
      if(connectedClientsCount - disconnectedClients.length < 1){

        // delete the user entry from the parent cache object
        delete activeSessions[req.user];

      }

    }

  }, 5000);

  // called on successful pong reply to a previous ping request
  // heartBeat asserts that this client connection is still alive
  ws.on('pong', () => heartBeat(ws, req));

  // on socket close
  ws.on('close', () => {

    clearTimeout(authenticationWindow);

    if(activeSessions[req.user]){

      let connectedClients: number = 0;

      Object.keys(activeSessions[req.user].clients).forEach((clientId, index) => {

        const client: any = activeSessions[req.user].clients[clientId];

        client.send(wsHelpers.createWsMessage(ws.isLogger ? actions.WEBSOCKET_LOGGER_DISCONNECTED : actions.WEBSOCKET_CLIENT_DISCONNECTED, 'A socket disconnected', false), error => wsHelpers.handleWsError(error));

        console.log(ws.isLogger ? 'Logger disconnected' : 'Client connected');

        // if this is the client that closed
        if(client.connectionId === ws.connectionId){

          // delete it from the cache
          delete activeSessions[req.user].clients[clientId];

        } else {

          // otherwise increment the number of connected clients
          connectedClients++;

        }

      });

      // if no clients are now connected for this user
      if(!connectedClients){

        // delete the user entry from the parent cache object
        delete activeSessions[req.user];

      }

    }

  });

  // on socket message
  ws.on('message', messageJSON => {

    // attempt to parse JSON into valid ws message object
    const message: any = wsHelpers.parseWsMessage(messageJSON);

    if(!message){

      ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid JSON or incorrect structure in message', true), error => wsHelpers.handleWsError(error));
      ws.terminate(); // close the socket

      return;

    }

    if(!req.user){ // first client message must be a valid JWT

      console.log('authenticating');

      jwt.verify(message.payload, process.env.JWT_TOKEN_SECRET, (error, token) => {

        if(error){ // if JWT auth fails

          console.log('jwt error', error);

          ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid token', true), error => wsHelpers.handleWsError(error));
          ws.terminate(); // close the socket

          return;

        }

        req.user = token.user; // otherwise flag the socket as authenticated
        ws.isLogger = token.isLogger; // is this a logging client?

        // get the existing active session for this user, or create one if it doesn't exist
        if(!activeSessions[req.user]){

          activeSessions[req.user] = {
            clients: {}
          };

        }

        // broadcast successful client authentication to all user's clients
        Object.keys(activeSessions[req.user].clients).forEach((clientId, index) => {

          const client: any = activeSessions[req.user].clients[clientId];

          client.send(wsHelpers.createWsMessage(actions.WEBSOCKET_CLIENT_CONNECTED, 'A socket connected and authenticated', false), error => wsHelpers.handleWsError(error));

          if(ws.isLogger){

              client.send(wsHelpers.createWsMessage(actions.WEBSOCKET_LOGGER_CONNECTED, 'Logger connection state updated', false), error => wsHelpers.handleWsError(error));

              console.log(`Client is logger: ${ws.isLogger}`);

          }

        });

        activeSessions[req.user].clients[ws.connectionId] = ws; // update the global object with the new active session for this user

        console.log(`User session contains ${Object.keys(activeSessions[req.user].clients).length} active clients`);

      });

    } else {

      console.log('Recieved message: ', message);

      // attempt to extract variables from message
      const { base, data } = JSON.parse(message.payload);

      // if data array exists
      // create new array with each time added to base time to get full timestamps
      const times: Array<number> = data && data.length ? data.map(datum => parseInt(base, 10) + parseInt(datum, 10)) : [];

      // clear any existing timeout
      rowingDataRecorder.cancelSaveTimeOut(req.user);

      // if an active rowing session doesn't exist yet for this user
      if(!rowingDataRecorder.sessionExists(req.user)){

        // look for a matching user
        User.findById(req.user, (error, user) => {

          // if error or no matching user
          if(error || !user){

            // close the socket
            ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), error => wsHelpers.handleWsError(error));
            ws.terminate();

            return;

          }

          const damping: number = user.rowingRowerDamping;
          const rowerType: string = user.rowingRowerType;
          const { constant, multi } = RowerTypes[rowerType];

          // if all required params exist
          if(damping && base && constant && multi){

            rowingDataRecorder.createSession(req.user, user._id, rowerType, damping, multi, times); // create a new recording session
            rowingDataRecorder.timeOutThenSave(req.user); // set up the timeout before session save

          // otherwise close the socket
          } else {

            ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), error => wsHelpers.handleWsError(error));
            ws.terminate();
            return;

          }

        });

      // if an active rowing session already exists for this user
      } else {

        // append new times to existing times
        rowingDataRecorder.addDataToSession(req.user, times);
        rowingDataRecorder.timeOutThenSave(req.user);

      }

      // update all user's connected clients
      if(activeSessions[req.user] && activeSessions[req.user].clients){

        Object.keys(activeSessions[req.user].clients).forEach((clientId, index) => {

          const client: any = activeSessions[req.user].clients[clientId];

          client.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, times, false), error => wsHelpers.handleWsError(error));

        });

      }

    }

  });

};