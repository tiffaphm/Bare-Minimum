const webpack = require('webpack');
const path = require('path');
var SRC_DIR = path.resolve(__dirname, 'client/src');
var DIST_DIR = path.resolve(__dirname, 'client/dist');

const environment = process.env.NODE_ENV;
const envPath = '.env.' + environment;
const envVars = require('dotenv').config({path: envPath});
console.log('the webpack is in this env', environment);

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'client/src/index.jsx'),
    dashboard: path.resolve(__dirname, 'client/src/dashboard.jsx')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      // allow webpack to add css files to build
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      // allow loading Bootstrap files
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4|webm)$/,
        loader: 'file-loader?name=/assets/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      HOSTNAME: JSON.stringify(process.env.HOSTNAME)
    })
  ]
};
