export const metrestoKmString = (metres: number): string => {

	return metres < 1000 ? Math.floor(metres) + ' m' : (metres / 1000).toFixed(3) + ' km';

};