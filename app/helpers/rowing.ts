export const metrestoKmString = (metres: number): string => {

	return metres < 1000 ? Math.floor(metres) + ' m' : (metres / 1000).toFixed(3) + ' km';

};

export const metresSecondstoAverageSpeedString = (metres: number, millis: number): string => {

	const seconds: number = Math.floor(millis / 1000);
	const averageSpeed: string = (metres / seconds).toFixed(2);

	return averageSpeed + ' m/s';

};

export const timesToMetres = (timesArrayArray: Array<Array<number>>, multi: any, ratioConstant: number): number => {

	const multiplier: number = parseInt(multi, 10);

	let totalMetres: number = 0;

	timesArrayArray.map(timesArray => {

		const times: number = timesArray.length;
		const metres: number = (times * multiplier) / ratioConstant;

		totalMetres += metres;

	});

	return Math.ceil(totalMetres);

};

export const timesToTotalMillis = (timesArrayArray: Array<Array<number>>): number => {

	let totalMillis: number = 0;

	timesArrayArray.map(timesArray => {

		if(timesArray.length){

			const millis: number = timesArray[timesArray.length - 1] - timesArray[0];

			totalMillis += millis;

		}

	});

	return totalMillis;

};