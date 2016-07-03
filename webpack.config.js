var webpack = require('webpack');

module.exports = {

  entry: [
    'babel-polyfill',
    './app/index.js'
  ],

  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },

  resolve: {
    root: __dirname + '/app',
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  stats: {
    colors: true,
    reasons: true
  },

  devtool: 'source-map',

  cache: true,

  debug: false

};
