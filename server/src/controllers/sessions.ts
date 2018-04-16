const moment = require('moment');

import { User } from '../models/User';
import { RowingData } from '../models/RowingData';
import * as dateTimeHelpers from '../helpers/dateTimeHelper';
import * as rowingDataHelpers from '../helpers/rowingDataHelper';
import * as resHelpers from '../helpers/resHelper';

/**
 * GET
 * Rowing session totals.
 */
export const getSessionTotals = (req, res) => {

	if(!req.user){
	    return res.status(401).json(resHelpers.jsonUnauthorisedMessage);
	}

	User.findById(req.user, (error, user) => {

    	if (error) {
    		return res.status(500).json(resHelpers.jsonErrorMessage);
      	}

		res.status(200).json({
  			date: user.createdAt,
  			distance: user.rowingTotalMetres,
  			time: user.rowingTotalTime
      	});

    });

};

/**
 * GET
 * Rowing sessions.
 */
export const getSessions = (req, res) => {

	const limit: number = req.query.limit ? parseInt(req.query.limit, 10) : 100;

	if(!req.user){
	    return res.status(401).json(resHelpers.jsonUnauthorisedMessage);
	}

	RowingData
		.find({ user: req.user })
		.select('-_id -id -user')
		.sort('-createdAt')
		.limit(limit)
		.lean({ virtuals: true })
		.exec((error, data) => {

	    	if (error) {
	    		return res.status(500).json(resHelpers.jsonErrorMessage);
	      	}

	      	const sanitisedData: any = data.map((datum: any)=> {
	      		return {
	      			date: datum.createdAt,
	      			distance: datum.distance,
	      			time: datum.time
	      		};
	      	});

      		res.status(200).json(sanitisedData);

	    });

};

/**
 * GET
 * Single rowing session.
 */
export const getSession = (req, res) => {

	if(!req.user){
	    return res.status(401).json(resHelpers.jsonUnauthorisedMessage);
	}

	const { date, time } = req.params;
	const userId: string = req.user._id;
	const parsedDateTime: Date = new Date(dateTimeHelpers.urlPathToTimeStamp(date, time));
	const parsedDateTimePlusOneMinute: Date = new Date(parsedDateTime.getTime() + (1000 * 60));

	if(!parsedDateTime){
	    return res.status(404).json(resHelpers.jsonNotFoundMessage);
	}

	RowingData
		.findOne({
			user: userId,
			createdAt: {
				$gte: parsedDateTime.toISOString(),
        		$lt: parsedDateTimePlusOneMinute.toISOString()
			}
		})
		.exec((err, data) => {

	    	if (err) {
	    		return res.status(500).json(resHelpers.jsonErrorMessage);
	      	}

	      	if(!data){
	    		return res.status(404).json(resHelpers.jsonNotFoundMessage);
  			}

      		res.status(200).json(data);

	    });

};

/**
 * POST
 * Delete rowing session.
 */
export const deleteSession = (req, res, next) => {

	if(req.user){

		const sessionId = req.body.sessionId;

		RowingData.findByIdAndRemove(sessionId, req.body, (error, data) => {

			if (error) {
				return res.status(500).json(resHelpers.jsonErrorMessage);
			}

			rowingDataHelpers.updateRowingTotals(req.user._id, 10);

			return res.status(200);

		});

	}

};

/**
 * POST
 * Update rowing session.
 */
export const updateSession = (req, res, next) => {

	const sessionId = req.body.sessionId;
	const refDistance = req.body.refDistance;

	RowingData.findByIdAndUpdate(sessionId, {$set: { refDistance: refDistance }}, (error, data) => {

		if (error) {
			return res.status(500).json(resHelpers.jsonErrorMessage);
		}

		return res.status(200);

	});

};