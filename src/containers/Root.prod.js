/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import App from '../components/App';

type RootProps = {
  // @TODO: See if it is possible to use `Store` type defined in flow-typed/npm/redux_v3.x.x.js
  store: Object
};

const Root = ({ store }: RootProps) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
