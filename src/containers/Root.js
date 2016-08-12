// @flow

import config from '../config';

if (config.isProduction) {
  module.exports = require('./Root.prod').default;
} else {
  module.exports = require('./Root.dev').default;
}
