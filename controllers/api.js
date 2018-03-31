const mongoose = require('mongoose');
const User = require('../models/User');
const RowingData = require('../models/RowingData');
const rowingDataHelpers = require('../helpers/rowingDataHelper');

const cachedRowingApiData = {};

let timeOut = null;

const isInvalidJson = (input) => {

   try {
      JSON.parse(input);
   } catch(ex) {
      return ex.message; // Is invalid 
   }

   return false; // Is valid 

}

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

    console.log(msgString);

    if(isInvalidJson(msgString)){
      ws.terminate();
      return;
    }

    const { key, machineId, damping, multi, base, data } = JSON.parse(msgString);

    if(!key || typeof key !== 'string'){
      ws.terminate();
      return;
    }

    const rawData = typeof data === 'string' ? data.split(',') : [];
    const times = rawData.map(datum => parseInt(base) + parseInt(datum));

    clearTimeout(timeOut);

    if(!cachedRowingApiData[key]){

      User.findOne({ rowingDataApiKey: key }, (err, existingUser) => {

        if(err || !existingUser){
          ws.terminate();
          return;
        }

        if(machineId && damping && multi && base){

          cachedRowingApiData[key] = {
            user: existingUser._id,
            machineId: machineId,
            damping: damping,
            multi: multi,
            times: times
          }

          saveRowingData(key, 10000);

        } else if(!base){

          ws.send(JSON.stringify({
            base: Date.now().toString() 
          }), (error) => {
            if(error){ 
              console.log(error)
            }
          });

        }

      });

    } else {

      times.map(time => {

        // if time is not a duplicate reading
        if(cachedRowingApiData[key].times.indexOf(time) < 0){
          cachedRowingApiData[key].times.push(time);
        }

      });

      saveRowingData(key, 10000);

    }

  });

}
