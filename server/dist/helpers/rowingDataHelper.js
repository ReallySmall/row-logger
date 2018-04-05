"use strict";
exports.__esModule = true;
var RowingData_1 = require("../models/RowingData");
var User_1 = require("../models/User");
var mongoose = require('mongoose');
exports.metrestoKmString = function (metres) {
    return metres < 1000 ? Math.floor(metres) + ' m' : (metres / 1000).toFixed(3) + ' km';
};
exports.timesToMetres = function (timesArrayArray, multi, ratioConstant) {
    var multiplier = parseInt(multi, 10);
    var totalMetres = 0;
    timesArrayArray.map(function (timesArray) {
        var times = timesArray.length;
        var metres = (times * multiplier) / ratioConstant;
        totalMetres += metres;
    });
    return Math.ceil(totalMetres);
};
exports.timesToTotalMillis = function (timesArrayArray) {
    var totalMillis = 0;
    timesArrayArray.map(function (timesArray) {
        if (timesArray.length) {
            var millis = timesArray[timesArray.length - 1] - timesArray[0];
            totalMillis += millis;
        }
    });
    return totalMillis;
};
/**
 * Update rowing totals.
 */
exports.updateRowingTotals = function (userId, multi) {
    RowingData_1.RowingData.find({ user: userId }, function (err, rowingSessionData) {
        var timesArrayArray = rowingSessionData.map(function (datum) { return datum.times; });
        var totalMetres = exports.timesToMetres(timesArrayArray, multi, 4.805);
        var totalTime = exports.timesToTotalMillis(timesArrayArray);
        User_1.User.findById(mongoose.Types.ObjectId(userId), function (err, user) {
            if (err) {
                console.log(err);
            }
            else {
                user.rowingTotalMetres = totalMetres;
                user.rowingTotalTime = totalTime;
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    });
};
