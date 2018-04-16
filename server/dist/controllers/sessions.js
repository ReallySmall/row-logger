"use strict";
exports.__esModule = true;
var moment = require('moment');
var User_1 = require("../models/User");
var RowingData_1 = require("../models/RowingData");
var dateTimeHelpers = require("../helpers/dateTimeHelper");
var rowingDataHelpers = require("../helpers/rowingDataHelper");
var resHelpers = require("../helpers/resHelper");
/**
 * GET
 * Rowing session totals.
 */
exports.getSessionTotals = function (req, res) {
    if (!req.user) {
        return res.status(401).json(resHelpers.jsonUnauthorisedMessage);
    }
    User_1.User.findById(req.user, function (error, user) {
        if (error) {
            return res.status(500).json(resHelpers.jsonErrorMessage);
        }
        res.status(200).json({
            date: user.createdAt,
            distance: user.rowingTotalMetres,
            time: user.rowingTotalTime
        });
    });
};
/**
 * GET
 * Rowing sessions.
 */
exports.getSessions = function (req, res) {
    var limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;
    if (!req.user) {
        return res.status(401).json(resHelpers.jsonUnauthorisedMessage);
    }
    RowingData_1.RowingData
        .find({ user: req.user })
        .select('-_id -id -user')
        .sort('-createdAt')
        .limit(limit)
        .lean({ virtuals: true })
        .exec(function (error, data) {
        if (error) {
            return res.status(500).json(resHelpers.jsonErrorMessage);
        }
        var sanitisedData = data.map(function (datum) {
            return {
                date: datum.createdAt,
                distance: datum.distance,
                time: datum.time
            };
        });
        res.status(200).json(sanitisedData);
    });
};
/**
 * GET
 * Single rowing session.
 */
exports.getSession = function (req, res) {
    if (!req.user) {
        return res.status(401).json(resHelpers.jsonUnauthorisedMessage);
    }
    var _a = req.params, date = _a.date, time = _a.time;
    var userId = req.user._id;
    var parsedDateTime = new Date(dateTimeHelpers.urlPathToTimeStamp(date, time));
    var parsedDateTimePlusOneMinute = new Date(parsedDateTime.getTime() + (1000 * 60));
    if (!parsedDateTime) {
        return res.status(404).json(resHelpers.jsonNotFoundMessage);
    }
    RowingData_1.RowingData
        .findOne({
        user: userId,
        createdAt: {
            $gte: parsedDateTime.toISOString(),
            $lt: parsedDateTimePlusOneMinute.toISOString()
        }
    })
        .exec(function (err, data) {
        if (err) {
            return res.status(500).json(resHelpers.jsonErrorMessage);
        }
        if (!data) {
            return res.status(404).json(resHelpers.jsonNotFoundMessage);
        }
        res.status(200).json(data);
    });
};
/**
 * POST
 * Delete rowing session.
 */
exports.deleteSession = function (req, res, next) {
    if (req.user) {
        var sessionId = req.body.sessionId;
        RowingData_1.RowingData.findByIdAndRemove(sessionId, req.body, function (error, data) {
            if (error) {
                return res.status(500).json(resHelpers.jsonErrorMessage);
            }
            rowingDataHelpers.updateRowingTotals(req.user._id, 10);
            return res.status(200);
        });
    }
};
/**
 * POST
 * Update rowing session.
 */
exports.updateSession = function (req, res, next) {
    var sessionId = req.body.sessionId;
    var refDistance = req.body.refDistance;
    RowingData_1.RowingData.findByIdAndUpdate(sessionId, { $set: { refDistance: refDistance } }, function (error, data) {
        if (error) {
            return res.status(500).json(resHelpers.jsonErrorMessage);
        }
        return res.status(200);
    });
};
