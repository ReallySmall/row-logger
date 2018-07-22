const path = require('path');
const glob = require('glob');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TSLintPlugin = require('tslint-webpack-plugin');
const NoDemonPlugin = require('nodemon-webpack-plugin');

const sourcePath = path.resolve(__dirname, './server/src');
const outPath = path.resolve(__dirname, './server/dist');

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  mode: 'development',
  context: sourcePath,
  entry: {
    app: ['./app.ts'] // the route files that Webpack should start from to find and bundle the app's assets
  },
  output: {
    path: outPath,
    filename: '[name].js',
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.ts'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // https://github.com/Microsoft/TypeScript/issues/11677
    mainFields: ['main']
  },
  module: {
    rules: [
      // compile ts, tsx to JS
      {
        test: /\.ts?$/,
        use: 'awesome-typescript-loader'
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __ISDEVENV__: true
    }),    
    new TSLintPlugin({ // linting
        files: ['./server/src/**/*.ts'],
        fix: true,
        config: './tslint.json'
    }),
    //new CopyWebpackPlugin([
      //{ from: sourcePath + '/index.html', to: outPath + '/index.html' }
    //]),
    new NoDemonPlugin()
  ], // run plugins on the bundles
  externals: nodeModules
};
