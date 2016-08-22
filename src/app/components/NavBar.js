// @flow

import React from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';

type Props = {
  items: Array<{
    url: string,
    name: string
  }>
};

const NavBar = ({items}: Props) => (
  <div className={css(styles.root)}>
    {items.map(({url, name}, i) =>
      <Link key={i} to={url} className={css(styles.item)}>{name}</Link>
    )}
  </div>
);

export default NavBar;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    paddingTop: 20
  },
  item: {
    marginLeft: 20
  }
});
