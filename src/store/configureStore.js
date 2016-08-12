// @flow

import config from '../config';

if (config.isProduction) {
  module.exports = require('./configureStore.prod').default;
} else {
  module.exports = require('./configureStore.dev').default;
}
