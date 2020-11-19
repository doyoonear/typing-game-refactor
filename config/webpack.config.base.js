const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;
const isProdMode = env === 'production';
console.log('env', env);
console.log('here');
console.log(isProdMode);

module.exports = {
  mode: env,
  context: path.resolve(__dirname, '..'),
  entry: { 
    app: './src/index.js' 
  },
  output: {
    filename: !isProdMode ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: !isProdMode ? `js/[name].js` : 'js/[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  optimization: { minimizer: []},
};