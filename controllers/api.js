const mongoose = require('mongoose');
const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), { multiArgs: true });
const graph = require('fbgraph');
const GitHub = require('github');
const Linkedin = require('node-linkedin')(process.env.LINKEDIN_ID, process.env.LINKEDIN_SECRET, process.env.LINKEDIN_CALLBACK_URL);
const paypal = require('paypal-rest-sdk');
const ig = bluebird.promisifyAll(require('instagram-node').instagram());
const User = require('../models/User');
const RowingData = require('../models/RowingData');
const rowingDataHelpers = require('../helpers/rowingDataHelper');

const cachedRowingApiData = {};

let timeOut = null;

/**
 * Update rowing totals.
 */
const updateRowingTotals = (userId, multi) => {

  RowingData.find({ user: userId }, (err, rowingSessionData) => {
  
    const timesArrayArray = rowingSessionData.map(datum => datum.times);
    const totalMetres = rowingDataHelpers.timesToMetres(timesArrayArray, multi, 4.805);
    const totalTime = rowingDataHelpers.timesToTotalMillis(timesArrayArray);

    User.findById(mongoose.Types.ObjectId(userId), (err, user) => {

      if(err){
        console.log(err);
      } else {
        user.rowingTotalMetres = totalMetres;
        user.rowingTotalTime = totalTime;
        user.save((err) => {
          if(err){
            console.log(err);
          }
        });
      }

    });

  });

}

/**
 * Save rowing data.
 */
const saveRowingData = (key, timeOutMillis) => {

  timeOut = setTimeout(() => {

    const rowingData = new RowingData(cachedRowingApiData[key]);

    rowingData
      .save()
      .then(item => {
        console.log("data saved");
        updateRowingTotals(rowingData.user, 10);
      })
      .catch(err => {
        console.log("unable to save data");
      });

    delete cachedRowingApiData[key];

  }, timeOutMillis);

}

/**
 * POST /api/rowingData
 * Log rowing data.
 */
exports.postRowingData = (req, res, next) => {

  const { key, machineId, damping, multi, base, data } = req.body;
  const rawData = typeof data === 'string' ? data.split(',') : [];
  const times = rawData.map(datum => parseInt(base) + parseInt(datum));

  clearTimeout(timeOut);

  if(!key || !machineId || !damping || !multi ||!base){

    return res.status(400).end();

  } else {

    if(cachedRowingApiData[key]){

        times.map(time => {

          if(cachedRowingApiData[key].times.indexOf(time) < 0){
            cachedRowingApiData[key].times.push(time);
          }

        });

        saveRowingData(key, 10000);

        return res
          .status(200)
          .end(); 

    } else {

      User.findOne({ rowingDataApiKey: key }, (err, existingUser) => {
      
        if (err) { 
          return res
            .status(500)
            .end();
        } else if (!existingUser) { 
          return res
            .status(401)
            .end();
        }

        else if (existingUser) {

          cachedRowingApiData[key] = {
            user: existingUser._id,
            machineId: machineId,
            damping: damping,
            multi: multi,
            times: times
          }

          saveRowingData(key, 10000);

          return res
            .status(200)
            .end();

        }

      });

    }

  }

};

/**
 * POST /api/currentTime
 * Return current time.
 */
exports.getCurrentTime = (req, res, next) => {

  User.findOne({ rowingDataApiKey: req.body.key }, (err, existingUser) => {
    
    if (err) { 
      return res.status(500).end();
    } else if (!existingUser) { 
      return res.status(401).end();
    }

    else if (existingUser) {

      res
        .status(200)
        .json(Date.now());

    }

  });

};

/**
 * POST /api/rowingData/delete
 * Delete rowing session.
 */
exports.deleteRowingData = (req, res, next) => {

  if(req.user){

    const sessionId = req.body.sessionId;

    RowingData.findByIdAndRemove(sessionId, req.body, (err, data) => {
    
      if(!err){
        updateRowingTotals(req.user._id, 10);
        req.flash('success', { msg: 'Session deleted.' });
        return res.redirect('/sessions');
      } else {
        return res
          .status(500)
          .render('error', {
            title: 'Unexpected error'
          });
      }

    });

  }

};

/**
 * POST /api/rowingData/update
 * Update rowing session.
 */
exports.updateRowingData = (req, res, next) => {

  const sessionId = req.body.sessionId;
  const refDistance = req.body.refDistance;

  RowingData.findByIdAndUpdate(sessionId, {$set: { refDistance: refDistance }}, (err, doc) => {
    
    if(!err){
      req.flash('success', { msg: 'Session updated.' });
      return res.status(200).redirect('back');
    } else {
      return res
        .status(500)
        .render('error', {
          title: 'Unexpected error'
        });
    }

  });

};


exports.socketHandler = (ws, req) => {

  ws.on('message', msgString => {

    const msgObj = JSON.parse(msgString);
    const { key, machineId, damping, multi, base, data } = msgObj;
    const rawData = typeof data === 'string' ? data.split(',') : [];
    const times = rawData.map(datum => parseInt(base) + parseInt(datum));

    clearTimeout(timeOut);

    if(!key){

      ws.terminate();

    } else {

      if(cachedRowingApiData[key]){

        times.map(time => {

          // if time is not a duplicate reading
          if(cachedRowingApiData[key].times.indexOf(time) < 0){
            cachedRowingApiData[key].times.push(time);
          }

        });

        saveRowingData(key, 10000);

        ws.send(Date.now());

      } else {

        User.findOne({ rowingDataApiKey: key }, (err, existingUser) => {

          if(err || !existingUser){

            ws.terminate();

          } else {

            if(machineId && damping && multi && base){

              cachedRowingApiData[key] = {
                user: existingUser._id,
                machineId: machineId,
                damping: damping,
                multi: multi,
                times: times
              }

              saveRowingData(key, 10000);

            }

            ws.send(Date.now());

          }

        });

      }

    }

  });

}
