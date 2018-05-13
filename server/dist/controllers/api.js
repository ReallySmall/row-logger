"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var User_1 = require("../models/User");
var rowingDataRecorder_1 = require("../helpers/rowingDataRecorder");
var rowingDataHelpers = require("../helpers/rowingDataHelper");
var wsHelpers = require("../helpers/wsHelper");
var rowingDataRecorder = new rowingDataRecorder_1.RowingDataRecorder();
/**
 * WEBSOCKET /
 * handle creation of new rowing data.
 */
exports.createRowingData = function (ws, req) {
    var sendInvalidApiKeyMessage = ws.send(wsHelpers.createWsJson('Invalid API key, terminating', 'error'), function (error) { return wsHelpers.handleWsError(error); });
    ws.on('message', function (msgString) {
        console.log('Recieved message: ', msgString);
        // if message is invalid JSON, respond with error and close connection
        if (wsHelpers.isInvalidJson(msgString)) {
            ws.send(wsHelpers.createWsJson('Invalid request, terminating', 'error'), function (error) { return wsHelpers.handleWsError(error); });
            ws.terminate();
            return;
        }
        // attempt to extract variables from message
        var _a = JSON.parse(msgString), key = _a.key, machineId = _a.machineId, damping = _a.damping, multi = _a.multi, base = _a.base, data = _a.data;
        // if data array exists
        // create new array with each time added to base time to get full timestamps
        var times = data && data.length ? data.map(function (datum) { return parseInt(base) + parseInt(datum); }) : [];
        // if message contains no valid API key, respond with error and close connection
        if (!key || typeof key !== 'string') {
            sendInvalidApiKeyMessage();
            ws.terminate();
            return;
        }
        // clear existing timeout
        rowingDataRecorder.cancelSaveTimeOut(key);
        // if an active rowing session doesn't exist yet for this API key
        if (rowingDataRecorder.sessionExists(key)) {
            // look for a user with matching API key
            User_1.User.findOne({ rowingDataApiKey: key }, function (err, existingUser) {
                if (err || !existingUser) {
                    sendInvalidApiKeyMessage();
                    ws.terminate();
                    return;
                }
                // if all required params exist
                if (machineId && damping && multi && base) {
                    rowingDataRecorder.createSession(key, existingUser._id, machineId, damping, multi, times);
                    rowingDataRecorder.timeOutThenSave(key);
                    // else if no base time was supplied
                    // assume the client needs it
                }
                else if (!base) {
                    ws.send(wsHelpers.createWsJson(Date.now().toString(), 'base'), function (error) { return wsHelpers.handleWsError(error); });
                }
            });
            // if an active rowing session already exists for this API key
        }
        else {
            // append new times to existing times
            rowingDataRecorder.addDataToSession(key, times);
            rowingDataRecorder.timeOutThenSave(key);
            var currentDistance = rowingDataHelpers.timesToMetres([rowingDataRecorder.getSessionTimes(key)], multi, 4.805).toString() + 'm';
            ws.send(wsHelpers.createWsJson(currentDistance, 'message'), function (error) { return wsHelpers.handleWsError(error); });
        }
    });
};
