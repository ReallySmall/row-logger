const mongoose = require('mongoose');

const distanceMilestoneSchema = new mongoose.Schema({

  title: String,
  metres: Number

}, { timestamps: true });

export const DistanceMilestone = mongoose.model('DistanceMilestone', distanceMilestoneSchema);