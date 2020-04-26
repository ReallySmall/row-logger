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

	const { user } = req;

	if(!user) {

		return res.status(401).json(resHelpers.jsonUnauthorisedMessage);

	}

	User.findById(user, (error, record) => {

    	if (error) {

    		return res.status(500).json(resHelpers.jsonErrorMessage);

    	}

    	const { createdAt,
    			rowingTotalMetres,
    			rowingTotalTime } = record;

		res.status(200).json({
  			date: createdAt,
  			distance: rowingTotalMetres || 0,
  			time: rowingTotalTime || 0
      	});

    });

};

/**
 * GET
 * Rowing sessions.
 */
export const getSessions = (req, res) => {

	const { user, query } = req;

	if(!user) {

		return res.status(401).json(resHelpers.jsonUnauthorisedMessage);

	}

	const { limit,
			fromDate,
			toDate } = query;

	const limit: number = limit ? parseInt(limit, 10) : 100;
	const fromDate: string = fromDate ? moment(fromDate).toISOString() : moment('2000-01-01').toISOString();
	const toDate: string = toDate ? moment(toDate).toISOString() : moment().toISOString();

	RowingData
		.find({
			user: user,
			createdAt: {
			    $gte: fromDate,
				$lt: toDate
			}
		})
		.select('-id -user')
		.sort('-createdAt')
		.limit(limit)
		.lean({ virtuals: true })
		.exec((error, data) => {

	    	if (error) {

	    		return res.status(500).json(resHelpers.jsonErrorMessage);

	    	}

	      	const sanitisedData: any = data.map((datum: any) => {

	      		const { id,
	      				createdAt,
	      				distance,
	      				time } = datum;

	      		return {
	      			id: id,
	      			date: createdAt,
	      			distance: distance,
	      			time: time
	      		};

	      	});

	      	const params: any = {
				fromDate: fromDate || undefined,
				toDate: toDate || undefined,
	      	};

      		res.status(200).json({
      			data: sanitisedData,
      			params: params
      		});

	    });

};

/**
 * GET
 * Single rowing session.
 */
export const getSession = (req, res) => {

	const { user, query: { id } } = req;

	if(!user) {

		return res.status(401).json(resHelpers.jsonUnauthorisedMessage);

	}

	RowingData
		.findById(id)
		.exec((error, data) => {

	    	if (error) {

	    		return res.status(500).json(resHelpers.jsonErrorMessage);

	    	}

	      	if(!data || !data.user || data.user.toString() !== req.user){

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

		const sessionId: string = req.body.sessionId;

		RowingData.findById(sessionId, req.body, (error, data) => {

			if (error) return res.status(500).json(resHelpers.jsonErrorMessage);

			if (data.user === req.user){

				RowingData.findByIdAndRemove(sessionId, req.body, (error, data) => {

					if (error) return res.status(500).json(resHelpers.jsonErrorMessage);

					rowingDataHelpers.updateRowingTotals(req.user._id, 10);

					return res.status(200);

				});

			}

			return res.status(401).json(resHelpers.jsonUnauthorisedMessage);

		});

	}

};

/**
 * POST
 * Update rowing session.
 */
export const updateSession = (req, res, next) => {

	const sessionId: string = req.body.sessionId;
	const note: string = req.body.note;

	// TODO need to verify user owns session before updating it!
	RowingData.findByIdAndUpdate(sessionId, {$set: { note: note }}, (error, data) => {

		if (error) return res.status(500).json(resHelpers.jsonErrorMessage);
		if (data.user !== req.user) return res.status(401).json(resHelpers.jsonErrorMessage);

		return res.status(200);

	});

};