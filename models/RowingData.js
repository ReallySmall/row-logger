const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const rowingDataSchema = new mongoose.Schema({
  
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

const RowingData = mongoose.model('RowingData', rowingDataSchema);

module.exports = RowingData;
