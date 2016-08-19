const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCSS = new ExtractTextPlugin('static/css/app.[chunkhash:8].css');

const appSrc = path.join(__dirname, 'src');
const appBuild = path.join(__dirname, 'build');

module.exports = function(options) {
  const {dev} = options;

  return {
    bail: true,
    resolve: {
      modules: [
        'node_modules'
      ]
    },
    devtool: dev ? 'inline-source-map' : 'hidden-source-map',
    entry: {
      app: "./src/index.js",
      vendor: [
        'aphrodite',
        'react',
        'react-dom',
        'redux',
        'react-redux'
      ]
    },
    output: {
      path: appBuild,
      filename: 'static/js/app.[chunkhash:8].js',
      publicPath: '/'
    },
    module: {
      preLoaders: [{
        test: /\.js$/,
        loader: 'eslint',
        include: appSrc,
        exclude: /node_modules/
      }],
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        include: appSrc,
        exclude: /node_modules/
      }, {
        test:   /\.css$/,
        loader: extractCSS.extract([
          { loader: 'css', query: { sourceMap: true } },
          'postcss'
        ])
      }, {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }]
    },
    postcss() {
      return [
        require('postcss-cssnext')
      ];
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'static/js/vendor.[chunkhash:8].js'}),
      new CleanWebpackPlugin(['build'], { verbose: true }),
      extractCSS,
      new HtmlWebpackPlugin({
        template: 'index.html',
        inject: 'body',
        filename: 'index.html'
      }),
      new CopyWebpackPlugin([
        {from: './favicon.ico', to: 'favicon.ico'},
      ])
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
