const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), { multiArgs: true });
const graph = require('fbgraph');
const GitHub = require('github');
const Linkedin = require('node-linkedin')(process.env.LINKEDIN_ID, process.env.LINKEDIN_SECRET, process.env.LINKEDIN_CALLBACK_URL);
const paypal = require('paypal-rest-sdk');
const ig = bluebird.promisifyAll(require('instagram-node').instagram());
const User = require('../models/User');
const RowingData = require('../models/RowingData');

const cachedRowingApiData = {};
let timeOut;

const saveRowingData = (key) => {

  timeOut = setTimeout(() => {

    const rowingData = new RowingData(cachedRowingApiData[key]);

    rowingData.save()
      .then(item => {
        console.log("data saved");
      })
      .catch(err => {
        console.log("unable to save data");
      });

    delete cachedRowingApiData[key];

  }, 5000);

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

        cachedRowingApiData[key].times = [...cachedRowingApiData[key].times, ...times];
        saveRowingData(key);

        return res.status(200).end(); 

    } else {

      User.findOne({ rowingDataApiKey: key }, (err, existingUser) => {
      
        if (err) { 
          return res.status(500).end();
        } else if (!existingUser) { 
          return res.status(401).end();
        }

        else if (existingUser) {

          cachedRowingApiData[key] = {
            user: existingUser._id,
            machineId: machineId,
            damping: damping,
            multi: multi,
            times: times
          }

          saveRowingData(key);

          return res.status(200).end();

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

  User.findOne({ rowingDataApiKey: key }, (err, existingUser) => {
    
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
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = (req, res, next) => {
  const github = new GitHub();
  github.repos.get({ owner: 'sahat', repo: 'hackathon-starter' }, (err, repo) => {
    if (err) { return next(err); }
    res.render('api/github', {
      title: 'GitHub API',
      repo
    });
  });
};

/**
 * GET /api/paypal
 * PayPal SDK example.
 */
exports.getPayPal = (req, res, next) => {
  paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_ID,
    client_secret: process.env.PAYPAL_SECRET
  });

  const paymentDetails = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: process.env.PAYPAL_RETURN_URL,
      cancel_url: process.env.PAYPAL_CANCEL_URL
    },
    transactions: [{
      description: 'Hackathon Starter',
      amount: {
        currency: 'USD',
        total: '1.99'
      }
    }]
  };

  paypal.payment.create(paymentDetails, (err, payment) => {
    if (err) { return next(err); }
    req.session.paymentId = payment.id;
    const links = payment.links;
    for (let i = 0; i < links.length; i++) {
      if (links[i].rel === 'approval_url') {
        res.render('api/paypal', {
          approvalUrl: links[i].href
        });
      }
    }
  });
};

/**
 * GET /api/paypal/success
 * PayPal SDK example.
 */
exports.getPayPalSuccess = (req, res) => {
  const paymentId = req.session.paymentId;
  const paymentDetails = { payer_id: req.query.PayerID };
  paypal.payment.execute(paymentId, paymentDetails, (err) => {
    res.render('api/paypal', {
      result: true,
      success: !err
    });
  });
};

/**
 * GET /api/paypal/cancel
 * PayPal SDK example.
 */
exports.getPayPalCancel = (req, res) => {
  req.session.paymentId = null;
  res.render('api/paypal', {
    result: true,
    canceled: true
  });
};

/**
 * GET /api/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
  res.render('api/upload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = (req, res) => {
  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.redirect('/api/upload');
};

exports.getGoogleMaps = (req, res) => {
  res.render('api/google-maps', {
    title: 'Google Maps API'
  });
};
