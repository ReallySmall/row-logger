"use strict";
exports.__esModule = true;
/**
 * Check if ws message is valid JSON and is compatible structure.
 */
exports.parseWsMessage = function (messageJSON) {
    var parsedObject = undefined;
    try {
        parsedObject = JSON.parse(messageJSON);
    }
    catch (error) {
        return undefined;
    }
    if (!parsedObject.hasOwnProperty('type') || !parsedObject.hasOwnProperty('payload') || !parsedObject.hasOwnProperty('error')) {
        return undefined;
    }
    return parsedObject;
};
/**
 * Create JSON string for ws message.
 */
exports.createWsMessage = function (type, payload, error) {
    var message = {};
    message['type'] = type;
    message['payload'] = payload;
    message['error'] = error;
    return JSON.stringify(message);
};
/**
 * Handle ws message error
 */
exports.handleWsError = function (error) {
    if (error) {
        console.log(error);
    }
};
