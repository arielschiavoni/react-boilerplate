// @flow

import React from 'react';
import { Link, IndexLink } from 'react-router';
import { StyleSheet, css } from 'aphrodite';

type Props = {
  index?: bool
};

const NavLink = ({index = false, ...rest}: Props) => (
  index
    ? <IndexLink {...rest} className={css(styles.link)} activeClassName={css(styles.activeLink)} />
    : <Link {...rest} className={css(styles.link)} activeClassName={css(styles.activeLink)} />
);

export default NavLink;

const styles = StyleSheet.create({
  link: {
    marginLeft: 20,
    textDecoration: 'none'
  },
  activeLink: {
    color: '#3B9167',
    textDecoration: 'underline'
  }
});
