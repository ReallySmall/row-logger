const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const webpackNodeExternals = require('webpack-node-externals');

// variables
const sourcePath = path.resolve(__dirname, './server/src');
const outPath = path.resolve(__dirname, './server/dist');

// plugins
const TSLintPlugin = require('tslint-webpack-plugin');
const NoDemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  context: sourcePath,
  entry: {
    main: ['./app.ts'] // the route files that Webpack should start from to find and bundle the app's assets
  },
  output: {
    path: outPath,
    publicPath: '/',
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
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __ISDEVENV__: true
    }),    
    new TSLintPlugin({ // linting
        files: ['./app/**/*.ts', '.app/**/*.tsx'],
        fix: true,
        config: './tslint.json'
    })
  ], // run plugins on the bundles
  externals: [webpackNodeExternals]
};
