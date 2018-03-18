exports.metrestoKmString = (metres) => {

	return metres < 1000 ? Math.floor(metres) + ' m' : (metres / 1000).toFixed(3) + ' km'; 

}

exports.timesToMetres = (timesArrayArray, multi, ratioConstant) => {

	const multiplier = parseInt(multi, 10);

	let totalMetres = 0;

	timesArrayArray.map(timesArray => {

		const times = timesArray.length;
		const metres = (times * multiplier) / ratioConstant;

		totalMetres += metres;

	});

	return Math.ceil(totalMetres);
	
};

exports.timesToTotalMillis = (timesArrayArray) => {

	let totalMillis = 0;

	timesArrayArray.map(timesArray => {

		if(timesArray.length){

			const millis = timesArray[timesArray.length - 1] - timesArray[0];

			totalMillis += millis;

		}

	});

	return totalMillis;

};