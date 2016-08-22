// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type Props = {
  text?: string
};

const Home = ({text = 'Home page.....'}: Props) => (
  <div className={css(styles.root)}>
    {text}
  </div>
);

export default Home;


const styles = StyleSheet.create({
  root: {
    textAlign: 'center'
  }
});
