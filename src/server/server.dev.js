// @flow

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackDashboardPlugin = require('webpack-dashboard/plugin');

const config = require('../../webpack.config.dev');

const compiler = webpack(config);
compiler.apply(new WebpackDashboardPlugin());

module.exports = new WebpackDevServer(compiler, {
  // turn off all webpack error logging by setting quiet to true (lets WebpackDashboard do its thing)
  quiet: true,
  // It is important to tell WebpackDevServer to use the same "root" path
  // as we specified in the config. In development, we always serve from /.
  publicPath: config.output.publicPath,
  // Enable hot reloading server. It will provide /sockjs-node/ endpoint
  // for the WebpackDevServer client so it can learn when the files were
  // updated. The WebpackDevServer client is included as an entry point
  // in the Webpack development configuration. Note that only changes
  // to CSS are currently hot reloaded. JS changes will refresh the browser.
  hot: true,
  // all requests to the webpack-dev-server that do not map to an existing asset will instead by routed straight to /,
  // that is, the index.html file.
  historyApiFallback: true,
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebookincubator/create-react-app/issues/293
  watchOptions: {
    ignored: /node_modules/
  }
});
