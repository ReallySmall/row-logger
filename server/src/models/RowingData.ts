const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const rowingdataHelpers = require('../helpers/rowingDataHelper');

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

}, {
	timestamps: true,
    toJSON: { virtuals: true }
});

rowingDataSchema.virtual('distance').get(function() {
    return rowingdataHelpers.timesToMetres([this.times], this.multi, 4.805);
});

rowingDataSchema.virtual('time').get(function() {

	if(!this.times.length){
		return 0;
	}

    return rowingdataHelpers.timesToTotalMillis([this.times]);

});

rowingDataSchema.plugin(mongooseLeanVirtuals);

export const RowingData = mongoose.model('RowingData', rowingDataSchema);