const mongoose = require('mongoose');

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

  console.log(req.params);

  ws.on('message', msgString => {

    console.log('Recieved message: ', msgString);

    // if message is invalid JSON, respond with error and close connection
    if(wsHelpers.isInvalidJson(msgString)){
      ws.send(wsHelpers.createWsJson('Invalid request, terminating', 'error'), error => wsHelpers.handleWsError(error));
      ws.terminate();
      return;
    }

    // attempt to extract variables from message
    const { key, machineId, damping, multi, base, data } = JSON.parse(msgString);

    // if data array exists
    // create new array with each time added to base time to get full timestamps
    const times = data && data.length ? data.map(datum => parseInt(base) + parseInt(datum)) : [];

    // if message contains no valid API key, respond with error and close connection
    if(!key || typeof key !== 'string'){
      ws.send(wsHelpers.createWsJson('Invalid API key, terminating', 'error'), error => wsHelpers.handleWsError(error));
      ws.terminate();
      return;
    }

    // clear existing timeout
    rowingDataRecorder.cancelSaveTimeOut(key);

    // if an active rowing session doesn't exist yet for this API key
    if(!rowingDataRecorder.sessionExists(key)){

      // look for a user with matching API key
      User.findOne({ rowingDataApiKey: key }, (error, existingUser) => {

        if(error || !existingUser){

          ws.send(wsHelpers.createWsJson('Invalid API key, terminating', 'error'), error => wsHelpers.handleWsError(error));
          ws.terminate();
          return;

        }

        // if no base time was supplied
        // assume the client needs it
        if(!base){

          ws.send(wsHelpers.createWsJson(Date.now().toString(), 'base'), error => wsHelpers.handleWsError(error));
          return;

        }

        // if all required params exist
        if(machineId && damping && multi && base){

          rowingDataRecorder.createSession(key, existingUser._id, machineId, damping, multi, times);
          rowingDataRecorder.timeOutThenSave(key);

        }

      });

    // if an active rowing session already exists for this API key
    } else {

      // append new times to existing times
      rowingDataRecorder.addDataToSession(key, times);
      rowingDataRecorder.timeOutThenSave(key);

      const currentDistance = rowingDataHelpers.timesToMetres([rowingDataRecorder.getSessionTimes(key)], multi, 4.805).toString() + 'm';

      ws.send(wsHelpers.createWsJson(currentDistance, 'message'), error => wsHelpers.handleWsError(error));

    }

  });

};