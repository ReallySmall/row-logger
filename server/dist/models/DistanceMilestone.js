"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var distanceMilestoneSchema = new mongoose.Schema({
    title: String,
    metres: Number
}, { timestamps: true });
exports.DistanceMilestone = mongoose.model('DistanceMilestone', distanceMilestoneSchema);
