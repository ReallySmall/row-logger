"use strict";
exports.__esModule = true;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var mongooseLeanVirtuals = require('mongoose-lean-virtuals');
var rowingdataHelpers = require('../helpers/rowingDataHelper');
var rowingDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    machineId: String,
    damping: String,
    multi: String,
    times: Array,
    note: String
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});
rowingDataSchema.virtual('distance').get(function () {
    return rowingdataHelpers.timesToMetres([this.times], this.multi, 4.805);
});
rowingDataSchema.virtual('time').get(function () {
    if (!this.times.length) {
        return 0;
    }
    return rowingdataHelpers.timesToTotalMillis([this.times]);
});
rowingDataSchema.plugin(mongooseLeanVirtuals);
exports.RowingData = mongoose.model('RowingData', rowingDataSchema);
