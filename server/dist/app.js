"use strict";
exports.__esModule = true;
/**
 * Module dependencies.
 */
var express = require('express');
var compression = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var chalk = require('chalk');
var errorHandler = require('errorhandler');
var expressSanitizer = require('express-sanitizer');
var lusca = require('lusca');
var dotenv = require('dotenv');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var expressWs = require('express-ws');
var jwt = require('jsonwebtoken');
//const https = require('https');
//const fs = require('fs');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();
/**
 * Controllers (route handlers).
 */
var homeController = require("./controllers/home");
var sessionsController = require("./controllers/sessions");
var userController = require("./controllers/user");
var wsController = require("./controllers/ws");
/**
 * API keys and Passport configuration.
 */
var passportConfig = require('./config/passport');
/**
 * Create Express server.
 */
var sslOptions = {
    key: '',
    cert: ''
};
var app = express();
//const server = https.createServer(sslOptions, app);
var wsInstance = expressWs(app);
/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function (err) {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});
/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1);
app.enable('trust proxy', 1);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'test',
    store: new MongoStore({
        url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
        autoReconnect: true,
        clear_interval: 3600
    })
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(lusca.csrf({ secret: 'test' }));
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));
app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_TOKEN_SECRET, function (error, decode) {
            req.user = error ? undefined : decode.user;
            next();
        });
    }
    else {
        next();
    }
});
app.use(function (req, res, next) {
    req.wsInstance = wsInstance;
    next();
});
app.use(express.static(path.join(__dirname, '/../../public'), { maxAge: 31557600000 }));
/**
 * API routes.
 */
app.get('/api/sessions', sessionsController.getSessions);
app.get('/api/sessions/totals', sessionsController.getSessionTotals);
app.get('/api/session', sessionsController.getSession);
app.post('/api/session/update', sessionsController.updateSession);
app.post('/api/session/delete', sessionsController.deleteSession);
app.post('/api/login', userController.postLogin);
app.post('/api/forgot', userController.postForgot);
app.post('/api/reset/:token', userController.postReset);
app.post('/api/register', userController.postSignup);
app.post('/api/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/api/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/api/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.ws('/api', wsController.recordSession);
/**
 * App route.
 */
app.get('*', homeController.index);
/**
 * Error Handler.
 */
app.use(errorHandler());
/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
module.exports = app;
