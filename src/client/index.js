// @flow

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../app/store/configureStore';
import Root from '../app/containers/Root';
import '../static/styles/index.css';

import type { State } from '../app/reducers';

const initialState: State = {
  counter: 0,
  routing: {}
};

const store = configureStore(initialState);
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
);
