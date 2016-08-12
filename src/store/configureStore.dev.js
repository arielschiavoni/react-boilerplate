// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

import type {Store} from 'redux';
import type {State} from '../reducers';

// @TODO: We could create a Store type based on our State and Actions but `redux` flow type definition still do not
// support it. See https://github.com/reactjs/redux/pull/1887
// import type {Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux';
// import type {State} from '../reducers';
// import type {Action} from '../actions';
// export type Store = ReduxStore<State, Action>;
// export type Dispatch = ReduxDispatch<State, Action>;

const logger = createLogger();

const getDebugSessionKey = () => {
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = process.browser && window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
};

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(logger),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
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
