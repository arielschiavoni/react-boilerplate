const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appSrc = path.join(__dirname, 'src');
const appBuild = path.join(__dirname, 'build');
const entryPoint = path.join(appSrc, 'client', 'index');

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  entry: {
    app: [
      // Include WebpackDevServer client. It connects to WebpackDevServer via
      // sockets and waits for recompile notifications. When WebpackDevServer
      // recompiles, it sends a message to the client by socket. If only CSS
      // was changed, the app reload just the CSS. Otherwise, it will refresh.
      // The "?/" bit at the end tells the client to look for the socket at
      // the root path, i.e. /sockjs-node/. Otherwise visiting a client-side
      // route like /todos/42 would make it wrongly request /todos/42/sockjs-node.
      // The socket server is a part of WebpackDevServer which we are using.
      // The /sockjs-node/ path I'm referring to is hardcoded in WebpackDevServer.
      'webpack-dev-server/client?/',
      // Include Webpack hot module replacement runtime. Webpack is pretty
      // low-level so we need to put all the pieces together. The runtime listens
      // to the events received by the client above, and applies updates (such as
      // new CSS) to the running application.
      'webpack/hot/dev-server',
      // Finally, this is your app's code:
      entryPoint
    ],
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
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/app.[hash:8].js',
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
      loaders: [
        'style',
        // @TODO  enable css sourceMap as soon as https://github.com/webpack/css-loader/issues/232 is fixed
        // { loader: 'css', query: { sourceMap: true } },
        'css',
        'postcss'
      ]
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
    // Create the vendors bundle file using vendor chunk.
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'static/js/vendor.[hash:8].js'}),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: 'src/static/index.html',
      inject: true
    }),
    // Makes some environment variables available to the JS code, for example:
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin()
  ]
};
