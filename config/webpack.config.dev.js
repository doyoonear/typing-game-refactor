const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

const devConfig = merge(baseConfig, {
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    open: true,
    hot: true,
    host: "localhost",
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: '"/"'
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
})

module.exports = devConfig;