/* @flow */

import type {CounterAction} from '../actions';

export type CounterState = number;

export default function counterReducer(state: CounterState = 0, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
