const moment = require('moment');

export const formatDateHumanFriendly: Function = (dateString: string): string => {

  return moment(dateString).format('MMMM Do YYYY, h:mm a');

};

export const formatHoursMinutesSeconds: Function = (dateString: string): string => {

  return moment.utc(dateString).format('h:mm:ss');

};

export const timeStampToUrlPath: Function = (dateString: string): string => {

  return moment(dateString).format('DD-MM-YYYY/HH-mm');

};

export const urlPathToTimeStamp: Function = (dateString: string, timeString: string): string => {

  const reformattedDate = dateString.replace(/-/g, '/');
	const reformattedTime = timeString.replace(/-/g, ':');

	const validDate = moment(reformattedDate, 'DD/MM/YYYY').isValid();
	const validTime = moment(reformattedTime, 'hh:mm').isValid();

	const parsedDateTime = validDate && validTime

		? moment(reformattedDate + ' ' + reformattedTime, 'DD/MM/YYYY hh:mm')
		: null;

	return parsedDateTime;

};

export const timesToDuration: Function = (timesArray: Array<any>): string => {

  const hasTimes: boolean = timesArray.length > 0;
  const noTime = moment.utc(0).format('HH:mm:ss');

  if(!hasTimes){

     return noTime;

  }

  const startTime = timesArray[0];
  const endTime = timesArray[timesArray.length - 1];

  if(startTime > endTime || endTime < 0){

  	return noTime;

  }

  const millisElapsed = endTime - startTime;

  return moment.utc(millisElapsed).format('HH:mm:ss');

};

export const millisToDuration: Function = (millis: number): string => {

  return moment.utc(millis).format('HH:mm:ss');

};
