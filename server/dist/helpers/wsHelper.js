"use strict";
exports.__esModule = true;
/**
 * Check if JSON is valid.
 */
exports.isInvalidJson = function (input) {
    try {
        JSON.parse(input);
    }
    catch (error) {
        return error.message; // Is invalid
    }
    return false; // Is valid
};
/**
 * Create JSON string for ws message.
 */
exports.createWsJson = function (message, type) {
    var object = {};
    object[type] = message;
    return JSON.stringify(object);
};
/**
 * Handle ws message error
 */
exports.handleWsError = function (error) {
    if (error) {
        console.log(error);
    }
};
