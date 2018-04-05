const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

// variables
const sourcePath = path.resolve(__dirname, 'ui/ts/root');
const outPath = path.resolve(__dirname, 'public/js');

// plugins
//const TSLintPlugin = require('tslint-webpack-plugin');

const applyPlugins = () => { // returns an array of plugins to output code bundles through
	// NB the order some plugins are added to the array does matter

	const plugins = [];

	plugins.push(new webpack.optimize.AggressiveMergingPlugin()); // more compression

	return plugins;

};

module.exports = {
  context: sourcePath,
  entry: {
    charts: ['./charts.ts'] // the route files that Webpack should start from to find and bundle the app's assets
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
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader?module=es5'
      }
    ],
  },
  plugins: applyPlugins(), // run plugins on the bundles
  externals: {
    jquery: 'jQuery'
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
