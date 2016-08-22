const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCSS = new ExtractTextPlugin('static/css/app.[chunkhash:8].css');

const appSrc = path.join(__dirname, 'src');
const appBuild = path.join(__dirname, 'build');
const entryPoint = path.join(appSrc, 'client', 'index');

module.exports = {
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
      'react-redux',
      'react-router'
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
      // JSON is not enabled by default in Webpack.
      test:   /\.json/,
      include: appSrc,
      loader: 'json'
    }, {
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      test:   /\.css$/,
      include: appSrc,
      loader: extractCSS.extract(['css', 'postcss'])
    }, {
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)(\?.*)?$/,
      include: appSrc,
      exclude: /\/favicon.ico$/,
      loader: 'file',
      query: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }, {
      // A special case for favicon.ico to place it into build root directory.
      test: /\/favicon.ico$/,
      include: appSrc,
      loader: 'file',
      query: {
        name: 'favicon.ico?[hash:8]'
      }
    }, {
      // "html" loader is used to process template page (index.html) to resolve
      // resources linked with <link href="./relative/path"> HTML tags.
      test: /\.html$/,
      loader: 'html',
      query: {
        attrs: ['link:href'],
      }
    }]
  },
  postcss() {
    return [
      require('postcss-cssnext')
    ];
  },
  plugins: [
    // Clean destination folder.
    new CleanWebpackPlugin([appBuild], { verbose: true }),
    // Create the vendors bundle file using vendor chunk.
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'static/js/vendor.[chunkhash:8].js'}),
    // Extract css to a file and prepare it to be included in index.html/
    extractCSS,
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: 'src/static/index.html',
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    // Makes some environment variables available to the JS code, for example:
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ]
};
