const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCSS = new ExtractTextPlugin('static/css/app.[chunkhash:8].css');

module.exports = function(options) {
  const {dev} = options;

  return {
    resolve: {
      modules: [
        path.resolve('./src'), // so we can just do `import reducers from 'reducers'` for example
        path.resolve('./static'),
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
      path: path.join(__dirname, 'build'),
      filename: 'static/js/app.[chunkhash:8].js',
      publicPath: '/'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
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
          name: 'static/media/[name].[hash:8].[ext]',
          context: './'
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
