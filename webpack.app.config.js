const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

// variables
const isProduction = process.env.NODE_ENV === 'production';
const sourcePath = path.resolve(__dirname, './app');
const outPath = path.resolve(__dirname, './public/app');

// plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const BundlingVisualizer = require('webpack-visualizer-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

// polyfills
require('whatwg-fetch');
require('babel-polyfill');

const applyPlugins = () => { // returns an array of plugins to output code bundles through
	// NB the order some plugins are added to the array does matter

	const plugins = [];

	plugins.push(new webpack.optimize.AggressiveMergingPlugin()); // more compression

    isProduction && plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/)); // don't import the massive library of moment.js locales - just en-gb for now

    isProduction && plugins.push(new webpack.optimize.UglifyJsPlugin({ // minifies JS files
        sourceMap: true,
        compress: {
  		    dead_code: true
  	    },
  	    output: {
    	    comments: false
  	    }
    }));

    isProduction && plugins.push(new StatsPlugin('stats.json', { // output module bundling stats to json
        chunkModules: true,
        exclude: [/node_modules[\\\/]react/]
    }));

    isProduction && plugins.push(new BundlingVisualizer({ // visualises the contents of the bundled assets
        filename: './bundling-stats.html'
    }));

    plugins.push(new webpack.DefinePlugin({ // enables conditional inclusion of dev tools in code
        __ISDEVENV__: JSON.stringify(!isProduction)
    }));

    plugins.push(new TSLintPlugin({ // linting
        files: ['./**/*.ts', './**/*.tsx'],
        fix: true,
        config: './tslint.json'
    }));

	return plugins;

};

module.exports = {
  context: sourcePath,
  entry: {
    main: ['babel-polyfill', 'whatwg-fetch', './index.tsx'] // the route files that Webpack should start from to find and bundle the app's assets
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // https://github.com/Microsoft/TypeScript/issues/11677
    mainFields: ['main']
  },
  module: {
    rules: [
      // compile ts, tsx to JS
      {
        test: /\.tsx?$/,
        use: isProduction
          ? 'awesome-typescript-loader?module=es5'
          : ['awesome-typescript-loader']
      }
    ],
  },
  plugins: applyPlugins(), // run plugins on the bundles
  devServer: { // starts a local devserver
    port: 4000,
    historyApiFallback: true,
    contentBase: sourcePath,
    hot: true, // live reloading
    stats: {
      warnings: false
    },
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
    console: false,
    global: true,
    process: true,
    Buffer: true,
    __filename: "mock",
    __dirname: "mock",
    setImmediate: true
  }
};
