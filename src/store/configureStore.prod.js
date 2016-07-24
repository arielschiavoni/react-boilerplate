/* @flow */

import { createStore } from 'redux';
import rootReducer from '../reducers';
import type {State} from '../reducers';

export default function configureStore(initialState: State) {
  const store = createStore(rootReducer, initialState);

  return store;
}
