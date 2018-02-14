exports.timesToKm = (timesArray, multi, ratioConstant) => {

	const times = timesArray.length;
	const multiplier = parseInt(multi);

	if(!times){
		return '0m';
	}

	const metres = (times * multiplier) / ratioConstant;
	
	const formattedOutput = metres < 1000 ? Math.floor(metres) + 'm' : (metres / 1000).toFixed(3) + 'km';

	return formattedOutput;

};