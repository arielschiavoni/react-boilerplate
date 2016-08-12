// @flow

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export type Action = Increment | Decrement;

type Increment = {
  type: 'INCREMENT'
};

type Decrement = {
  type: 'DECREMENT'
};

export const increment = (): Increment => ({
  type: INCREMENT
});

export const decrement = (): Decrement => ({
  type: DECREMENT
});
