/* eslint-disable no-unused-expressions */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

baseConfig.entry = {
  index: './tests/index.ts',
};

baseConfig.output = {
  filename: '[name].js',
  path: `${__dirname}test-dist`,
};

baseConfig.plugins = [
  new HtmlWebpackPlugin({
    template: './tests/index.html',
    filename: 'index.html',
    chunks: ['index'],
  }),
];

baseConfig.devServer = {
  contentBase: '../test-dist',
  host: 'localhost',
  port: 8085,
};

baseConfig.output.path = path.resolve(__dirname, 'test-dist');

module.exports = baseConfig;
