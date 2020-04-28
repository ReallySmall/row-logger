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
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar compression = __webpack_require__(/*! compression */ \"compression\");\r\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\r\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nvar logger = __webpack_require__(/*! morgan */ \"morgan\");\r\nvar chalk = __webpack_require__(/*! chalk */ \"chalk\");\r\nvar errorHandler = __webpack_require__(/*! errorhandler */ \"errorhandler\");\r\nvar expressSanitizer = __webpack_require__(/*! express-sanitizer */ \"express-sanitizer\");\r\nvar lusca = __webpack_require__(/*! lusca */ \"lusca\");\r\nvar dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\r\nvar MongoStore = __webpack_require__(/*! connect-mongo */ \"connect-mongo\")(session);\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar passport = __webpack_require__(/*! passport */ \"passport\");\r\nvar expressValidator = __webpack_require__(/*! express-validator */ \"express-validator\");\r\nvar expressWs = __webpack_require__(/*! express-ws */ \"express-ws\");\r\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nvar https = __webpack_require__(/*! https */ \"https\");\r\nvar fs = __webpack_require__(/*! fs */ \"fs\");\r\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\r\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\r\nvar webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\r\nvar webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\r\ndotenv.config();\r\nvar wsController = __webpack_require__(/*! ./controllers/ws */ \"./controllers/ws.ts\");\r\nvar sslOptions = {\r\n    key: fs.readFileSync('./ssl/key.pem'),\r\n    cert: fs.readFileSync('./ssl/certificate.pem')\r\n};\r\nvar app = express();\r\nvar server = https.createServer(sslOptions, app).listen(443);\r\nvar wsInstance = expressWs(app, server);\r\nif (true) {\r\n    var config = __webpack_require__(/*! ../../webpack.dev.app.config.js */ \"../../webpack.dev.app.config.js\");\r\n    var compiler = webpack(config);\r\n    app.use(webpackDevMiddleware(compiler, {\r\n        noInfo: false,\r\n        publicPath: '/',\r\n        stats: { colors: true }\r\n    }));\r\n    app.use(webpackHotMiddleware(compiler));\r\n}\r\napp.set('host', '0.0.0.0');\r\napp.set('port', process.env.PORT || 8080);\r\napp.set('views', path.join(__dirname, 'views'));\r\napp.set('view engine', 'pug');\r\napp.set('trust proxy', 1);\r\napp.enable('trust proxy', 1);\r\napp.use(compression());\r\napp.use(logger('dev'));\r\napp.use(bodyParser.json());\r\napp.use(bodyParser.urlencoded({ extended: true }));\r\napp.use(expressSanitizer());\r\napp.use(expressValidator());\r\napp.use(helmet());\r\napp.use(lusca.xframe('SAMEORIGIN'));\r\napp.use(lusca.xssProtection(true));\r\napp.use(function (req, res, next) {\r\n    res.header('Access-Control-Allow-Origin', '*');\r\n    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');\r\n    next();\r\n});\r\napp.use(express.static(path.join(path.resolve(), '/public'), { maxAge: 31557600000 }));\r\napp.ws('/', wsController.recordSession);\r\napp.get('*', function (req, res) {\r\n    res.sendFile(path.join(path.resolve() + '/server/dist/index.html'));\r\n});\r\napp.use(errorHandler());\r\napp.listen(app.get('port'), function () {\r\n    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));\r\n    console.log('  Press CTRL-C to stop\\n');\r\n});\r\nmodule.exports = app;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./app.ts?");

/***/ }),

/***/ "./constants/actions.ts":
/*!******************************!*\
  !*** ./constants/actions.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.WEBSOCKET_CLIENT_CONNECTED = 'WEBSOCKET:CLIENT_CONNECTED';\r\nexports.WEBSOCKET_CLIENT_DISCONNECTED = 'WEBSOCKET:CLIENT_DISCONNECTED';\r\nexports.WEBSOCKET_LOGGER_CONNECTED = 'WEBSOCKET:LOGGER_CONNECTED';\r\nexports.WEBSOCKET_LOGGER_DISCONNECTED = 'WEBSOCKET:LOGGER_DISCONNECTED';\r\nexports.WEBSOCKET_MESSAGE = 'WEBSOCKET:MESSAGE';\r\nexports.NO_WEBSOCKET_CLIENTS = 'NOWEBSOCKETCLIENTS';\r\n\n\n//# sourceURL=webpack:///./constants/actions.ts?");

/***/ }),

/***/ "./controllers/ws.ts":
/*!***************************!*\
  !*** ./controllers/ws.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar wsSessionManager_1 = __webpack_require__(/*! ../helpers/wsSessionManager */ \"./helpers/wsSessionManager.ts\");\r\nvar wsHelpers = __webpack_require__(/*! ../helpers/wsHelper */ \"./helpers/wsHelper.ts\");\r\nvar actions = __webpack_require__(/*! ../constants/actions */ \"./constants/actions.ts\");\r\nvar uuidv4 = __webpack_require__(/*! uuid/v4 */ \"../../node_modules/uuid/v4.js\");\r\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nvar activeSessions = {};\r\nexports.recordSession = function (ws, req) {\r\n    ws.connectionId = uuidv4();\r\n    ws.isAlive = true;\r\n    var authenticationWindow = setTimeout(function () {\r\n        !req.user && ws.terminate();\r\n    }, 10000);\r\n    var clientConnectionCheck = setInterval(function () {\r\n        if (!ws.isAlive || ws.readyState !== 1) {\r\n            ws.terminate();\r\n            activeSessions[req.user] && activeSessions[req.user].removeClient(ws);\r\n            activeSessions[req.user] && activeSessions[req.user].broadcastLoggerConnectionState();\r\n            clearInterval(clientConnectionCheck);\r\n            console.log('client has disconnected');\r\n            return;\r\n        }\r\n        ws.isAlive = false;\r\n        ws.ping(function (error) { return console.log(error); });\r\n        activeSessions[req.user] && activeSessions[req.user].broadcastLoggerConnectionState();\r\n    }, 5000);\r\n    ws.on('pong', function () {\r\n        ws.isAlive = true;\r\n    });\r\n    ws.on('close', function () {\r\n        clearTimeout(authenticationWindow);\r\n        activeSessions[req.user] && activeSessions[req.user].removeClient(ws);\r\n        console.log('close');\r\n    });\r\n    ws.on('message', function (messageJSON) {\r\n        console.log(messageJSON);\r\n        var message = wsHelpers.parseWsMessage(messageJSON);\r\n        if (!message) {\r\n            ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid JSON or incorrect structure in message', true), function (error) { return wsHelpers.handleWsError(error); });\r\n            ws.terminate();\r\n            activeSessions[req.user] && activeSessions[req.user].removeClient(ws);\r\n            console.log('!message');\r\n            return;\r\n        }\r\n        if (!req.user) {\r\n            console.log('Authenticating');\r\n            jwt.verify(message.payload, process.env.JWT_TOKEN_SECRET, function (error, token) {\r\n                if (error) {\r\n                    console.log('JWT error', error);\r\n                    ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Invalid token', true), function (error) { return wsHelpers.handleWsError(error); });\r\n                    ws.terminate();\r\n                    activeSessions[req.user] && activeSessions[req.user].removeClient(ws);\r\n                    return;\r\n                }\r\n                req.user = token.user;\r\n                ws.isLogger = Boolean(token.isLogger);\r\n                if (!activeSessions[req.user]) {\r\n                    activeSessions[req.user] = new wsSessionManager_1.WSSessionManager(req.user);\r\n                }\r\n                activeSessions[req.user] && activeSessions[req.user].addClient(ws);\r\n                activeSessions[req.user] && activeSessions[req.user].on(actions.NO_WEBSOCKET_CLIENTS, function () {\r\n                    delete activeSessions[req.user];\r\n                    console.log('no clients');\r\n                });\r\n                console.log('Authenticated');\r\n            });\r\n            return;\r\n        }\r\n        console.log('Recieved message from client: ', message);\r\n        var data = message.payload.data;\r\n        ws.base = message.payload.base;\r\n        var times = data && data.length ? data.map(function (datum) { return ws.base + parseInt(datum, 10); }) : [];\r\n        if (activeSessions[req.user] && !activeSessions[req.user].dataSet) {\r\n            User.findById(req.user, function (error, user) {\r\n                if (error || !user) {\r\n                    ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), function (error) { return wsHelpers.handleWsError(error); });\r\n                    ws.terminate();\r\n                    activeSessions[req.user] && activeSessions[req.user].removeClient(ws);\r\n                    return;\r\n                }\r\n                ws.damping = user.rowingRowerDamping;\r\n                ws.rowerType = user.rowingRowerType;\r\n                ws.constant = RowerTypes[ws.rowerType].constant;\r\n                ws.multi = RowerTypes[ws.rowerType].multi;\r\n                if (ws.damping && ws.base && ws.constant && ws.multi && activeSessions[req.user]) {\r\n                    ws.recordingSessionId = new uuidv4();\r\n                    activeSessions[req.user].createDataSet(ws.rowerType, ws.damping, ws.multi, times);\r\n                    activeSessions[req.user].saveDataSet();\r\n                    console.log('created new dataset');\r\n                }\r\n                else {\r\n                    ws.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, 'Unexpected error, terminating', true), function (error) { return wsHelpers.handleWsError(error); });\r\n                    ws.terminate();\r\n                    activeSessions[req.user] && activeSessions[req.user].removeClient(ws);\r\n                    return;\r\n                }\r\n            });\r\n        }\r\n        else {\r\n            activeSessions[req.user] && activeSessions[req.user].addToDataSet(times);\r\n            activeSessions[req.user] && activeSessions[req.user].saveDataSet();\r\n            console.log('updated dataset');\r\n        }\r\n        activeSessions[req.user] && activeSessions[req.user].broadcastData({\r\n            id: ws.recordingSessionId,\r\n            times: times,\r\n            multi: ws.multi,\r\n            constant: ws.constant\r\n        }, ws);\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./controllers/ws.ts?");

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

/***/ "./helpers/wsHelper.ts":
/*!*****************************!*\
  !*** ./helpers/wsHelper.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.parseWsMessage = function (messageJSON) {\r\n    var parsedObject = undefined;\r\n    try {\r\n        parsedObject = JSON.parse(messageJSON);\r\n    }\r\n    catch (error) {\r\n        return undefined;\r\n    }\r\n    if (!parsedObject.hasOwnProperty('type') || !parsedObject.hasOwnProperty('payload') || !parsedObject.hasOwnProperty('error')) {\r\n        return undefined;\r\n    }\r\n    return parsedObject;\r\n};\r\nexports.createWsMessage = function (type, payload, error) {\r\n    var message = {};\r\n    message['type'] = type;\r\n    message['payload'] = payload;\r\n    message['error'] = error;\r\n    return JSON.stringify(message);\r\n};\r\nexports.handleWsError = function (error) {\r\n    if (error) {\r\n        console.log(error);\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./helpers/wsHelper.ts?");

/***/ }),

/***/ "./helpers/wsSessionManager.ts":
/*!*************************************!*\
  !*** ./helpers/wsSessionManager.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = Object.setPrototypeOf ||\r\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar RowingData_1 = __webpack_require__(/*! ../models/RowingData */ \"./models/RowingData.ts\");\r\nvar EventEmitter = __webpack_require__(/*! events */ \"events\");\r\nvar wsHelpers = __webpack_require__(/*! ../helpers/wsHelper */ \"./helpers/wsHelper.ts\");\r\nvar actions = __webpack_require__(/*! ../constants/actions */ \"./constants/actions.ts\");\r\nvar WSSessionManager = (function (_super) {\r\n    __extends(WSSessionManager, _super);\r\n    function WSSessionManager(user) {\r\n        var _this = _super.call(this) || this;\r\n        _this.user = undefined;\r\n        _this.clients = undefined;\r\n        _this.dataSet = undefined;\r\n        _this.saveDataSetTimeOut = undefined;\r\n        _this.saveDataSetTimeOutMillis = 15000;\r\n        _this.user = user;\r\n        _this.clients = {};\r\n        _this.hasClients = _this.hasClients.bind(_this);\r\n        _this.addClient = _this.addClient.bind(_this);\r\n        _this.removeClient = _this.removeClient.bind(_this);\r\n        _this.broadcastLoggerConnectionState = _this.broadcastLoggerConnectionState.bind(_this);\r\n        _this.broadcastData = _this.broadcastData.bind(_this);\r\n        _this.getSessionTimes = _this.getSessionTimes.bind(_this);\r\n        _this.cancelSaveTimeOut = _this.cancelSaveTimeOut.bind(_this);\r\n        _this.saveDataSet = _this.saveDataSet.bind(_this);\r\n        _this.addToDataSet = _this.addToDataSet.bind(_this);\r\n        _this.clearDataSet = _this.clearDataSet.bind(_this);\r\n        return _this;\r\n    }\r\n    WSSessionManager.prototype.hasClients = function () {\r\n        return Object.keys(this.clients).length > 0;\r\n    };\r\n    WSSessionManager.prototype.addClient = function (clientToAdd) {\r\n        var connectionId = clientToAdd.connectionId;\r\n        this.clients[connectionId] = clientToAdd;\r\n        console.log(\"Client added\");\r\n    };\r\n    WSSessionManager.prototype.removeClient = function (clientToRemove) {\r\n        var clientToRemoveConnectionId = clientToRemove.connectionId;\r\n        if (this.clients[clientToRemoveConnectionId]) {\r\n            delete this.clients[clientToRemoveConnectionId];\r\n            console.log(\"Client removed\");\r\n        }\r\n    };\r\n    WSSessionManager.prototype.broadcastLoggerConnectionState = function () {\r\n        var _this = this;\r\n        var loggerIsConnected = false;\r\n        if (!this.hasClients()) {\r\n            this.emit(actions.NO_WEBSOCKET_CLIENTS);\r\n            return;\r\n        }\r\n        Object.keys(this.clients).forEach(function (clientId) {\r\n            var client = _this.clients[clientId];\r\n            if (client.isLogger) {\r\n                loggerIsConnected = true;\r\n            }\r\n        });\r\n        Object.keys(this.clients).forEach(function (clientId) {\r\n            var client = _this.clients[clientId];\r\n            if (client.readyState === 1) {\r\n                client.send(wsHelpers.createWsMessage(loggerIsConnected\r\n                    ? actions.WEBSOCKET_LOGGER_CONNECTED\r\n                    : actions.WEBSOCKET_LOGGER_DISCONNECTED, 'Logger connection status updated', false), function (error) { return wsHelpers.handleWsError(error); });\r\n                console.log(loggerIsConnected\r\n                    ? actions.WEBSOCKET_LOGGER_CONNECTED\r\n                    : actions.WEBSOCKET_LOGGER_DISCONNECTED);\r\n            }\r\n        });\r\n        console.log(\"User session contains \" + Object.keys(this.clients).length + \" active clients\");\r\n    };\r\n    WSSessionManager.prototype.broadcastData = function (message, originatingClient) {\r\n        var _this = this;\r\n        Object.keys(this.clients).forEach(function (clientId) {\r\n            var client = _this.clients[clientId];\r\n            if ((!originatingClient || originatingClient.connectionId !== client.connectionId) && client.readyState === 1) {\r\n                client.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, message, false), function (error) { return wsHelpers.handleWsError(error); });\r\n            }\r\n        });\r\n    };\r\n    WSSessionManager.prototype.createDataSet = function (machineId, damping, multi, times) {\r\n        this.dataSet = {\r\n            user: this.user,\r\n            machineId: machineId,\r\n            damping: damping,\r\n            multi: multi,\r\n            times: times,\r\n        };\r\n        console.log('session created:', this.dataSet);\r\n    };\r\n    WSSessionManager.prototype.addToDataSet = function (data) {\r\n        this.dataSet.times = this.dataSet.times.concat(data);\r\n    };\r\n    WSSessionManager.prototype.clearDataSet = function () {\r\n        this.dataSet = undefined;\r\n    };\r\n    WSSessionManager.prototype.getSessionTimes = function () {\r\n        return this.dataSet.times;\r\n    };\r\n    WSSessionManager.prototype.cancelSaveTimeOut = function () {\r\n        clearTimeout(this.saveDataSetTimeOut);\r\n    };\r\n    WSSessionManager.prototype.saveDataSet = function () {\r\n        var _this = this;\r\n        this.cancelSaveTimeOut();\r\n        this.saveDataSetTimeOut = setTimeout(function () {\r\n            var rowingData = new RowingData_1.RowingData(_this.dataSet);\r\n            rowingData\r\n                .save()\r\n                .then(function (item) {\r\n                console.log('data saved');\r\n                _this.cancelSaveTimeOut();\r\n                _this.clearDataSet();\r\n            })\r\n                .catch(function (error) { return error && console.log('unable to save data:', error); });\r\n        }, this.saveDataSetTimeOutMillis);\r\n    };\r\n    return WSSessionManager;\r\n}(EventEmitter));\r\nexports.WSSessionManager = WSSessionManager;\r\n\n\n//# sourceURL=webpack:///./helpers/wsSessionManager.ts?");

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

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

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

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

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