"use strict";
exports.__esModule = true;
var moment = require('moment');
var RowingData_1 = require("../models/RowingData");
var dateTimeHelpers = require("../helpers/dateTimeHelper");
var rowingDataHelpers = require("../helpers/rowingDataHelper");
/**
 * GET /
 * Sessions page.
 */
exports.index = function (req, res) {
    if (!req.user) {
        return res
            .status(401)
            .render('error', {
            title: 'Unauthorised'
        });
    }
    RowingData_1.RowingData
        .find({ user: req.user })
        .sort('-createdAt')
        .exec(function (err, userData) {
        if (err) {
            return res
                .status(500)
                .render('error', {
                title: 'Unexpected error'
            });
        }
        res.render('sessions', {
            title: 'Sessions',
            userData: userData,
            dateTimeHelpers: dateTimeHelpers,
            rowingDataHelpers: rowingDataHelpers
        });
    });
};
exports.session = function (req, res) {
    if (!req.user) {
        return res
            .status(401)
            .render('error', {
            title: 'Unauthorised'
        });
    }
    var _a = req.params, date = _a.date, time = _a.time;
    var userId = req.user._id;
    var parsedDateTime = new Date(dateTimeHelpers.urlPathToTimeStamp(date, time));
    var parsedDateTimePlusOneMinute = new Date(parsedDateTime.getTime() + (1000 * 60));
    if (!parsedDateTime) {
        return res
            .status(404)
            .render('error', {
            title: 'Page not found'
        });
    }
    RowingData_1.RowingData
        .findOne({
        user: userId,
        createdAt: {
            $gte: parsedDateTime.toISOString(),
            $lt: parsedDateTimePlusOneMinute.toISOString()
        }
    })
        .exec(function (err, userData) {
        if (err) {
            return res
                .status(500)
                .render('error', {
                title: 'Unexpected error'
            });
        }
        if (!userData) {
            return res
                .status(404)
                .render('error', {
                title: 'Page not found'
            });
        }
        res.render('session', {
            title: 'Session detail',
            userData: userData,
            dateTimeHelpers: dateTimeHelpers,
            rowingDataHelpers: rowingDataHelpers
        });
    });
};
