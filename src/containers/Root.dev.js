// @flow

import React from 'react';
import { Provider } from 'react-redux';
import App from '../components/App';
import DevTools from './DevTools';
import type {Store} from 'redux';

type Props = {
  store: Store
};

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
);

export default Root;
