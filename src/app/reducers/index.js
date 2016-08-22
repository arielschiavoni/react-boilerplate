// @flow

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';

import type {State as CounterState} from './counter';

export type State = {
  counter: CounterState,
  routing: Object
};

const reducer = combineReducers({
  counter,
  routing: routerReducer
});

export default reducer;
