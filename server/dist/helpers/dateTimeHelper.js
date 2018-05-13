"use strict";
exports.__esModule = true;
var moment = require('moment');
exports.formatDateHumanFriendly = function (dateString) {
    return moment(dateString).format('MMMM Do YYYY, h:mm a');
};
exports.formatHoursMinutesSeconds = function (dateString) {
    return moment.utc(dateString).format('h:mm:ss');
};
exports.timeStampToUrlPath = function (dateString) {
    return moment(dateString).format('DD-MM-YYYY/HH-mm');
};
exports.urlPathToTimeStamp = function (dateString, timeString) {
    var reformattedDate = dateString.replace(/-/g, '/');
    var reformattedTime = timeString.replace(/-/g, ':');
    var validDate = moment(reformattedDate, 'DD/MM/YYYY').isValid();
    var validTime = moment(reformattedTime, 'hh:mm').isValid();
    var parsedDateTime = validDate && validTime
        ? moment(reformattedDate + ' ' + reformattedTime, 'DD/MM/YYYY hh:mm')
        : null;
    return parsedDateTime;
};
exports.timesToDuration = function (timesArray) {
    var times = timesArray.length;
    var noTime = moment.utc(0).format('HH:mm:ss');
    if (!times) {
        return noTime;
    }
    var startTime = timesArray[0];
    var endTime = timesArray[timesArray.length - 1];
    if (startTime > endTime || endTime < 0) {
        return noTime;
    }
    var millisElapsed = endTime - startTime;
    return moment.utc(millisElapsed).format('HH:mm:ss');
};
exports.millisToDuration = function (millis) {
    return moment.utc(millis).format('HH:mm:ss');
};
