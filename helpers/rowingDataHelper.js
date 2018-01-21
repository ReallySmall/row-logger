const moment = require('moment');

exports.timesToKm = (timesArray, ratioConstant) => {

	const times = timesArray.length;

	if(!times){
		return '0';
	}

	const metres = times / ratioConstant;
	const km = metres > 0 ? metres / 1000 : 0;

	return km.toFixed(3);

};