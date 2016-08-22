// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import NavLink from './NavLink';

const NavBar = () => (
  <div className={css(styles.root)}>
    <NavLink to="/" index={true}>Home</NavLink>
    <NavLink to="about">About Us</NavLink>
    <NavLink to="counter">Counter</NavLink>
  </div>
);

export default NavBar;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    paddingTop: 20
  }
});
