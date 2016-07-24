/* @flow */

import { connect } from 'react-redux';
import { increment, decrement } from '../actions';
import Counter from '../components/Counter';

import type { State } from '../reducers';

const mapStateToProps = (state: State): Object => ({
  value: state.counter
});

const mapDispatchToProps = (dispatch: Function): Object => ({
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
