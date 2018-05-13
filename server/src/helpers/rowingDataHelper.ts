import { RowingData } from '../models/RowingData';
import { User } from '../models/User';

const mongoose = require('mongoose');

export const metrestoKmString = (metres: number): string => {

	return metres < 1000 ? Math.floor(metres) + ' m' : (metres / 1000).toFixed(3) + ' km';

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

/**
 * Update rowing totals.
 */
export const updateRowingTotals = (userId: string, multi: number): void => {

  RowingData.find({ user: userId }, (err, rowingSessionData) => {

    const timesArrayArray: Array<Array<number>> = rowingSessionData.map(datum => datum.times);
    const totalMetres: number = timesToMetres(timesArrayArray, multi, 4.805);
    const totalTime: number = timesToTotalMillis(timesArrayArray);

    User.findById(mongoose.Types.ObjectId(userId), (err, user) => {

      if(err){
        console.log(err);
      } else {
        user.rowingTotalMetres = totalMetres;
        user.rowingTotalTime = totalTime;
        user.save((err) => {
          if(err){
            console.log(err);
          }
        });
      }

    });

  });

};