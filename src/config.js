// @flow

const {
  NODE_ENV
} = process.env;

export default {
  isProduction: NODE_ENV === 'production'
};
