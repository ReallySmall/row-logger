"use strict";
exports.__esModule = true;
var RowingData_1 = require("../models/RowingData");
var dateTimeHelpers = require("../helpers/dateTimeHelper");
var rowingDataHelpers = require("../helpers/rowingDataHelper");
/**
 * GET /
 * Home page.
 */
exports.index = function (req, res) {
    if (!req.user) {
        return res.render('home', {
            title: 'Home',
            dateTimeHelpers: dateTimeHelpers,
            rowingDataHelpers: rowingDataHelpers
        });
    }
    var userId = req.user._id;
    RowingData_1.RowingData
        .find({ user: userId })
        .sort('-createdAt')
        .limit(4)
        .exec(function (err, userRowingSessionsData) {
        if (err) {
            return res
                .status(500)
                .end();
        }
        res.render('home', {
            title: 'Home',
            userRowingTotalMetres: req.user.rowingTotalMetres,
            userRowingTotalTime: req.user.rowingTotalTime,
            userRowingSessionsData: userRowingSessionsData,
            dateTimeHelpers: dateTimeHelpers,
            rowingDataHelpers: rowingDataHelpers
        });
    });
};
