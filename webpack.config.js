var webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'bin');
var APP_DIR = path.resolve(__dirname, 'src/app');

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body',
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: '8000',
    hot: true,
  },
  mode: dev ? 'development' : 'production',
  plugins: dev ? [
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    HTMLWebpackPluginConfig,
    DefinePluginConfig
  ],
};

module.exports = config;