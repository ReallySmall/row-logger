const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const rowingDataSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  volume: Number,
  time: String

}, { timestamps: true });

const RowingData = mongoose.model('RowingData', rowingDataSchema);

module.exports = RowingData;
