/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************************************************!*\
  !*** C:/Users/Richard/Documents/row-logger/node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([bth[buf[i++]], bth[buf[i++]], \n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]]]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:///C:/Users/Richard/Documents/row-logger/node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "../../node_modules/uuid/lib/rng.js":
/*!**************************************************************************!*\
  !*** C:/Users/Richard/Documents/row-logger/node_modules/uuid/lib/rng.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Unique ID creation requires a high quality random # generator.  In node.js\n// this is pretty straight-forward - we use the crypto API.\n\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\nmodule.exports = function nodeRNG() {\n  return crypto.randomBytes(16);\n};\n\n\n//# sourceURL=webpack:///C:/Users/Richard/Documents/row-logger/node_modules/uuid/lib/rng.js?");

/***/ }),

/***/ "../../node_modules/uuid/v4.js":
/*!*********************************************************************!*\
  !*** C:/Users/Richard/Documents/row-logger/node_modules/uuid/v4.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"../../node_modules/uuid/lib/rng.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"../../node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack:///C:/Users/Richard/Documents/row-logger/node_modules/uuid/v4.js?");

/***/ }),

/***/ "../../webpack.dev.app.config.js":
/*!***********************************************************************!*\
  !*** C:/Users/Richard/Documents/row-logger/webpack.dev.app.config.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const webpack = __webpack_require__(/*! webpack */ \"webpack\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst glob = __webpack_require__(/*! glob */ \"glob\");\nconst hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';\n\n// variables\nconst sourcePath = path.join(path.resolve() + '/app');\nconst outPath = path.join(path.resolve() + '/public');\n\n// plugins\nconst ExtractTextPlugin = __webpack_require__(/*! extract-text-webpack-plugin */ \"extract-text-webpack-plugin\");\nconst CopyWebpackPlugin = __webpack_require__(/*! copy-webpack-plugin */ \"copy-webpack-plugin\");\nconst PurifyCSSPlugin = __webpack_require__(/*! purifycss-webpack */ \"purifycss-webpack\");\nconst CleanWebpackPlugin = __webpack_require__(/*! clean-webpack-plugin */ \"clean-webpack-plugin\");\nconst StatsPlugin = __webpack_require__(/*! stats-webpack-plugin */ \"stats-webpack-plugin\");\nconst BundlingVisualizer = __webpack_require__(/*! webpack-visualizer-plugin */ \"webpack-visualizer-plugin\");\nconst TSLintPlugin = __webpack_require__(/*! tslint-webpack-plugin */ \"tslint-webpack-plugin\");\n\n// polyfills\n__webpack_require__(/*! whatwg-fetch */ \"whatwg-fetch\");\n__webpack_require__(/*! babel-polyfill */ \"babel-polyfill\");\n\nmodule.exports = {\n  mode: 'development',\n  context: sourcePath,\n  entry: {\n    main: [hotMiddlewareScript, 'babel-polyfill', 'whatwg-fetch', './index.tsx'] // the route files that Webpack should start from to find and bundle the app's assets\n  },\n  output: {\n    path: outPath,\n    publicPath: '/',\n    filename: '[name].js',\n  },\n  target: 'web',\n  resolve: {\n    extensions: ['.js', '.ts', '.tsx'],\n    // Fix webpack's default behavior to not load packages with jsnext:main module\n    // https://github.com/Microsoft/TypeScript/issues/11677\n    mainFields: ['main']\n  },\n  module: {\n    rules: [\n      // compile ts, tsx to JS\n      {\n        test: /\\.tsx?$/,\n        use: 'awesome-typescript-loader'\n      },\n      {\n      test: /\\.scss$/,\n        use: [\n          \"style-loader\", // creates style nodes from JS strings\n          \"css-loader\", // translates CSS into CommonJS\n          \"sass-loader\" // compiles Sass to CSS\n        ]\n      }\n    ]\n  },\n  plugins: [\n    new webpack.DefinePlugin({\n      __ISDEVENV__: true\n    }),\n    new TSLintPlugin({ // linting\n        files: ['./app/**/*.ts', '.app/**/*.tsx'],\n        fix: true,\n        config: './tslint.json'\n    }),\n    new webpack.HotModuleReplacementPlugin()\n  ] // run plugins on the bundles\n};\n\n//# sourceURL=webpack:///C:/Users/Richard/Documents/row-logger/webpack.dev.app.config.js?");

/***/ }),

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar compression = __webpack_require__(/*! compression */ \"compression\");\r\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\r\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nvar logger = __webpack_require__(/*! morgan */ \"morgan\");\r\nvar chalk = __webpack_require__(/*! chalk */ \"chalk\");\r\nvar errorHandler = __webpack_require__(/*! errorhandler */ \"errorhandler\");\r\nvar expressSanitizer = __webpack_require__(/*! express-sanitizer */ \"express-sanitizer\");\r\nvar lusca = __webpack_require__(/*! lusca */ \"lusca\");\r\nvar dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\r\nvar MongoStore = __webpack_require__(/*! connect-mongo */ \"connect-mongo\")(session);\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar passport = __webpack_require__(/*! passport */ \"passport\");\r\nvar expressValidator = __webpack_require__(/*! express-validator */ \"express-validator\");\r\nvar expressWs = __webpack_require__(/*! express-ws */ \"express-ws\");\r\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nvar https = __webpack_require__(/*! https */ \"https\");\r\nvar fs = __webpack_require__(/*! fs */ \"fs\");\r\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\r\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\r\nvar webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\r\nvar webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\r\ndotenv.config();\r\nvar sessionsController = __webpack_require__(/*! ./controllers/sessions */ \"./controllers/sessions.ts\");\r\nvar userController = __webpack_require__(/*! ./controllers/user */ \"./controllers/user.ts\");\r\nvar wsController = __webpack_require__(/*! ./controllers/ws */ \"./controllers/ws.ts\");\r\nvar passportConfig = __webpack_require__(/*! ./config/passport */ \"./config/passport.ts\");\r\nvar sslOptions = {\r\n    key: fs.readFileSync('./ssl/key.pem'),\r\n    cert: fs.readFileSync('./ssl/certificate.pem')\r\n};\r\nvar app = express();\r\nvar server = https.createServer(sslOptions, app).listen(443);\r\nvar wsInstance = expressWs(app, server);\r\nif (true) {\r\n    var config = __webpack_require__(/*! ../../webpack.dev.app.config.js */ \"../../webpack.dev.app.config.js\");\r\n    var compiler = webpack(config);\r\n    app.use(webpackDevMiddleware(compiler, {\r\n        noInfo: false,\r\n        publicPath: '/',\r\n        stats: { colors: true }\r\n    }));\r\n    app.use(webpackHotMiddleware(compiler));\r\n}\r\nmongoose.Promise = global.Promise;\r\nmongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useMongoClient: true });\r\nmongoose.connection.on('error', function (err) {\r\n    console.error(err);\r\n    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));\r\n    process.exit();\r\n});\r\napp.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');\r\napp.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);\r\napp.set('views', path.join(__dirname, 'views'));\r\napp.set('view engine', 'pug');\r\napp.set('trust proxy', 1);\r\napp.enable('trust proxy', 1);\r\napp.use(compression());\r\napp.use(logger('dev'));\r\napp.use(bodyParser.json());\r\napp.use(bodyParser.urlencoded({ extended: true }));\r\napp.use(expressSanitizer());\r\napp.use(expressValidator());\r\napp.use(helmet());\r\napp.use(session({\r\n    resave: true,\r\n    saveUninitialized: true,\r\n    secret: 'test',\r\n    store: new MongoStore({\r\n        url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,\r\n        autoReconnect: true,\r\n        clear_interval: 3600\r\n    })\r\n}));\r\napp.use(passport.initialize());\r\napp.use(passport.session());\r\napp.use(lusca.xframe('SAMEORIGIN'));\r\napp.use(lusca.xssProtection(true));\r\napp.use(function (req, res, next) {\r\n    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {\r\n        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_TOKEN_SECRET, function (error, decode) {\r\n            req.user = error ? undefined : decode.user;\r\n            next();\r\n        });\r\n    }\r\n    else {\r\n        next();\r\n    }\r\n});\r\napp.use(express.static(path.join(path.resolve(), '/public'), { maxAge: 31557600000 }));\r\napp.get('/api/account', userController.getUserData);\r\napp.get('/api/sessions', sessionsController.getSessions);\r\napp.get('/api/sessions/totals', sessionsController.getSessionTotals);\r\napp.get('/api/session', sessionsController.getSession);\r\napp.post('/api/session/update', sessionsController.updateSession);\r\napp.post('/api/session/delete', sessionsController.deleteSession);\r\napp.post('/api/login', userController.postLogin);\r\napp.post('/api/register', userController.postSignup);\r\napp.post('/api/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);\r\napp.post('/api/account/rower', passportConfig.isAuthenticated, userController.postUpdateProfile);\r\napp.post('/api/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);\r\napp.post('/api/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);\r\napp.ws('/', wsController.recordSession);\r\napp.get('*', function (req, res) {\r\n    res.sendFile(path.join(path.resolve() + '/server/dist/index.html'));\r\n});\r\napp.use(errorHandler());\r\napp.listen(app.get('port'), function () {\r\n    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));\r\n    console.log('  Press CTRL-C to stop\\n');\r\n});\r\nmodule.exports = app;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./app.ts?");

/***/ }),

/***/ "./config/passport.ts":
/*!****************************!*\
  !*** ./config/passport.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar passport = __webpack_require__(/*! passport */ \"passport\");\r\nvar request = __webpack_require__(/*! request */ \"request\");\r\nvar LocalStrategy = __webpack_require__(/*! passport-local */ \"passport-local\").Strategy;\r\nvar User_1 = __webpack_require__(/*! ../models/User */ \"./models/User.ts\");\r\npassport.serializeUser(function (user, done) {\r\n    done(null, user.id);\r\n});\r\npassport.deserializeUser(function (id, done) {\r\n    User_1.User.findById(id, function (err, user) {\r\n        done(err, user);\r\n    });\r\n});\r\npassport.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {\r\n    User_1.User.findOne({ email: email.toLowerCase() }, function (err, user) {\r\n        if (err) {\r\n            return done(err);\r\n        }\r\n        if (!user) {\r\n            return done(null, false, { msg: \"Email \" + email + \" not found.\" });\r\n        }\r\n        user.comparePassword(password, function (err, isMatch) {\r\n            if (err) {\r\n                return done(err);\r\n            }\r\n            if (isMatch) {\r\n                return done(null, user);\r\n            }\r\n            return done(null, false, { msg: 'Invalid email or password.' });\r\n        });\r\n    });\r\n}));\r\nexports.isAuthenticated = function (req, res, next) {\r\n    if (req.isAuthenticated()) {\r\n        return next();\r\n    }\r\n    res.redirect('/login');\r\n};\r\nexports.isAuthorized = function (req, res, next) {\r\n    var provider = req.path.split('/').slice(-1)[0];\r\n    var token = req.user.tokens.find(function (token) { return token.kind === provider; });\r\n    if (token) {\r\n        next();\r\n    }\r\n    else {\r\n        res.redirect(\"/auth/\" + provider);\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./config/passport.ts?");

/***/ }),

/***/ "./constants/actions.ts":
/*!******************************!*\
  !*** ./constants/actions.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.WEBSOCKET_CLIENT_CONNECTED = 'WEBSOCKET:CLIENT_CONNECTED';\r\nexports.WEBSOCKET_CLIENT_DISCONNECTED = 'WEBSOCKET:CLIENT_DISCONNECTED';\r\nexports.WEBSOCKET_LOGGER_CONNECTED = 'WEBSOCKET:LOGGER_CONNECTED';\r\nexports.WEBSOCKET_LOGGER_DISCONNECTED = 'WEBSOCKET:LOGGER_DISCONNECTED';\r\nexports.WEBSOCKET_MESSAGE = 'WEBSOCKET:MESSAGE';\r\n\n\n//# sourceURL=webpack:///./constants/actions.ts?");

/***/ }),

/***/ "./controllers/sessions.ts":
/*!*********************************!*\
  !*** ./controllers/sessions.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar moment = __webpack_require__(/*! moment */ \"moment\");\r\nvar User_1 = __webpack_require__(/*! ../models/User */ \"./models/User.ts\");\r\nvar RowingData_1 = __webpack_require__(/*! ../models/RowingData */ \"./models/RowingData.ts\");\r\nvar rowingDataHelpers = __webpack_require__(/*! ../helpers/rowingDataHelper */ \"./helpers/rowingDataHelper.ts\");\r\nvar resHelpers = __webpack_require__(/*! ../helpers/resHelper */ \"./helpers/resHelper.ts\");\r\nexports.getSessionTotals = function (req, res) {\r\n    if (!req.user)\r\n        return res.status(401).json(resHelpers.jsonUnauthorisedMessage);\r\n    User_1.User.findById(req.user, function (error, user) {\r\n        if (error)\r\n            return res.status(500).json(resHelpers.jsonErrorMessage);\r\n        res.status(200).json({\r\n            date: user.createdAt,\r\n            distance: user.rowingTotalMetres || 0,\r\n            time: user.rowingTotalTime || 0\r\n        });\r\n    });\r\n};\r\nexports.getSessions = function (req, res) {\r\n    var limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;\r\n    if (!req.user)\r\n        return res.status(401).json(resHelpers.jsonUnauthorisedMessage);\r\n    RowingData_1.RowingData\r\n        .find({ user: req.user })\r\n        .select('-id -user')\r\n        .sort('-createdAt')\r\n        .limit(limit)\r\n        .lean({ virtuals: true })\r\n        .exec(function (error, data) {\r\n        if (error)\r\n            return res.status(500).json(resHelpers.jsonErrorMessage);\r\n        var sanitisedData = data.map(function (datum) {\r\n            return {\r\n                id: datum.id,\r\n                date: datum.createdAt,\r\n                distance: datum.distance,\r\n                time: datum.time\r\n            };\r\n        });\r\n        res.status(200).json(sanitisedData);\r\n    });\r\n};\r\nexports.getSession = function (req, res) {\r\n    if (!req.user)\r\n        return res.status(401).json(resHelpers.jsonUnauthorisedMessage);\r\n    RowingData_1.RowingData\r\n        .findById(req.query.id)\r\n        .exec(function (err, data) {\r\n        if (err)\r\n            return res.status(500).json(resHelpers.jsonErrorMessage);\r\n        if (!data || !data.user || data.user.toString() !== req.user) {\r\n            return res.status(404).json(resHelpers.jsonNotFoundMessage);\r\n        }\r\n        res.status(200).json(data);\r\n    });\r\n};\r\nexports.deleteSession = function (req, res, next) {\r\n    if (req.user) {\r\n        var sessionId_1 = req.body.sessionId;\r\n        RowingData_1.RowingData.findById(sessionId_1, req.body, function (error, data) {\r\n            if (error)\r\n                return res.status(500).json(resHelpers.jsonErrorMessage);\r\n            if (data.user === req.user) {\r\n                RowingData_1.RowingData.findByIdAndRemove(sessionId_1, req.body, function (error, data) {\r\n                    if (error)\r\n                        return res.status(500).json(resHelpers.jsonErrorMessage);\r\n                    rowingDataHelpers.updateRowingTotals(req.user._id, 10);\r\n                    return res.status(200);\r\n                });\r\n            }\r\n            return res.status(401).json(resHelpers.jsonUnauthorisedMessage);\r\n        });\r\n    }\r\n};\r\nexports.updateSession = function (req, res, next) {\r\n    var sessionId = req.body.sessionId;\r\n    var note = req.body.note;\r\n    RowingData_1.RowingData.findByIdAndUpdate(sessionId, { $set: { note: note } }, function (error, data) {\r\n        if (error)\r\n            return res.status(500).json(resHelpers.jsonErrorMessage);\r\n        if (data.user !== req.user)\r\n            return res.status(401).json(resHelpers.jsonErrorMessage);\r\n        return res.status(200);\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./controllers/sessions.ts?");

/***/ }),

/***/ "./controllers/user.ts":
/*!*****************************!*\
  !*** ./controllers/user.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar resHelpers = __webpack_require__(/*! ../helpers/resHelper */ \"./helpers/resHelper.ts\");\r\nvar bluebird = __webpack_require__(/*! bluebird */ \"bluebird\");\r\nvar crypto = bluebird.promisifyAll(__webpack_require__(/*! crypto */ \"crypto\"));\r\nvar nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\r\nvar passport = __webpack_require__(/*! passport */ \"passport\");\r\nvar dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\r\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nvar User_1 = __webpack_require__(/*! ../models/User */ \"./models/User.ts\");\r\ndotenv.config();\r\nexports.getUserData = function (req, res, next) {\r\n    if (!req.user)\r\n        return res.status(401).json(resHelpers.jsonUnauthorisedMessage);\r\n    User_1.User.findById(req.user, function (error, user) {\r\n        if (error)\r\n            return res.status(500).json(resHelpers.jsonErrorMessage);\r\n        res.status(200).json({\r\n            email: user.email,\r\n            userName: user.userName,\r\n            rowerType: user.rowingRowerType,\r\n            rowerDamping: user.rowingRowerDamping\r\n        });\r\n    });\r\n};\r\nexports.postLogin = function (req, res, next) {\r\n    req.assert('email', 'Email is not valid').isEmail();\r\n    req.assert('password', 'Password cannot be blank').notEmpty();\r\n    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });\r\n    req.getValidationResult().then(function (result) {\r\n        if (!result.isEmpty()) {\r\n            var errors = result.array().map(function (elem) { return elem.msg; });\r\n            return res.status(401).json({ message: errors });\r\n        }\r\n        else {\r\n            passport.authenticate('local', function (error, user, info) {\r\n                if (error)\r\n                    return next(error);\r\n                if (!user)\r\n                    return res.status(401).json({ message: 'Login failed.' });\r\n                req.logIn(user, function (error) {\r\n                    if (error)\r\n                        return next(error);\r\n                    return res\r\n                        .status(200)\r\n                        .header('Transfer-Encoding', '')\r\n                        .json({\r\n                        token: jwt.sign({\r\n                            user: user._id,\r\n                            userName: user.userName,\r\n                            isLogger: req.body.isLogger\r\n                        }, process.env.JWT_TOKEN_SECRET),\r\n                        timestamp: new Date().getTime()\r\n                    });\r\n                });\r\n            })(req, res, next);\r\n        }\r\n    });\r\n};\r\nexports.logout = function (req, res) {\r\n    req.logout();\r\n    res.status(200).json({ message: 'Logged out.' });\r\n};\r\nexports.postSignup = function (req, res, next) {\r\n    req.assert('email', 'Email is not valid').isEmail();\r\n    req.assert('password', 'Password must be at least 4 characters long').len(4);\r\n    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);\r\n    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });\r\n    req.getValidationResult().then(function (result) {\r\n        if (!result.isEmpty()) {\r\n            var errors = result.array().map(function (elem) { return elem.msg; });\r\n            return res.status(401).json({ message: errors });\r\n        }\r\n        else {\r\n            var user_1 = new User_1.User({\r\n                email: req.body.email,\r\n                userName: req.body.userName,\r\n                password: req.body.password\r\n            });\r\n            User_1.User.findOne({ email: req.body.email }, function (error, existingUser) {\r\n                if (error)\r\n                    return next(error);\r\n                if (existingUser)\r\n                    return res.status(200).json({ message: 'A user with this email already exists' });\r\n                user_1.save(function (error) {\r\n                    if (error)\r\n                        return next(error);\r\n                    req.logIn(user_1, function (error) {\r\n                        if (error)\r\n                            return next(error);\r\n                        return res\r\n                            .status(200)\r\n                            .json({\r\n                            token: jwt.sign({\r\n                                user: user_1._id,\r\n                                userName: user_1.userName\r\n                            }, process.env.JWT_TOKEN_SECRET),\r\n                            timestamp: new Date().getTime()\r\n                        });\r\n                    });\r\n                });\r\n            });\r\n        }\r\n    });\r\n};\r\nexports.postUpdateProfile = function (req, res, next) {\r\n    req.assert('email', 'Please enter a valid email address.').isEmail();\r\n    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });\r\n    req.getValidationResult().then(function (result) {\r\n        if (!result.isEmpty()) {\r\n            var errors = result.array().map(function (elem) { return elem.msg; });\r\n            return res.status(400).json({ message: errors });\r\n        }\r\n        else {\r\n            User_1.User.findById(req.user, function (error, user) {\r\n                if (error)\r\n                    return next(error);\r\n                user.userName = req.body.userName || user.userName;\r\n                user.email = req.body.email || user.email;\r\n                user.save(function (error) {\r\n                    if (error) {\r\n                        if (error.code === 11000)\r\n                            return res.status(500);\r\n                        return next(error);\r\n                    }\r\n                    return res.status(200).json({\r\n                        userName: user.userName,\r\n                        email: user.email\r\n                    });\r\n                });\r\n            });\r\n        }\r\n    });\r\n};\r\nexports.postUpdatePassword = function (req, res, next) {\r\n    req.assert('password', 'Password must be at least 4 characters long').len(4);\r\n    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);\r\n    var errors = req.validationErrors();\r\n    if (errors)\r\n        return res.status(400).json({ message: errors });\r\n    User_1.User.findById(req.user.id, function (error, user) {\r\n        if (error)\r\n            return next(error);\r\n        user.password = req.body.password;\r\n        user.save(function (error) {\r\n            if (error)\r\n                return next(error);\r\n            res.status(200);\r\n        });\r\n    });\r\n};\r\nexports.postDeleteAccount = function (req, res, next) {\r\n    User_1.User.remove({ _id: req.user }, function (error) {\r\n        if (error)\r\n            return next(error);\r\n        req.logout();\r\n        res.redirect('/');\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./controllers/user.ts?");

/***/ }),

/***/ "./controllers/ws.ts":
/*!***************************!*\
  !*** ./controllers/ws.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nvar User_1 = __webpack_require__(/*! ../models/User */ \"./models/User.ts\");\r\nvar RowerTypes_1 = __webpack_require__(/*! ../models/RowerTypes */ \"./models/RowerTypes.ts\");\r\nvar rowingDataRecorder_1 = __webpack_require__(/*! ../helpers/rowingDataRecorder */ \"./helpers/rowingDataRecorder.ts\");\r\nvar wsHelpers = __webpack_require__(/*! ../helpers/wsHelper */ \"./helpers/wsHelper.ts\");\r\nvar actions = __webpack_require__(/*! ../constants/actions */ \"./constants/actions.ts\");\r\nvar uuidv4 = __webpack_require__(/*! uuid/v4 */ \"../../node_modules/uuid/v4.js\");\r\nvar rowingDataRecorder = new rowingDataRecorder_1.RowingDataRecorder();\r\nvar activeSessions = {};\r\nvar heartBeat = function (ws, req) {\r\n    if (activeSessions[req.user]) {\r\n        var connectionId = ws.connectionId;\r\n        if (activeSessions[req.user].clients[connectionId]) {\r\n            activeSessions[req.user].clients[connectionId].isAlive = true;\r\n        }\r\n    }\r\n};\r\nexports.recordSession = function (ws, req) {\r\n    ws.connectionId = uuidv4();\r\n    ws.isAlive = true;\r\n    var authenticationWindow = setTimeout(function () {\r\n        if (req && !req.user && ws)\r\n            ws.terminate();\r\n    }, 5000);\r\n    var pingPongConnectionCheck = setInterval(function () {\r\n        if (activeSessions[req.user]) {\r\n            var disconnectedClients_1 = [];\r\n            var connectedClientsCount = Object.keys(activeSessions[req.user].clients).length;\r\n            Object.keys(activeSessions[req.user].clients).forEach(function (clientId, index) {\r\n                var client = activeSessions[req.user].clients[clientId];\r\n                if (!client.isAlive) {\r\n                    delete activeSessions[req.user].clients[clientId];\r\n                    disconnectedClients_1.push({\r\n                        connectionId: client.connectionId,\r\n                        isLogger: client.isLogger\r\n                    });\r\n                    return;\r\n                }\r\n                client.isAlive = false;\r\n                client.ping(function () { });\r\n            });\r\n            if (disconnectedClients_1.length) {\r\n                console.log(\"There are \" + disconnectedClients_1.length + \" disconnected clients\");\r\n                Object.keys(activeSessions[req.user].clients).forEach(function (clientId, index) {\r\n                    var client = activeSessions[req.user].clients[clientId];\r\n                    disconnectedClients_1.forEach(function (data, index) {\r\n                        if (data.connectionId !== client.connectionId) {\r\n                            client.send(wsHelpers.createWsMessage(data.isLogger ? actions.WEBSOCKET_LOGGER_DISCONNECTED : actions.WEBSOCKET_CLIENT_DISCONNECTED, 'A socket disconnected', false), function (error) { return wsHelpers.handleWsError(error); });\r\n                        }\r\n                    });\r\n                });\r\n            }\r\n            if (connectedClientsCount - disconnectedClients_1.length < 1) {\r\n                delete activeSessions[req.user];\r\n            }\r\n        }\r\n    }, 5000);\r\n    ws.on('pong', function () { return heartBeat(ws, req); });\r\n    ws.on('close', function () {\r\n        clearTimeout(authenticationWindow);\r\n        if (activeSessions[req.user]) {\r\n            var connectedClients_1 = 0;\r\n            Object.keys(activeSessions[req.user].clients).forEach(function (clientId, index) {\r\n                var client = activeSessions[req.user].clients[clientId];\r\n                client.send(wsHelpers.createWsMessage(ws.isLogger ? actions.WEBSOCKET_LOGGER_DISCONNECTED : actions.WEBSOCKET_CLIENT_DISCONNECTED, 'A socket disconnected', false), function (error) { return wsHelpers.handleWsError(error); });\r\n                console.log(ws.isLogger ? 'Logger disconnected' : 'Client connected');\r\n                if (client.connectionId === ws.connectionId) {\r\n                    delete activeSessions[req.user].clients[clientId];\r\n                }\r\n                else {\r\n                    connectedClients_1++;\r\n                }\r\n            });\r\n            if (!connectedClients_1) {\r\n                delete activeSessions[req.user];\r\n            }\r\n        }\r\n    });\r\n    ws.on('message', function (messageJSON) {\r\n        var message = wsHelpers.parseWsMessage(messageJSON);\r\n        if (!message) {\r\n            ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid JSON or incorrect structure in message', true), function (error) { return wsHelpers.handleWsError(error); });\r\n            ws.terminate();\r\n            return;\r\n        }\r\n        if (!req.user) {\r\n            console.log('authenticating');\r\n            jwt.verify(message.payload, process.env.JWT_TOKEN_SECRET, function (error, token) {\r\n                if (error) {\r\n                    console.log('jwt error', error);\r\n                    ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid token', true), function (error) { return wsHelpers.handleWsError(error); });\r\n                    ws.terminate();\r\n                    return;\r\n                }\r\n                req.user = token.user;\r\n                ws.isLogger = token.isLogger;\r\n                if (!activeSessions[req.user]) {\r\n                    activeSessions[req.user] = {\r\n                        clients: {}\r\n                    };\r\n                }\r\n                Object.keys(activeSessions[req.user].clients).forEach(function (clientId, index) {\r\n                    var client = activeSessions[req.user].clients[clientId];\r\n                    client.send(wsHelpers.createWsMessage(actions.WEBSOCKET_CLIENT_CONNECTED, 'A socket connected and authenticated', false), function (error) { return wsHelpers.handleWsError(error); });\r\n                    if (ws.isLogger) {\r\n                        client.send(wsHelpers.createWsMessage(actions.WEBSOCKET_LOGGER_CONNECTED, 'Logger connection state updated', false), function (error) { return wsHelpers.handleWsError(error); });\r\n                        console.log(\"Client is logger: \" + ws.isLogger);\r\n                    }\r\n                });\r\n                activeSessions[req.user].clients[ws.connectionId] = ws;\r\n                console.log(\"User session contains \" + Object.keys(activeSessions[req.user].clients).length + \" active clients\");\r\n            });\r\n        }\r\n        else {\r\n            console.log('Recieved message: ', message);\r\n            var _a = JSON.parse(message.payload), base_1 = _a.base, data = _a.data;\r\n            var times_1 = data && data.length ? data.map(function (datum) { return parseInt(base_1, 10) + parseInt(datum, 10); }) : [];\r\n            rowingDataRecorder.cancelSaveTimeOut(req.user);\r\n            if (!rowingDataRecorder.sessionExists(req.user)) {\r\n                User_1.User.findById(req.user, function (error, user) {\r\n                    if (error || !user) {\r\n                        ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), function (error) { return wsHelpers.handleWsError(error); });\r\n                        ws.terminate();\r\n                        return;\r\n                    }\r\n                    var damping = user.rowingRowerDamping;\r\n                    var rowerType = user.rowingRowerType;\r\n                    var _a = RowerTypes_1.RowerTypes[rowerType], constant = _a.constant, multi = _a.multi;\r\n                    if (damping && base_1 && constant && multi) {\r\n                        rowingDataRecorder.createSession(req.user, user._id, rowerType, damping, multi, times_1);\r\n                        rowingDataRecorder.timeOutThenSave(req.user);\r\n                    }\r\n                    else {\r\n                        ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), function (error) { return wsHelpers.handleWsError(error); });\r\n                        ws.terminate();\r\n                        return;\r\n                    }\r\n                });\r\n            }\r\n            else {\r\n                rowingDataRecorder.addDataToSession(req.user, times_1);\r\n                rowingDataRecorder.timeOutThenSave(req.user);\r\n            }\r\n            if (activeSessions[req.user] && activeSessions[req.user].clients) {\r\n                Object.keys(activeSessions[req.user].clients).forEach(function (clientId, index) {\r\n                    var client = activeSessions[req.user].clients[clientId];\r\n                    client.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, times_1, false), function (error) { return wsHelpers.handleWsError(error); });\r\n                });\r\n            }\r\n        }\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./controllers/ws.ts?");

/***/ }),

/***/ "./helpers/resHelper.ts":
/*!******************************!*\
  !*** ./helpers/resHelper.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.jsonUnauthorisedMessage = { 'message': 'Unathorised' };\r\nexports.jsonErrorMessage = { 'message': 'Unexpected error' };\r\nexports.jsonNotFoundMessage = { 'message': 'Not found' };\r\n\n\n//# sourceURL=webpack:///./helpers/resHelper.ts?");

/***/ }),

/***/ "./helpers/rowingDataHelper.ts":
/*!*************************************!*\
  !*** ./helpers/rowingDataHelper.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar RowingData_1 = __webpack_require__(/*! ../models/RowingData */ \"./models/RowingData.ts\");\r\nvar User_1 = __webpack_require__(/*! ../models/User */ \"./models/User.ts\");\r\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nexports.metrestoKmString = function (metres) {\r\n    return metres < 1000 ? Math.floor(metres) + ' m' : (metres / 1000).toFixed(3) + ' km';\r\n};\r\nexports.timesToMetres = function (timesArrayArray, multi, ratioConstant) {\r\n    var multiplier = parseInt(multi, 10);\r\n    var totalMetres = 0;\r\n    timesArrayArray.map(function (timesArray) {\r\n        var times = timesArray.length;\r\n        var metres = (times * multiplier) / ratioConstant;\r\n        totalMetres += metres;\r\n    });\r\n    return Math.ceil(totalMetres);\r\n};\r\nexports.timesToTotalMillis = function (timesArrayArray) {\r\n    var totalMillis = 0;\r\n    timesArrayArray.map(function (timesArray) {\r\n        if (timesArray.length) {\r\n            var millis = timesArray[timesArray.length - 1] - timesArray[0];\r\n            totalMillis += millis;\r\n        }\r\n    });\r\n    return totalMillis;\r\n};\r\nexports.updateRowingTotals = function (userId, multi) {\r\n    RowingData_1.RowingData.find({ user: userId }, function (err, rowingSessionData) {\r\n        var timesArrayArray = rowingSessionData.map(function (datum) { return datum.times; });\r\n        var totalMetres = exports.timesToMetres(timesArrayArray, multi, 4.805);\r\n        var totalTime = exports.timesToTotalMillis(timesArrayArray);\r\n        User_1.User.findById(mongoose.Types.ObjectId(userId), function (err, user) {\r\n            if (err) {\r\n                console.log(err);\r\n            }\r\n            else {\r\n                user.rowingTotalMetres = totalMetres;\r\n                user.rowingTotalTime = totalTime;\r\n                user.save(function (err) {\r\n                    if (err) {\r\n                        console.log(err);\r\n                    }\r\n                });\r\n            }\r\n        });\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./helpers/rowingDataHelper.ts?");

/***/ }),

/***/ "./helpers/rowingDataRecorder.ts":
/*!***************************************!*\
  !*** ./helpers/rowingDataRecorder.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar RowingData_1 = __webpack_require__(/*! ../models/RowingData */ \"./models/RowingData.ts\");\r\nvar RowingDataRecorder = (function () {\r\n    function RowingDataRecorder() {\r\n        this.sessions = {};\r\n        this.timeOutMillis = 10000;\r\n        this.sessionExists = this.sessionExists.bind(this);\r\n        this.createSession = this.createSession.bind(this);\r\n        this.deleteSession = this.deleteSession.bind(this);\r\n        this.addDataToSession = this.addDataToSession.bind(this);\r\n        this.getSessionTimes = this.getSessionTimes.bind(this);\r\n        this.timeOutThenSave = this.timeOutThenSave.bind(this);\r\n        this.cancelSaveTimeOut = this.cancelSaveTimeOut.bind(this);\r\n    }\r\n    RowingDataRecorder.prototype.sessionExists = function (key) {\r\n        return this.sessions[key] ? true : false;\r\n    };\r\n    RowingDataRecorder.prototype.createSession = function (key, user, machineId, damping, multi, times) {\r\n        if (key && !this.sessions[key]) {\r\n            this.sessions[key] = {\r\n                timeOut: undefined,\r\n            };\r\n            this.sessions[key].data = {\r\n                user: user,\r\n                machineId: machineId,\r\n                damping: damping,\r\n                multi: multi,\r\n                times: times,\r\n            };\r\n        }\r\n    };\r\n    RowingDataRecorder.prototype.deleteSession = function (key) {\r\n        if (key && this.sessions[key]) {\r\n            delete this.sessions[key];\r\n        }\r\n    };\r\n    RowingDataRecorder.prototype.addDataToSession = function (key, data) {\r\n        if (key && this.sessions[key]) {\r\n            this.sessions[key].times = this.sessions[key].times.concat(data);\r\n        }\r\n    };\r\n    RowingDataRecorder.prototype.getSessionTimes = function (key) {\r\n        if (key && this.sessions[key]) {\r\n            return this.sessions[key].times;\r\n        }\r\n    };\r\n    RowingDataRecorder.prototype.cancelSaveTimeOut = function (key) {\r\n        if (key && this.sessions[key]) {\r\n            clearTimeout(this.sessions[key].timeOut);\r\n        }\r\n    };\r\n    RowingDataRecorder.prototype.timeOutThenSave = function (key) {\r\n        var _this = this;\r\n        if (key && this.sessions[key]) {\r\n            this.sessions[key].timeOut = setTimeout(function () {\r\n                var rowingData = new RowingData_1.RowingData(_this.sessions[key].data);\r\n                rowingData\r\n                    .save()\r\n                    .then(function (item) {\r\n                    console.log('data saved');\r\n                })\r\n                    .catch(function (error) { return error && console.log('unable to save data:', error); });\r\n            }, this.timeOutMillis);\r\n        }\r\n    };\r\n    return RowingDataRecorder;\r\n}());\r\nexports.RowingDataRecorder = RowingDataRecorder;\r\n\n\n//# sourceURL=webpack:///./helpers/rowingDataRecorder.ts?");

/***/ }),

/***/ "./helpers/wsHelper.ts":
/*!*****************************!*\
  !*** ./helpers/wsHelper.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.parseWsMessage = function (messageJSON) {\r\n    var parsedObject = undefined;\r\n    try {\r\n        parsedObject = JSON.parse(messageJSON);\r\n    }\r\n    catch (error) {\r\n        return undefined;\r\n    }\r\n    if (!parsedObject.hasOwnProperty('type') || !parsedObject.hasOwnProperty('payload') || !parsedObject.hasOwnProperty('error')) {\r\n        return undefined;\r\n    }\r\n    return parsedObject;\r\n};\r\nexports.createWsMessage = function (type, payload, error) {\r\n    var message = {};\r\n    message['type'] = type;\r\n    message['payload'] = payload;\r\n    message['error'] = error;\r\n    return JSON.stringify(message);\r\n};\r\nexports.handleWsError = function (error) {\r\n    if (error) {\r\n        console.log(error);\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./helpers/wsHelper.ts?");

/***/ }),

/***/ "./models/RowerTypes.ts":
/*!******************************!*\
  !*** ./models/RowerTypes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.RowerTypes = {\r\n    waterRowerA1: {\r\n        constant: 4.805,\r\n        multi: 10\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./models/RowerTypes.ts?");

/***/ }),

/***/ "./models/RowingData.ts":
/*!******************************!*\
  !*** ./models/RowingData.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar bcrypt = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\r\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\r\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar mongooseLeanVirtuals = __webpack_require__(/*! mongoose-lean-virtuals */ \"mongoose-lean-virtuals\");\r\nvar rowingdataHelpers = __webpack_require__(/*! ../helpers/rowingDataHelper */ \"./helpers/rowingDataHelper.ts\");\r\nvar rowingDataSchema = new mongoose.Schema({\r\n    user: {\r\n        type: mongoose.Schema.Types.ObjectId,\r\n        ref: 'User'\r\n    },\r\n    machineId: String,\r\n    damping: String,\r\n    multi: Number,\r\n    times: Array,\r\n    note: String\r\n}, {\r\n    timestamps: true,\r\n    toJSON: { virtuals: true }\r\n});\r\nrowingDataSchema.virtual('distance').get(function () {\r\n    return rowingdataHelpers.timesToMetres([this.times], this.multi, 4.805);\r\n});\r\nrowingDataSchema.virtual('time').get(function () {\r\n    if (!this.times.length) {\r\n        return 0;\r\n    }\r\n    return rowingdataHelpers.timesToTotalMillis([this.times]);\r\n});\r\nrowingDataSchema.plugin(mongooseLeanVirtuals);\r\nexports.RowingData = mongoose.model('RowingData', rowingDataSchema);\r\n\n\n//# sourceURL=webpack:///./models/RowingData.ts?");

/***/ }),

/***/ "./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar bcrypt = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\r\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\r\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar userSchema = new mongoose.Schema({\r\n    email: { type: String, unique: true },\r\n    userName: { type: String, unique: true },\r\n    password: String,\r\n    passwordResetToken: String,\r\n    passwordResetExpires: Date,\r\n    rowingRowerType: String,\r\n    rowingRowerDamping: String,\r\n    rowingLoggingTimeout: Number,\r\n    rowingShareData: Boolean,\r\n    shareRowingData: Boolean,\r\n    rowingTotalMetres: Number,\r\n    rowingTotalTime: Number\r\n}, { timestamps: true });\r\nuserSchema.pre('save', function save(next) {\r\n    var user = this;\r\n    if (!user.isModified('password')) {\r\n        return next();\r\n    }\r\n    bcrypt.genSalt(10, function (error, salt) {\r\n        if (error) {\r\n            return next(error);\r\n        }\r\n        bcrypt.hash(user.password, salt, null, function (error, hash) {\r\n            if (error) {\r\n                return next(error);\r\n            }\r\n            user.password = hash;\r\n            next();\r\n        });\r\n    });\r\n});\r\nuserSchema.methods.comparePassword = function (candidatePassword, cb) {\r\n    bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {\r\n        cb(error, isMatch);\r\n    });\r\n};\r\nexports.User = mongoose.model('User', userSchema);\r\n\n\n//# sourceURL=webpack:///./models/User.ts?");

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** multi ./app.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./app.ts */\"./app.ts\");\n\n\n//# sourceURL=webpack:///multi_./app.ts?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "bcrypt-nodejs":
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt-nodejs\");\n\n//# sourceURL=webpack:///external_%22bcrypt-nodejs%22?");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bluebird\");\n\n//# sourceURL=webpack:///external_%22bluebird%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chalk\");\n\n//# sourceURL=webpack:///external_%22chalk%22?");

/***/ }),

/***/ "clean-webpack-plugin":
/*!***************************************!*\
  !*** external "clean-webpack-plugin" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"clean-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22clean-webpack-plugin%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-mongo\");\n\n//# sourceURL=webpack:///external_%22connect-mongo%22?");

/***/ }),

/***/ "copy-webpack-plugin":
/*!**************************************!*\
  !*** external "copy-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"copy-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22copy-webpack-plugin%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "errorhandler":
/*!*******************************!*\
  !*** external "errorhandler" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"errorhandler\");\n\n//# sourceURL=webpack:///external_%22errorhandler%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-sanitizer":
/*!************************************!*\
  !*** external "express-sanitizer" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-sanitizer\");\n\n//# sourceURL=webpack:///external_%22express-sanitizer%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validator\");\n\n//# sourceURL=webpack:///external_%22express-validator%22?");

/***/ }),

/***/ "express-ws":
/*!*****************************!*\
  !*** external "express-ws" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-ws\");\n\n//# sourceURL=webpack:///external_%22express-ws%22?");

/***/ }),

/***/ "extract-text-webpack-plugin":
/*!**********************************************!*\
  !*** external "extract-text-webpack-plugin" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"extract-text-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22extract-text-webpack-plugin%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"glob\");\n\n//# sourceURL=webpack:///external_%22glob%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "lusca":
/*!************************!*\
  !*** external "lusca" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lusca\");\n\n//# sourceURL=webpack:///external_%22lusca%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "mongoose-lean-virtuals":
/*!*****************************************!*\
  !*** external "mongoose-lean-virtuals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-lean-virtuals\");\n\n//# sourceURL=webpack:///external_%22mongoose-lean-virtuals%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");\n\n//# sourceURL=webpack:///external_%22nodemailer%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "purifycss-webpack":
/*!************************************!*\
  !*** external "purifycss-webpack" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"purifycss-webpack\");\n\n//# sourceURL=webpack:///external_%22purifycss-webpack%22?");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request\");\n\n//# sourceURL=webpack:///external_%22request%22?");

/***/ }),

/***/ "stats-webpack-plugin":
/*!***************************************!*\
  !*** external "stats-webpack-plugin" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"stats-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22stats-webpack-plugin%22?");

/***/ }),

/***/ "tslint-webpack-plugin":
/*!****************************************!*\
  !*** external "tslint-webpack-plugin" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"tslint-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22tslint-webpack-plugin%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ }),

/***/ "webpack-visualizer-plugin":
/*!********************************************!*\
  !*** external "webpack-visualizer-plugin" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-visualizer-plugin\");\n\n//# sourceURL=webpack:///external_%22webpack-visualizer-plugin%22?");

/***/ }),

/***/ "whatwg-fetch":
/*!*******************************!*\
  !*** external "whatwg-fetch" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"whatwg-fetch\");\n\n//# sourceURL=webpack:///external_%22whatwg-fetch%22?");

/***/ })

/******/ });