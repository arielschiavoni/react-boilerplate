// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import type { Store } from 'redux';

type Props = {
  store: Store
};

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
);

export default Root;
