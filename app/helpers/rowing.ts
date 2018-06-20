export const metrestoKmString = (metres: number): string => {

	return metres < 1000 ? Math.floor(metres) + ' m' : (metres / 1000).toFixed(3) + ' km';

};

export const metresSecondstoAverageSpeedString = (metres: number, millis: number): string => {

	const seconds: number = Math.floor(millis / 1000);
	const averageSpeed: string = (metres / seconds).toFixed(2);

	return averageSpeed + ' m/s';

};