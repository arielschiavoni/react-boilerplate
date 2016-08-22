// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Header from './Header';
import NavBar from './NavBar';
import logo from '../../static/images/logo.svg';

type Props = {
  title?: string,
  // see https://github.com/facebook/flow/issues/1964
  children?: any
};

const App = ({title = 'Simple counter React App!', children}: Props) => (
  <div>
    <Header title={title} logo={logo} />
    <NavBar />
    <div className={css(styles.page)}>
      {children}
    </div>
  </div>
);

export default App;

const styles = StyleSheet.create({
  page: {
    padding: 20
  }
});
