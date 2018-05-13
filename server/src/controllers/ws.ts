const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

import { RowingData } from '../models/RowingData';
import { User } from '../models/User';
import { RowingDataRecorder } from '../helpers/rowingDataRecorder';
import * as dateTimeHelpers from '../helpers/dateTimeHelper';
import * as rowingDataHelpers from '../helpers/rowingDataHelper';
import * as wsHelpers from '../helpers/wsHelper';
import * as actions from '../constants/actions';

const rowingDataRecorder = new RowingDataRecorder();

/**
 * WEBSOCKET /
 * handle creation of new rowing data.
 */
export const recordSession = (ws, req) => {

  // client gets n milliseconds to send a valid authentication message before being disconnected
  const authenticationWindow = setTimeout(() => {
    if(req && !req.user && ws) ws.terminate();
  }, 5000);

  ws.on('close', () => {
    clearTimeout(authenticationWindow);
  });

  ws.on('message', messageJSON => {

    // attempt to parse JSON into valid ws message object
    const message: any = wsHelpers.parseWsMessage(messageJSON);

    if(!message){
      ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid JSON or incorrect structure in message', true), error => wsHelpers.handleWsError(error));
      ws.terminate(); // close the socket
      return;
    }

    if(!req.user){ // first client message must be a valid JWT

      jwt.verify(message.payload, process.env.JWT_TOKEN_SECRET, (error, token) => {

        if(error){ // if JWT auth fails
          ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid token', true), error => wsHelpers.handleWsError(error));
          ws.terminate(); // close the socket
          return;
        }

        req.user = token.user; // otherwise flag the socket as authenticated
        ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_AUTHENTICATED, 'Authenticated', false), error => wsHelpers.handleWsError(error));

      });

    } else {

      console.log('Recieved message: ', message);

      // attempt to extract variables from message
      const { machineId, damping, multi, base, data } = JSON.parse(message.payload);

      // if data array exists
      // create new array with each time added to base time to get full timestamps
      const times = data && data.length ? data.map(datum => parseInt(base, 10) + parseInt(datum, 10)) : [];

      // clear any existing timeout
      rowingDataRecorder.cancelSaveTimeOut(req.user);

      // if an active rowing session doesn't exist yet for this user
      if(!rowingDataRecorder.sessionExists(req.user)){

        console.log(req.user);

        // look for a user with matching API key
        User.findById(req.user, (error, user) => {

          if(error || !user){

            ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), error => wsHelpers.handleWsError(error));
            ws.terminate();
            return;

          }

          // if all required params exist
          if(machineId && damping && multi && base){

            rowingDataRecorder.createSession(req.user, user._id, machineId, damping, multi, times);
            rowingDataRecorder.timeOutThenSave(req.user);

          }

        });

      // if an active rowing session already exists for this user
      } else {

        // append new times to existing times
        rowingDataRecorder.addDataToSession(req.user, times);
        rowingDataRecorder.timeOutThenSave(req.user);

        const currentDistance = rowingDataHelpers.timesToMetres([rowingDataRecorder.getSessionTimes(req.user)], multi, 4.805).toString() + 'm';

        ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, currentDistance, false), error => wsHelpers.handleWsError(error));

      }

      req.wsInstance.getWss().clients.forEach(client => {
        console.log(req.user);
        client.send(req.user);
      });

    }

  });

};