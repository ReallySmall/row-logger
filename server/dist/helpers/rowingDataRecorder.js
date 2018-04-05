"use strict";
exports.__esModule = true;
var RowingData_1 = require("../models/RowingData");
var RowingDataRecorder = /** @class */ (function () {
    function RowingDataRecorder() {
        this.sessions = {};
        this.timeOutMillis = 10000;
        this.sessionExists = this.sessionExists.bind(this);
        this.createSession = this.createSession.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
        this.addDataToSession = this.addDataToSession.bind(this);
        this.getSessionTimes = this.getSessionTimes.bind(this);
        this.timeOutThenSave = this.timeOutThenSave.bind(this);
        this.cancelSaveTimeOut = this.cancelSaveTimeOut.bind(this);
    }
    RowingDataRecorder.prototype.sessionExists = function (key) {
        return this.sessions[key] ? true : false;
    };
    RowingDataRecorder.prototype.createSession = function (key, user, machineId, damping, multi, times) {
        if (key && !this.sessions[key]) {
            this.sessions[key] = {
                timeOut: undefined
            };
            this.sessions[key].data = {
                user: user,
                machineId: machineId,
                damping: damping,
                multi: multi,
                times: times
            };
        }
    };
    RowingDataRecorder.prototype.deleteSession = function (key) {
        if (key && this.sessions[key]) {
            delete this.sessions[key];
        }
    };
    RowingDataRecorder.prototype.addDataToSession = function (key, data) {
        if (key && this.sessions[key]) {
            this.sessions[key].times = this.sessions[key].times.concat(data);
        }
    };
    RowingDataRecorder.prototype.getSessionTimes = function (key) {
        if (key && this.sessions[key]) {
            return this.sessions[key].times;
        }
    };
    RowingDataRecorder.prototype.cancelSaveTimeOut = function (key) {
        if (key && this.sessions[key]) {
            clearTimeout(this.sessions[key].timeOut);
        }
    };
    RowingDataRecorder.prototype.timeOutThenSave = function (key) {
        var _this = this;
        if (key && this.sessions[key]) {
            this.sessions[key].timeOut = setTimeout(function () {
                var rowingData = new RowingData_1.RowingData(_this.sessions[key].data);
                rowingData
                    .save()
                    .then(function (item) {
                    console.log("data saved");
                    //updateRowingTotals(rowingData.user, 10);
                })["catch"](function (error) { return error && console.log("unable to save data:", error); });
            }, this.timeOutMillis);
        }
    };
    return RowingDataRecorder;
}());
exports.RowingDataRecorder = RowingDataRecorder;
