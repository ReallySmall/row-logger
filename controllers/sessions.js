const moment = require('moment');
const RowingData = require('../models/RowingData');
const dateTimeHelpers = require('../helpers/dateTimeHelper');
const rowingDataHelpers = require('../helpers/rowingDataHelper');

/**
 * GET /
 * Sessions page.
 */
exports.index = (req, res) => {

	RowingData
		.find({ user: req.user })
		.sort('-createdAt') 
		.exec((err, userData) => {
    
	    	if (err) { 
	        	return res.status(500).end();
	      	}

			res.render('sessions', {
			    title: 'Sessions',
			    userData: userData,
			    dateTimeHelpers: dateTimeHelpers,
			    rowingDataHelpers: rowingDataHelpers
			});

	    });

};

exports.session = (req, res) => {

	const { date, time } = req.params;
	const userId = req.user._id;
	const parsedDateTime = new Date(dateTimeHelpers.urlPathToTimeStamp(date, time));
	const parsedDateTimePlusOneMinute = new Date(parsedDateTime.getTime() + (1000 * 60));

	if(!req.user){
	    return res
	      	.status(401)
	      	.end();
	}

	if(!parsedDateTime){
	    return res
	      	.status(404)
	      	.end();
	}

	RowingData
		.findOne({
			user: userId,
			createdAt: {
				$gte: parsedDateTime.toISOString(),
        		$lt: parsedDateTimePlusOneMinute.toISOString()
			}
		})
		.exec((err, userData) => {
    
	    	if (err) { 
	        	return res.status(500).end();
	      	}

	      	if(!userData){
  				return res
  					.status(404)
  					.end();
  			}

  			console.log(userData);

			res.render('session', {
			    title: 'Session detail',
			    userData: userData,
			    dateTimeHelpers: dateTimeHelpers,
			    rowingDataHelpers: rowingDataHelpers
			});

	    });

};