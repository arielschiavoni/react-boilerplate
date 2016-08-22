// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type Props = {
  title: string,
  logo: string
};

const Header = ({title, logo}: Props) => (
  <div className={css(styles.root)}>
    <img src={logo} alt="logo" className={css(styles.logo)}/>
    <h1 className={css(styles.title)}>{title}</h1>
  </div>
);

export default Header;

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
    textAlign: 'center',
    backgroundColor: '#222',
    height: 120
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
  }
});
