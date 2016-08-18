// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Counter from '../containers/Counter';
import logo from 'images/logo.svg';

type Props = {
  title?: string
};

const App = ({title = 'Simple counter React App!'}: Props) => (
  <div className={css(styles.root)}>
    <div className={css(styles.header)}>
      <img src={logo} alt="logo" className={css(styles.logo)}/>
      <h1 className={css(styles.title)}>{title}</h1>
    </div>
    <div className={css(styles.counter)}>
      <Counter />
    </div>
  </div>
);

export default App;

const spin = {
  'from': {
    transform: 'rotate(0deg)'
  },
  'to': {
    transform: 'rotate(360deg)'
  },
};

const styles = StyleSheet.create({
  root: {
    textAlign: 'center'
  },
  header: {
    backgroundColor: '#222',
    height: 150,
    padding: 20,
  },
  title: {
    color: 'white',
    ':hover': {
      color: 'red'
    }
  },
  logo: {
    height: 80,
    animationName: spin,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
  },
  counter: {
    padding: 20
  }
});
