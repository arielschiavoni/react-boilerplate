/* @flow */

import { combineReducers } from 'redux';
import counter from './counter';

import type {CounterState} from './counter';

export type State = {
  counter: CounterState
};

const reducer = combineReducers({ counter });

export default reducer;
