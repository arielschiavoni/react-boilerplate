const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackDashboard = require('webpack-dashboard');
const WebpackDashboardPlugin = require('webpack-dashboard/plugin');
const createConfig = require('./webpack.config');

const app = express();
const PORT = 8080;

const compiler = webpack(createConfig({ dev: true }));

const dashboard = new WebpackDashboard();
compiler.apply(new WebpackDashboardPlugin(dashboard.setData));

app.use(webpackDevMiddleware(compiler, { quiet: true }));

app.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info('==> 🚧  Webpack development server listening on port %s', PORT);
});
