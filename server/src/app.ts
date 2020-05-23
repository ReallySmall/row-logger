/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const expressSanitizer = require('express-sanitizer');
const lusca = require('lusca');
const dotenv = require('dotenv');
const path = require('path');
const expressValidator = require('express-validator');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

/**
 * Create Express server.
 */
const sslOptions = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/certificate.pem')
};

const app = express();
const server = https.createServer(sslOptions, app).listen(443);

// If in dev enable HMR
if (process.env.NODE_ENV === 'development') {

  const config = require('../../webpack.dev.app.config.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: '/',
    stats: { colors: true }
  }));

  app.use(webpackHotMiddleware(compiler));

}

/**
 * Express configuration.
 */
app.set('host', '0.0.0.0');
app.set('port', process.env.PORT || 8080);
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
app.use(helmet());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.static(path.join(path.resolve(), '/public'), { maxAge: 31557600000 }));

/**
 * App route.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve() + '/server/dist/index.html'));
});

//app.get('*', function(req, res) {
    //res.redirect('https://' + req.headers.host + req.url);
//});

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