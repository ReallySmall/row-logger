const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

import { RowingData } from '../models/RowingData';
import { User } from '../models/User';
import { RowingDataRecorder } from '../helpers/rowingDataRecorder';
import * as dateTimeHelpers from '../helpers/dateTimeHelper';
import * as rowingDataHelpers from '../helpers/rowingDataHelper';
import * as wsHelpers from '../helpers/wsHelper';

const rowingDataRecorder = new RowingDataRecorder();

/**
 * WEBSOCKET /
 * handle creation of new rowing data.
 */
export const recordSession = (ws, req) => {

  setTimeout(() => { // client gets n seconds to send a valid authentication message before being disconnected
    if(!req.user) ws.terminate();
  }, 5000);

  ws.on('message', msgString => {

    if(!req.user){ // first client message must be a valid JWT

      jwt.verify(msgString, process.env.JWT_TOKEN_SECRET, (error, token) => {

        if(error){ // if JWT auth fails
          console.log(error);
          ws.terminate(); // close the socket
          return;
        }

        req.user = token.user; // otherwise flag the socket as authenticated
        ws.send(wsHelpers.createWsJson('Authenticated', 'authenticated'), error => wsHelpers.handleWsError(error));

      });

    } else {

      // if message is invalid JSON, respond with error
      if(wsHelpers.isInvalidJson(msgString)){
        console.log('Invalid JSON in recieved message: ', msgString);
        ws.send(wsHelpers.createWsJson('Invalid request format', 'error'), error => wsHelpers.handleWsError(error));
        return;
      }

      console.log('Recieved message: ', msgString);

      // attempt to extract variables from message
      const { machineId, damping, multi, base, data } = JSON.parse(msgString);

      // if data array exists
      // create new array with each time added to base time to get full timestamps
      const times = data && data.length ? data.map(datum => parseInt(base, 10) + parseInt(datum, 10)) : [];

      // clear any existing timeout
      rowingDataRecorder.cancelSaveTimeOut(req.user);

      // if an active rowing session doesn't exist yet for this API key
      if(!rowingDataRecorder.sessionExists(req.user)){

        console.log(req.user);

        // look for a user with matching API key
        User.findById(req.user, (error, user) => {

          if(error || !user){

            ws.send(wsHelpers.createWsJson('Invalid user, terminating', 'error'), error => wsHelpers.handleWsError(error));
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

        ws.send(wsHelpers.createWsJson(currentDistance, 'message'), error => wsHelpers.handleWsError(error));

      }

      req.wsInstance.getWss().clients.forEach(client => client.send(req.user));

    }

  });

};