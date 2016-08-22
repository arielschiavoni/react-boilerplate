// @flow

import React from 'react';

export type Props = {
  value: number,
  onIncrement: () => void,
  onDecrement: () => void
};

const Counter = ({ value, onIncrement, onDecrement }: Props) => (
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
