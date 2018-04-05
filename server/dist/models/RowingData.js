"use strict";
exports.__esModule = true;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var rowingDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    machineId: String,
    damping: String,
    multi: String,
    times: Array,
    refDistance: String
}, { timestamps: true });
exports.RowingData = mongoose.model('RowingData', rowingDataSchema);
