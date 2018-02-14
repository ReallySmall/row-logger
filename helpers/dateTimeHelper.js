const moment = require('moment');

exports.formatDateHumanFriendly = (dateString) => {

  return moment(dateString).format('MMMM Do YYYY, h:mm a');  

};

exports.formatHoursMinutesSeconds = (dateString) => {

  return moment.utc(dateString).format('h:mm:ss');  

};

exports.timeStampToUrlPath = (dateString) => {

  return moment(dateString).format('DD-MM-YYYY/HH-mm');

}

exports.urlPathToTimeStamp = (dateString, timeString) => {

  	const reformattedDate = dateString.replace(/-/g, '/');
	const reformattedTime = timeString.replace(/-/g, ':');

	const validDate = moment(reformattedDate, 'DD/MM/YYYY').isValid();
	const validTime = moment(reformattedTime, 'hh:mm').isValid();
	
	const parsedDateTime = validDate && validTime 
		? moment(reformattedDate + ' ' + reformattedTime, 'DD/MM/YYYY hh:mm')
		: null;

	return parsedDateTime;

}

exports.timesToDuration = (timesArray, timeOut) => {

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
