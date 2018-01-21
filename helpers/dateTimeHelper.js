const moment = require('moment');

exports.formatDateHumanFriendly = (dateString) => {

  return moment(dateString).format('MMMM Do YYYY, h:mm a');  

};

exports.timesToDuration = (timesArray) => {

  const times = timesArray.length;

  if(!times){
    return '0';
  }

  const startTime = timesArray[0];
  const endTime = timesArray[timesArray.length - 1];
  const millisElapsed = endTime - startTime;

  return moment.utc(millisElapsed).format('HH:mm:ss');

};
