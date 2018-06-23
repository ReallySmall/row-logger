const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

// variables
const sourcePath = path.join(path.resolve() + '/app');
const outPath = path.join(path.resolve() + '/public');

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

module.exports = {
  mode: 'development',
  context: sourcePath,
  entry: {
    main: [hotMiddlewareScript, 'babel-polyfill', 'whatwg-fetch', './index.tsx'] // the route files that Webpack should start from to find and bundle the app's assets
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
        use: 'awesome-typescript-loader'
      },
      {
      test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __ISDEVENV__: true
    }),
    new TSLintPlugin({ // linting
        files: ['./app/**/*.ts', '.app/**/*.tsx'],
        fix: true,
        config: './tslint.json'
    }),
    new webpack.HotModuleReplacementPlugin()
  ] // run plugins on the bundles
};