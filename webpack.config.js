const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');

var BUILD_DIR = path.resolve(__dirname, 'bin');
var APP_DIR = path.resolve(__dirname, 'src/app');

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/main.html'),
  filename: 'main.html',
  inject: 'body',
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

const OnBuildPlugin = new WebpackOnBuildPlugin(function(stats) {
  const newlyCreatedAssets = stats.compilation.assets;

  const unlinked = [];
  fs.readdir(path.resolve(BUILD_DIR), (err, files) => {
    files.forEach(file => {
      if (!newlyCreatedAssets[file] && !fs.lstatSync(BUILD_DIR + '/' + file).isDirectory()) {
        fs.unlinkSync(path.resolve(BUILD_DIR + '/' + file));
        unlinked.push(file);
      }
    });
    if (unlinked.length > 0) {
      console.log('Removed old assets: ', unlinked);
    }
  });
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
        loader : 'babel-loader',
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [
          {
            loader: 'url-loader',
            options: { 
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'img/[hash]-[name].[ext]',
            } ,
          },
        ],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: '8000',
    hot: true,
  },
  mode: dev ? 'development' : 'production',
  plugins: [
    HTMLWebpackPluginConfig,
    OnBuildPlugin,
  ].concat(dev ? [
    //dev
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    //prod
    DefinePluginConfig,
  ]),
};

module.exports = config;