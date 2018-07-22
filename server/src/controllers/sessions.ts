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

	if(!req.user) return res.status(401).json(resHelpers.jsonUnauthorisedMessage);

	User.findById(req.user, (error, user) => {

    	if (error) return res.status(500).json(resHelpers.jsonErrorMessage);

		res.status(200).json({
  			date: user.createdAt,
  			distance: user.rowingTotalMetres || 0,
  			time: user.rowingTotalTime || 0
      	});

    });

};

/**
 * GET
 * Rowing sessions.
 */
export const getSessions = (req, res) => {

	const limit: number = req.query.limit ? parseInt(req.query.limit, 10) : 100;
	const fromDate: string = req.query.fromDate ? moment(req.query.fromDate).toISOString() : moment('2000-01-01').toISOString();
	const toDate: string = req.query.toDate ? moment(req.query.toDate).toISOString() : moment().toISOString();

	if(!req.user) return res.status(401).json(resHelpers.jsonUnauthorisedMessage);

	RowingData
		.find({
			user: req.user,
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

	    	if (error) return res.status(500).json(resHelpers.jsonErrorMessage);

	      	const sanitisedData: any = data.map((datum: any)=> {
	      		return {
	      			id: datum.id,
	      			date: datum.createdAt,
	      			distance: datum.distance,
	      			time: datum.time
	      		};
	      	});

	      	const params: any = {
				fromDate: req.query.fromDate || undefined,
				toDate: req.query.toDate || undefined,
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

	if(!req.user) return res.status(401).json(resHelpers.jsonUnauthorisedMessage);

	RowingData
		.findById(req.query.id)
		.exec((err, data) => {

	    	if (err) return res.status(500).json(resHelpers.jsonErrorMessage);

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