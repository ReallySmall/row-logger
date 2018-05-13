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

export const millisToDuration = (millis: any) => {

	millis = parseInt(millis, 10);

  return moment.utc(millis).format('HH:mm:ss');

};
