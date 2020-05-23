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

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(/*! express */ \"express\");\r\nvar compression = __webpack_require__(/*! compression */ \"compression\");\r\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nvar logger = __webpack_require__(/*! morgan */ \"morgan\");\r\nvar chalk = __webpack_require__(/*! chalk */ \"chalk\");\r\nvar errorHandler = __webpack_require__(/*! errorhandler */ \"errorhandler\");\r\nvar expressSanitizer = __webpack_require__(/*! express-sanitizer */ \"express-sanitizer\");\r\nvar lusca = __webpack_require__(/*! lusca */ \"lusca\");\r\nvar dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar expressValidator = __webpack_require__(/*! express-validator */ \"express-validator\");\r\nvar https = __webpack_require__(/*! https */ \"https\");\r\nvar fs = __webpack_require__(/*! fs */ \"fs\");\r\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\r\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\r\nvar webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\r\nvar webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\r\ndotenv.config();\r\nvar sslOptions = {\r\n    key: fs.readFileSync('./ssl/key.pem'),\r\n    cert: fs.readFileSync('./ssl/certificate.pem')\r\n};\r\nvar app = express();\r\nvar server = https.createServer(sslOptions, app).listen(443);\r\nif (true) {\r\n    var config = __webpack_require__(/*! ../../webpack.dev.app.config.js */ \"../../webpack.dev.app.config.js\");\r\n    var compiler = webpack(config);\r\n    app.use(webpackDevMiddleware(compiler, {\r\n        noInfo: false,\r\n        publicPath: '/',\r\n        stats: { colors: true }\r\n    }));\r\n    app.use(webpackHotMiddleware(compiler));\r\n}\r\napp.set('host', '0.0.0.0');\r\napp.set('port', process.env.PORT || 8080);\r\napp.set('views', path.join(__dirname, 'views'));\r\napp.set('view engine', 'pug');\r\napp.set('trust proxy', 1);\r\napp.enable('trust proxy', 1);\r\napp.use(compression());\r\napp.use(logger('dev'));\r\napp.use(bodyParser.json());\r\napp.use(bodyParser.urlencoded({ extended: true }));\r\napp.use(expressSanitizer());\r\napp.use(expressValidator());\r\napp.use(helmet());\r\napp.use(lusca.xframe('SAMEORIGIN'));\r\napp.use(lusca.xssProtection(true));\r\napp.use(function (req, res, next) {\r\n    res.header('Access-Control-Allow-Origin', '*');\r\n    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');\r\n    next();\r\n});\r\napp.use(express.static(path.join(path.resolve(), '/public'), { maxAge: 31557600000 }));\r\napp.get('*', function (req, res) {\r\n    res.sendFile(path.join(path.resolve() + '/server/dist/index.html'));\r\n});\r\napp.use(errorHandler());\r\napp.listen(app.get('port'), function () {\r\n    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));\r\n    console.log('  Press CTRL-C to stop\\n');\r\n});\r\nmodule.exports = app;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./app.ts?");

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

/***/ "copy-webpack-plugin":
/*!**************************************!*\
  !*** external "copy-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"copy-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22copy-webpack-plugin%22?");

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

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validator\");\n\n//# sourceURL=webpack:///external_%22express-validator%22?");

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

/***/ "lusca":
/*!************************!*\
  !*** external "lusca" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lusca\");\n\n//# sourceURL=webpack:///external_%22lusca%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

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