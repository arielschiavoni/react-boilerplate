// @flow

const express = require('express');
const path = require('path');

const app = express();
const buildDir = path.join(__dirname, '..', '..', 'build');

app.use(express.static(buildDir));

app.use('*', (req, res) => {
  // fallback to index.html until we have server side rendering ready.
  res.sendFile(path.join(buildDir, 'index.html'));
});

module.exports = app;
