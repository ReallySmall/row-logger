const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr&timeout=20000&reload=true';

// variables
const sourcePath = path.resolve(__dirname, './app');
const outPath = path.resolve(__dirname, './public');

// plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const BundlingVisualizer = require('webpack-visualizer-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');

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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
  ], // run plugins on the bundles
  devServer: { // starts a local devserver
    port: 4000,
    historyApiFallback: true,
    contentBase: sourcePath,
    hot: true, // live reloading
    stats: {
      warnings: false
    }
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