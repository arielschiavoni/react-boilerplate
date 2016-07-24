/* @flow */

import React from 'react';

type CounterProps = {
  value: number,
  onIncrement: Function,
  onDecrement: Function
};

const Counter = ({ value, onIncrement, onDecrement }: CounterProps) => (
  <div>
    {value}
    <button onClick={onIncrement}>
      Increment
    </button>
    <button onClick={onDecrement}>
      Decrement
    </button>
  </div>
);

export default Counter;
