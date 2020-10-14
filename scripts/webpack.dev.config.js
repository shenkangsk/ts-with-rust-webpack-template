const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const path = require('path');

const mergeConfig = {
  devServer: {
    hot: true,
    host: 'localhost',
    port: 23333,
    contentBase: path.join(__dirname, '../dist')
  }
};

module.exports = merge(baseConfig('development'), mergeConfig);