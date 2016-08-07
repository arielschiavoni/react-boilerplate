/* @flow */

import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Counter from '../containers/Counter';

type AppProps = {
  greeting?: string
};

const App = ({greeting = 'Hello World!'}: AppProps) => (
  <div>
    <h1 className={css(styles.blue, styles.hover)}>{greeting}</h1>
    <Counter />
  </div>
);

export default App;

const styles = StyleSheet.create({
  blue: {
    color: 'blue'
  },

  hover: {
    ':hover': {
      color: 'red'
    }
  }
});
