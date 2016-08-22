// @flow

import React from 'react';
import { render } from 'react-dom';
import configureStore from '../app/store/configureStore';
import Root from '../app/containers/Root';
import '../static/styles/index.css';

import type { State } from '../app/reducers';

const initialState: State = {
  counter: 0
};

const store = configureStore(initialState);

render(
  <Root store={store}/>,
  document.getElementById('root')
);
