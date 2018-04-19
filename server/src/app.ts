/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const expressSanitizer = require('express-sanitizer');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressWs = require('express-ws');
const jwt = require('jsonwebtoken');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

/**
 * Controllers (route handlers).
 */
import * as homeController from './controllers/home';
import * as sessionsController from './controllers/sessions';
import * as userController from './controllers/user';
import * as wsController from './controllers/ws';

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();
const wsHandler = expressWs(app);

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
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

app.use((req, res, next) => {

  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){

    jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_TOKEN_SECRET, (error, decode) => {

      req.user = error ? undefined : decode.user;
      next();

    });

  } else {
    next();
  }

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
app.post('/api/signup', userController.postSignup);
app.post('/api/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/api/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/api/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.ws('/api/socket', wsController.recordSession);

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
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;