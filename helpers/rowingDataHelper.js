exports.timesToKm = (timesArray, multi, ratioConstant) => {

	const times = timesArray.length;
	const multiplier = parseInt(multi);

	if(!times){
		return '0.000';
	}

	const metres = (times * multiplier) / ratioConstant;
	const km = metres > 0 ? metres / 1000 : 0;

	return km.toFixed(3);

};