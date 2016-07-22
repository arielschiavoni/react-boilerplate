/* @flow */

import React, { Component } from 'react';

export default class App extends Component {
  props: {
    name: ?string
  };

  static defaultProps = {
    name: 'World'
  };

  render() {
    return <h1>Hello {this.props.name}!</h1>;
  }
}
