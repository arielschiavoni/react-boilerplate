const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCSS = new ExtractTextPlugin('static/css/app.[chunkhash:8].css');

const appSrc = path.join(__dirname, 'src');
const appBuild = path.join(__dirname, 'build');
const entryPoint = `${appSrc}/index.js`;

module.exports = function(options) {
  const {dev} = options;

  const commonConfig = {
    bail: true,
    resolve: {
      modules: [
        'node_modules'
      ]
    },
    entry: {
      app: entryPoint,
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
    ]
  };

  const config = commonConfig;

  if (dev) {
    config.devtool = 'inline-source-map';
  } else {
    const extraPlugins = [
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false
      })
    ];

    config.plugins = [...config.plugins, ...extraPlugins];
  }

  return config;
};
