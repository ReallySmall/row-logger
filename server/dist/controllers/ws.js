"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User_1 = require("../models/User");
var RowerTypes_1 = require("../models/RowerTypes");
var rowingDataRecorder_1 = require("../helpers/rowingDataRecorder");
var wsHelpers = require("../helpers/wsHelper");
var actions = require("../constants/actions");
var rowingDataRecorder = new rowingDataRecorder_1.RowingDataRecorder();
var activeSessions = {};
/**
 * WEBSOCKET /
 * handle creation of new rowing data.
 */
exports.recordSession = function (ws, req) {
    console.log('ws connection');
    // client gets n milliseconds to send a valid authentication message before being disconnected
    var authenticationWindow = setTimeout(function () {
        if (req && !req.user && ws)
            ws.terminate();
    }, 5000);
    ws.on('close', function () {
        clearTimeout(authenticationWindow);
    });
    ws.on('message', function (messageJSON) {
        // attempt to parse JSON into valid ws message object
        var message = wsHelpers.parseWsMessage(messageJSON);
        if (!message) {
            ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid JSON or incorrect structure in message', true), function (error) { return wsHelpers.handleWsError(error); });
            ws.terminate(); // close the socket
            return;
        }
        if (!req.user) { // first client message must be a valid JWT
            jwt.verify(message.payload, process.env.JWT_TOKEN_SECRET, function (error, token) {
                if (error) { // if JWT auth fails
                    ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid token', true), function (error) { return wsHelpers.handleWsError(error); });
                    ws.terminate(); // close the socket
                    return;
                }
                req.user = token.user; // otherwise flag the socket as authenticated
                // get the existing active session for this user, or create one if it doesn't exist
                var activeSession = activeSessions[req.user] || {
                    connections: []
                };
                activeSession.connections.push(ws); // push this ws connection to the active session for this user
                activeSessions[req.user] = activeSession; // update the global object with the active session for this user
                activeSessions[req.user].connections.forEach(function (connection) {
                    connection.send(wsHelpers.createWsMessage(actions.WEBSOCKET_AUTHENTICATED, 'A user client authenticated', false), function (error) { return wsHelpers.handleWsError(error); });
                });
            });
        }
        else {
            console.log('Recieved message: ', message);
            // attempt to extract variables from message
            var _a = JSON.parse(message.payload), base_1 = _a.base, data = _a.data;
            // if data array exists
            // create new array with each time added to base time to get full timestamps
            var times_1 = data && data.length ? data.map(function (datum) { return parseInt(base_1, 10) + parseInt(datum, 10); }) : [];
            // clear any existing timeout
            rowingDataRecorder.cancelSaveTimeOut(req.user);
            // if an active rowing session doesn't exist yet for this user
            if (!rowingDataRecorder.sessionExists(req.user)) {
                // look for a user with matching API key
                User_1.User.findById(req.user, function (error, user) {
                    if (error || !user) {
                        ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), function (error) { return wsHelpers.handleWsError(error); });
                        ws.terminate();
                        return;
                    }
                    var damping = user.rowingRowerDamping;
                    var rowerType = user.rowingRowerType;
                    var _a = RowerTypes_1.RowerTypes[rowerType], constant = _a.constant, multi = _a.multi;
                    // if all required params exist
                    if (damping && base_1 && constant && multi) {
                        rowingDataRecorder.createSession(req.user, user._id, rowerType, damping, multi, times_1);
                        rowingDataRecorder.timeOutThenSave(req.user);
                    }
                    else {
                        ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), function (error) { return wsHelpers.handleWsError(error); });
                        ws.terminate();
                        return;
                    }
                });
                // if an active rowing session already exists for this user
            }
            else {
                // append new times to existing times
                rowingDataRecorder.addDataToSession(req.user, times_1);
                rowingDataRecorder.timeOutThenSave(req.user);
            }
            // update all user's connected clients
            if (activeSessions[req.user] && activeSessions[req.user].connections) {
                activeSessions[req.user].connections.forEach(function (connection) {
                    connection.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, times_1, false), function (error) { return wsHelpers.handleWsError(error); });
                });
            }
        }
    });
};
