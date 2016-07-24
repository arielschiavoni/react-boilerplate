const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export type CounterAction = IncrementAction | DecrementAction;

type IncrementAction = {
  type: 'INCREMENT'
};

type DecrementAction = {
  type: 'DECREMENT'
};

export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});
