const path = require('path');
const webpack = require('webpack');

module.exports = function(options) {
  const {dev} = options;

  return {
    devtool: dev ? 'inline-source-map' : 'hidden-source-map',
    entry: {
      app: "./src/main.js",
      vendor: ['react', 'react-dom']
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      }]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
    ],
    devServer: {
      contentBase: './src',
      open: true,
      historyApiFallback: true,
      progress: true
    },
    // for enzyme testing
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  };
};
