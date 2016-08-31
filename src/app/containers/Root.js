// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import type { Store } from 'redux';

type Props = {
  store: Store,
  history: Object
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>
);

export default Root;
