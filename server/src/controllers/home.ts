import { RowingData } from '../models/RowingData';
import { User } from '../models/User';
import * as dateTimeHelpers from '../helpers/dateTimeHelper';
import * as rowingDataHelpers from '../helpers/rowingDataHelper';

/**
 * GET /
 * Home page.
 */
export const index = (req, res) => {

	if(!req.user){
	    return 	res.render('home', {
		    		title: 'Home',
		    		dateTimeHelpers: dateTimeHelpers,
		    		rowingDataHelpers: rowingDataHelpers
				});
	}

	const userId = req.user._id

	RowingData
		.find({ user: userId })
		.sort('-createdAt') 
		.limit(4)
		.exec((err, userRowingSessionsData) => {
    
	    	if (err) { 
	        	return res
        			.status(500)
        			.end();
	      	}

      	    res.render('home', {
			    title: 'Home',
			    userRowingTotalMetres: req.user.rowingTotalMetres,
			    userRowingTotalTime: req.user.rowingTotalTime,
			    userRowingSessionsData: userRowingSessionsData,
			    dateTimeHelpers: dateTimeHelpers,
			    rowingDataHelpers: rowingDataHelpers
			});

	    });

};
