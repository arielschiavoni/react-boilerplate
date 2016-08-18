// @flow

import { createStore } from 'redux';
import rootReducer from '../reducers';

import type { Store } from 'redux';
import type { State } from '../reducers';

// @TODO: We could create a Store type based on our State and Actions but `redux` flow type definition still do not
// support it. See https://github.com/reactjs/redux/pull/1887
// import type {Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux';
// import type {State} from '../reducers';
// import type {Action} from '../actions';
// export type Store = ReduxStore<State, Action>;
// export type Dispatch = ReduxDispatch<State, Action>;


const configureStore = (initialState: State): Store => {
  const store = createStore(rootReducer, initialState);

  return store;
};

export default configureStore;
