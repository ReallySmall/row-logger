"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User_1 = require("../models/User");
var rowingDataRecorder_1 = require("../helpers/rowingDataRecorder");
var rowingDataHelpers = require("../helpers/rowingDataHelper");
var wsHelpers = require("../helpers/wsHelper");
var rowingDataRecorder = new rowingDataRecorder_1.RowingDataRecorder();
/**
 * WEBSOCKET /
 * handle creation of new rowing data.
 */
exports.recordSession = function (ws, req) {
    setTimeout(function () {
        if (!req.user)
            ws.terminate();
    }, 5000);
    ws.on('message', function (msgString) {
        if (!req.user) { // first client message must be a valid JWT
            jwt.verify(msgString, process.env.JWT_TOKEN_SECRET, function (error, token) {
                if (error) { // if JWT auth fails
                    console.log(error);
                    ws.terminate(); // close the socket
                    return;
                }
                req.user = token.user; // otherwise flag the socket as authenticated
                ws.send(wsHelpers.createWsJson('Authenticated', 'authenticated'), function (error) { return wsHelpers.handleWsError(error); });
            });
        }
        else {
            // if message is invalid JSON, respond with error
            if (wsHelpers.isInvalidJson(msgString)) {
                console.log('Invalid JSON in recieved message: ', msgString);
                ws.send(wsHelpers.createWsJson('Invalid request format', 'error'), function (error) { return wsHelpers.handleWsError(error); });
                return;
            }
            console.log('Recieved message: ', msgString);
            // attempt to extract variables from message
            var _a = JSON.parse(msgString), machineId_1 = _a.machineId, damping_1 = _a.damping, multi_1 = _a.multi, base_1 = _a.base, data = _a.data;
            // if data array exists
            // create new array with each time added to base time to get full timestamps
            var times_1 = data && data.length ? data.map(function (datum) { return parseInt(base_1, 10) + parseInt(datum, 10); }) : [];
            // clear any existing timeout
            rowingDataRecorder.cancelSaveTimeOut(req.user);
            // if an active rowing session doesn't exist yet for this API key
            if (!rowingDataRecorder.sessionExists(req.user)) {
                console.log(req.user);
                // look for a user with matching API key
                User_1.User.findById(req.user, function (error, user) {
                    if (error || !user) {
                        ws.send(wsHelpers.createWsJson('Invalid user, terminating', 'error'), function (error) { return wsHelpers.handleWsError(error); });
                        ws.terminate();
                        return;
                    }
                    // if all required params exist
                    if (machineId_1 && damping_1 && multi_1 && base_1) {
                        rowingDataRecorder.createSession(req.user, user._id, machineId_1, damping_1, multi_1, times_1);
                        rowingDataRecorder.timeOutThenSave(req.user);
                    }
                });
                // if an active rowing session already exists for this user
            }
            else {
                // append new times to existing times
                rowingDataRecorder.addDataToSession(req.user, times_1);
                rowingDataRecorder.timeOutThenSave(req.user);
                var currentDistance = rowingDataHelpers.timesToMetres([rowingDataRecorder.getSessionTimes(req.user)], multi_1, 4.805).toString() + 'm';
                ws.send(wsHelpers.createWsJson(currentDistance, 'message'), function (error) { return wsHelpers.handleWsError(error); });
            }
            req.wsInstance.getWss().clients.forEach(function (client) { return client.send(req.user); });
        }
    });
};
