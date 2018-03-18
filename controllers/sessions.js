const moment = require('moment');
const RowingData = require('../models/RowingData');
const dateTimeHelpers = require('../helpers/dateTimeHelper');
const rowingDataHelpers = require('../helpers/rowingDataHelper');

/**
 * GET /
 * Sessions page.
 */
exports.index = (req, res) => {

	if(!req.user){
	    return res
	      	.status(401)
	      	.render('error', {
			    title: 'Unauthorised'
			});
	}

	RowingData
		.find({ user: req.user })
		.sort('-createdAt') 
		.exec((err, userData) => {
    
	    	if (err) { 
	        	return res
	        		.status(500)
	        		.render('error', {
			    		title: 'Unexpected error'
					});
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

	if(!req.user){
	    return res
	      	.status(401)
	      	.render('error', {
			    title: 'Unauthorised'
			});
	}

	const { date, time } = req.params;
	const userId = req.user._id;
	const parsedDateTime = new Date(dateTimeHelpers.urlPathToTimeStamp(date, time));
	const parsedDateTimePlusOneMinute = new Date(parsedDateTime.getTime() + (1000 * 60));

	if(!parsedDateTime){
	    return res
	      	.status(404)
	        .render('error', {
				title: 'Page not found'
			});
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
	        	return res
	        		.status(500)
	        		.render('error', {
			    		title: 'Unexpected error'
					});
	      	}

	      	if(!userData){
  				return res
  					.status(404)
			      	.render('error', {
			    		title: 'Page not found'
					});
  			}

			res.render('session', {
			    title: 'Session detail',
			    userData: userData,
			    dateTimeHelpers: dateTimeHelpers,
			    rowingDataHelpers: rowingDataHelpers
			});

	    });

};