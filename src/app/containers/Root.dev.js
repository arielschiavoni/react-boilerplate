// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import DevTools from './DevTools';

import type { Store } from 'redux';

type Props = {
  store: Store,
  history: Object
};

const Root = ({ store, history }: Props) => (
  <div>
    <Provider store={store}>
      <Router routes={routes} history={history} />
    </Provider>
    <DevTools store={store} />
  </div>
);

export default Root;
