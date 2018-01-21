const RowingData = require('../models/RowingData');
const dateTimeHelpers = require('../helpers/dateTimeHelper');
const rowingDataHelpers = require('../helpers/rowingDataHelper');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {

	RowingData
		.find({ user: req.user })
		.sort('-createdAt') 
		.limit(4)
		.exec((err, userData) => {
    
	    	if (err) { 
	        	return res.status(500).end();
	      	}

			res.render('home', {
			    title: 'Home',
			    userData: userData,
			    dateTimeHelpers: dateTimeHelpers,
			    rowingDataHelpers: rowingDataHelpers
			});

	    });

};
