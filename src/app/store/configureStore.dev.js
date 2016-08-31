// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
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

const logger = createLogger();

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(logger),
  // Enable devToolsExtension otherwhise do nothing (return identity function)
  window.devToolsExtension ? window.devToolsExtension() : a => a
);

const configureStore = (initialState: State): Store => {
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
