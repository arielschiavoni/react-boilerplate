// @flow

import { INCREMENT, DECREMENT } from '../actions';

import type {Action} from '../actions/counter';

export type State = number;

export default function counterReducer(state: State = 0, action: Action): State {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
