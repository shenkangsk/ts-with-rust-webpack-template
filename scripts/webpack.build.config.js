const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

const mergeConfig = {};

module.exports = merge(baseConfig('production'), mergeConfig);
