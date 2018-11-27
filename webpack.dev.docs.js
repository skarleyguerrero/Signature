
const merge = require('webpack-merge');
const common = require('./webpack.common.docs.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  devtool: "source-map",
  devServer: {
    contentBase:  './dist',
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [
    new Dotenv({
        path: './.env.dev'
    })
  ]
})