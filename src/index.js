// @flow

import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import 'styles/index.css';

import type { State } from './reducers';

const initialState: State = {
  counter: 0
};

const store = configureStore(initialState);

render(
  <Root store={store}/>,
  document.getElementById('root')
);