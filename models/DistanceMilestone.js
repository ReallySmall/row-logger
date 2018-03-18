const mongoose = require('mongoose');

const distanceMilestoneSchema = new mongoose.Schema({
  
  title: String,
  metres: Number

}, { timestamps: true });

const DistanceMilestone = mongoose.model('DistanceMilestone', distanceMilestoneSchema);

module.exports = RowingData;
