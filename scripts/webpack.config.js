const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const appConfig = require('../config/app.json');

const config = mode => ({
  mode,

  entry: path.join(__dirname, '../src/index.ts'),

  target: 'web',

  devtool: mode === 'production' ? 'source-map' : 'eval',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: `index.js`,
    library: 'app',
    libraryTarget: 'umd',
    publicPath: mode === 'production' ? appConfig.publicPath : '/'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    alias: {
      '@types': path.join(__dirname, '../types'),
      '@src': path.join(__dirname, '../src'),
      '@assets': path.join(__dirname, '../assets')
    }
  },

  module: {
    rules: [
      {
        test: /\.([tj])s$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
              // if the are vue app, to enable this option
              // appendTsSuffixTo: ['.vue']
            }
          }
        ]
      },
      {
        test: /\.[jt]sx$/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.s(c|a)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 200,
              esModule: false,
              outputPath: 'images',
              publicPath: '../images'
            }
          }
        ]
      },
      {
        test: /\.(woff|svg|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              publicPath: '../fonts'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, `../src/index.ejs`)
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../dist/lib-manifest.json')
    }),
    new WasmPackPlugin({
      crateDirectory: path.join(__dirname, '../rust')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../static'),
          to: path.join(__dirname, '../dist')
        }
      ]
    }),
    new EslintWebpackPlugin({
      context: path.join(__dirname, '../'),
      files: ['src'],
      extensions: ['js', 'ts']
    })
  ]
});

module.exports = config;
