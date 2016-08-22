// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type Props = {
  text?: string
};

const About = ({text = 'About us page.....'}: Props) => (
  <div className={css(styles.root)}>
    {text}
  </div>
);

export default About;


const styles = StyleSheet.create({
  root: {
    textAlign: 'center'
  }
});
