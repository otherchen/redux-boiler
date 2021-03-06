import webpack from 'webpack';

export default {

  entry: [
    'babel-polyfill',
    './client/index.js'
  ],

  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },

  resolve: {
    root: __dirname + '/client',
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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ 
      'process.env': { 
        'NODE_ENV': `'${process.env.NODE_ENV}'`
      } 
    })
  ],

  stats: {
    colors: true,
    reasons: true
  },

  devtool: 'source-map',

  cache: true,

  debug: false

};
