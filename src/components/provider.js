// src/components/provider.js

import React, { Component } from 'react';
import { object } from 'prop-types';

export class Provider extends Component {
  getChildContext() {
    const { store } = this.props;
    return { store };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  store: object.isRequired
};
