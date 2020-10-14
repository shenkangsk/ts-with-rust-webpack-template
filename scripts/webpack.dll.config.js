const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    lib: [
      // 'vue',
      // 'vuex',
      // 'vue-router',
      // 'view-design',
      // 'vue-class-component',
      // 'vue-property-decorator',
      'axios',
      'ramda'
    ]
  },

  output: {
    library: '[name]_[hash]',
    filename: '[name].dll.js',
    path: path.join(__dirname, '../dist/lib')
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, '../dist/[name]-manifest.json')
    })
  ]
};
