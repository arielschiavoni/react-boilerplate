// @flow

import React from 'react';
import { Provider } from 'react-redux';
import App from '../components/App';
import type { Store } from 'redux';

type Props = {
  store: Store
};

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
