// @flow

import { connect } from 'react-redux';
import { increment, decrement } from '../actions';
import Counter from '../components/Counter';

import type { State } from '../reducers';
import type { Dispatch } from 'redux';

const mapStateToProps = (state: State) => ({
  value: state.counter
});

const mapDispatchToProps = (dispatch: Dispatch): Object => ({
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
