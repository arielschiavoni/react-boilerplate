// @flow
export * from './counter';

import type {Action as CounterAction} from './counter';
// here we could create a union type with different action coming from different modules
// export type Action = CounterAction | OtherAction | YetAnotherAction;
export type Action = CounterAction;
