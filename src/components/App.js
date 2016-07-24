/* @flow */

import React from 'react';
import Counter from '../containers/Counter';

type AppProps = {
  greeting?: string
};

const App = ({greeting = 'Hello World!'}: AppProps) => (
  <div>
    <h1>{greeting}</h1>
    <Counter />
  </div>
);

export default App;
