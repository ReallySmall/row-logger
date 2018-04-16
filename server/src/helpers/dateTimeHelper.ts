const moment = require('moment');

export const formatDateHumanFriendly = (dateString: string) => {

  return moment(dateString).format('MMMM Do YYYY, h:mm a');

};

export const formatHoursMinutesSeconds = (dateString:string) => {

  return moment.utc(dateString).format('h:mm:ss');

};

export const timeStampToUrlPath = (dateString: string) => {

  return moment(dateString).format('DD-MM-YYYY/HH-mm');

};

export const urlPathToTimeStamp = (dateString: string, timeString: string) => {

  	const reformattedDate = dateString.replace(/-/g, '/');
	const reformattedTime = timeString.replace(/-/g, ':');

	const validDate = moment(reformattedDate, 'DD/MM/YYYY').isValid();
	const validTime = moment(reformattedTime, 'hh:mm').isValid();

	const parsedDateTime = validDate && validTime
		? moment(reformattedDate + ' ' + reformattedTime, 'DD/MM/YYYY hh:mm')
		: null;

	return parsedDateTime;

};

export const timesToDuration = (timesArray: Array<any>) => {

  const times = timesArray.length;
  const noTime = moment.utc(0).format('HH:mm:ss');

  if(!times){
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

export const millisToDuration = (millis: number) => {

  return moment.utc(millis).format('HH:mm:ss');

};
